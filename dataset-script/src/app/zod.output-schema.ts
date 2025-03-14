import { z } from 'zod';

// Schema for the object within "files"
const FileSchema = z.object({
  path: z.string().describe('Realistic file path matching industry-standard project structures'),
  content: z
    .string()
    .describe('Relevant code section in markdown with TypeScript types and React best practices'),
});

// Schema for the main object
const IssueSchema = z.object({
  instruction: z
    .string()
    .describe(
      "User's technical question with production code examples showing specific failure symptoms in JavaScript/TypeScript/React ecosystems. Ensure to add part of the code that user highlights as possible problems."
    ),
  files: z.array(FileSchema),
  packages: z
    .string()
    .optional()
    .describe(
      'Optional package.json snippet showing relevant dependencies and versions in markdown code block'
    ),
  bug_type: z
    .array(z.string())
    .describe("Technical classifications like 'Hook Dependency Issue' or 'Type Narrowing Failure'"),
  failure_symptoms: z
    .array(z.string())
    .describe("Specific observable failures like 'Stale closure values in callback'"),
  test: z
    .string()
    .describe(
      'Professional test case using Testing Library patterns with cleanup and async utilities'
    ),
  rejected: z
    .string()
    .describe('Incomplete solution missing TypeScript typings or edge case handling'),
  rejected_diff: z
    .string()
    .describe('Diff showing missing cleanup hooks or improper state management'),
  discussion: z
    .string()
    .describe('Step-by-step analysis of event loop issues or complex type inference needs'),
  chosen: z
    .string()
    .describe('Production-ready solution with error boundaries and performance optimizations'),
  chosen_diff: z
    .string()
    .describe('Diff showing added useCallback hooks and TypeScript utility types'),
});

export default IssueSchema;
