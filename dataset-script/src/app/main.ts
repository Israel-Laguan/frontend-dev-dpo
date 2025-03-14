import { z } from 'zod';
import * as fs from 'fs';
import { resolve } from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

//libs
import { GoogleAiServiceMaker } from '../libs';
import { AiService, OutputJson, InputJson } from '../models';
import { GEMINI_API_KEY } from './zod.env-config';
import IssueSchema from './zod.output-schema';

//types
type IAiServiceMaker = AiService.AiServiceMaker<OutputJson[]>;
type OutputJsonOrInputJson = OutputJson[] | InputJson[];

//functions
const getExtendedTrainJson = async (inputRawData: string, aiService: IAiServiceMaker) => {
  const promptFilePath = resolve(__dirname, '../../inputs/extended_prompt.md');

  const rawSystemPrompt = fs.readFileSync(promptFilePath, 'utf-8');

  const prompt = `
  ${rawSystemPrompt}

  Use the following JSON as the user-reported issue:

  \`\`\`json
   ${inputRawData}
   \`\`\`
  `;

  const response: OutputJson = await aiService.generate(prompt);

  return validateResponse(response);
};

const processInputsIteratively = (
  aiService: IAiServiceMaker,
  inputs: InputJson[],
  maxRetries: number = 3
) => {
  const retryQueue: { index: number; input: InputJson }[] = [];
  const responses: OutputJson[] = [];
  const attemptTracker = new Map<number, number>(); // Use index as the key for tracking attempts

  const processInput = async (input: InputJson, currentIndex: number) => {
    const prompt = JSON.stringify(input);

    try {
      console.log(`Processing input at index ${currentIndex + 1}`);

      const response: OutputJson | 'fail' = await getExtendedTrainJson(prompt, aiService);

      if (response === 'fail') {
        handleRetry(input, currentIndex);
      } else {
        responses.push(response);
      }
    } catch (error) {
      console.error(
        `Error processing input at index ${currentIndex + 1}:`,
        (error as Error).message || error
      );

      handleRetry(input, currentIndex);
    }
  };

  const handleRetry = (input: InputJson, currentIndex: number) => {
    const attempts = (attemptTracker.get(currentIndex) || 0) + 1;

    if (attempts < maxRetries) {
      attemptTracker.set(currentIndex, attempts); // Update the retry counter
      retryQueue.push({ index: currentIndex, input }); // Add the current input to the retry queue
    } else {
      console.warn(`Input at index ${currentIndex + 1} failed after ${maxRetries} attempts.`);
    }
  };

  const processBatch = async (batch: { index: number; input: InputJson }[]) => {
    for (const item of batch) {
      await processInput(item.input, item.index);
    }
  };

  const processRetryBatch = async () => {
    while (retryQueue.length > 0) {
      console.log(`Retrying failed inputs, batch size: ${retryQueue.length}`);

      const currentRetryBatch = [...retryQueue];

      retryQueue.length = 0; // Empty the retry queue for the next iteration
      await processBatch(currentRetryBatch);
    }
  };

  const process = async () => {
    if (!Array.isArray(inputs) || inputs.length === 0) {
      console.warn('No inputs provided.'); // Warn if the input array is empty

      return { responses: [], retryQueue: [] };
    }

    // Create an array with indices for initial processing
    const initialBatch = inputs.map((input, i) => ({ index: i, input }));

    console.log(`Processing started. Batch size: ${inputs.length}`);

    // Process initial inputs
    await processBatch(initialBatch);

    // Process retries while the `retryQueue` is not empty
    await processRetryBatch();

    console.log('Processing completed.'); // Log when the entire process is finished

    return { responses, retry: retryQueue.map(({ input }) => input) };
  };

  return process();
};

const saveFileAsJson = (response: OutputJsonOrInputJson, filename: string) => {
  if (response.length === 0 || response === null) return;

  const jsonContent = JSON.stringify(response, null, 1);

  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');

  const newFilename = `output/${timestamp}-${filename}.json`;

  fs.writeFile(newFilename, jsonContent, 'utf-8', err => {
    if (err) {
      console.error('Error when saving the JSON:', err);
    } else {
      console.log(`JSON file successful saved as "${newFilename}".`);
    }
  });
};

const validateResponse = (response: OutputJson) => {
  try {
    const ValidateResponse = IssueSchema.parse(response);

    return ValidateResponse;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Error when validating the JSON:', error.errors);
    }

    return 'fail';
  }
};

//main
async function run() {
  const aiService = new GoogleAiServiceMaker<OutputJson[]>(new GoogleGenerativeAI(GEMINI_API_KEY));

  const inputFilePath = resolve(__dirname, '../../inputs/train.json');

  const inputRawData = fs.readFileSync(inputFilePath, 'utf-8');

  const inputs = JSON.parse(inputRawData);

  const { responses, retry } = await processInputsIteratively(aiService, inputs);

  saveFileAsJson(responses, 'extended_train');

  saveFileAsJson(retry || [], 'retry');
}

run();
