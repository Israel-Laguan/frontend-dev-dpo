import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { AiService } from '../models';

export class GoogleAiServiceMaker<R> implements AiService.AiServiceMaker<R> {
  private readonly model: GenerativeModel;

  constructor(private readonly genAI: GoogleGenerativeAI) {
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
    });
  }

  readonly generate: AiService.AiService<R> = async prompt => {
    const initialResult = (await this.model.generateContent(prompt)).response.text();

    const result = initialResult.startsWith('```json') ? initialResult.slice(7, -3) : initialResult;

    return JSON.parse(result);
  };
}
