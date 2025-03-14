export type AiService<R> = (prompt: string) => Promise<any>;

export interface AiServiceMaker<R> {
  generate: AiService<R>;
}
