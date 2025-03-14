export interface OutputJson {
  instruction: string;
  files: {
    path: string;
    content: string;
  }[];
  packages?: string;
  bug_type: string[];
  failure_symptoms: string[];
  test: string;
  rejected: string;
  rejected_diff: string;
  discussion: string;
  chosen: string;
  chosen_diff: string;
}
