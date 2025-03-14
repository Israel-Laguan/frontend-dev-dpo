import OpenAI from 'openai';

//libs
import { AiService } from '../../models';
import {
  type OpenaiNoStreamCompletions,
  type ChatCompletionCreateParamsNonStreaming,
} from './interface';

const noStreamCompletions = async (openai: OpenAI, body: any) => {
  return await openai.chat.completions.create(body);
};

export class OpenaiAiServiceMaker<R> implements AiService.AiServiceMaker<R> {
  constructor(private readonly openai: OpenAI) {}

  readonly generate: AiService.AiService<R> = async prompt => {
    const noStreamParams: ChatCompletionCreateParamsNonStreaming = {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    };

    const completions = await noStreamCompletions(this.openai, noStreamParams);

    const initialResult = completions.choices[0].message.content as string;

    const result = initialResult.startsWith('```json') ? initialResult.slice(7, -3) : initialResult;

    return JSON.parse(result);
  };
}
