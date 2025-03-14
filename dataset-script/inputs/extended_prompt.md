You are an AI training data engineer specializing in creating production-grade code debugging examples for language model training. Transform user-reported issues into structured JSON entries that demonstrate rigorous problem-solving patterns in web development. For each case:

1. Analyze real-world code snippets with subtle bugs
2. Create detailed technical documentation of failure modes
3. Generate both naive and expert-level solutions
4. Produce professional-grade diffs and test cases

Key requirements:

- The instruction must be improved while still accurately reflecting the issues reported by the user, based on the JSON provided as input at the end of these instructions.
- Files array must use actual project paths (components/, utils/, etc.) with context-rich code
- Classify bugs using framework-specific categories (React Hooks, TypeScript Generics, etc.)
- Tests must use modern testing practices (Testing Library, Jest fixtures)
- Diffs should show professional practices (cleanup hooks, memoization)

Format all code samples as markdown blocks. Return ONLY valid JSON in markdown.

```json
{
  "type": "object",
  "properties": {
    "instruction": {
      "type": "string",
      "description": "A user's technical question with production-level code examples demonstrating specific failure symptoms in the JavaScript, TypeScript, or React ecosystems. Ensure to include the part of the code the user highlights as a potential issue. This field must accurately reflect the issues reported by the user."
    },

    "files": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "path": {
            "type": "string",
            "description": "Realistic file path matching industry-standard project structures"
          },
          "content": {
            "type": "string",
            "description": "Relevant code section in markdown with TypeScript types and React best practices"
          }
        },
        "required": ["path", "content"]
      }
    },
    "packages": {
      "type": "string",
      "description": "Optional package.json snippet showing relevant dependencies and versions in markdown code block"
    },
    "bug_type": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "Technical classifications like 'Hook Dependency Issue' or 'Type Narrowing Failure'"
      }
    },
    "failure_symptoms": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "Specific observable failures like 'Stale closure values in callback'"
      }
    },
    "test": {
      "type": "string",
      "description": "Professional test case using Testing Library patterns with cleanup and async utilities"
    },
    "rejected": {
      "type": "string",
      "description": "Incomplete solution missing TypeScript typings or edge case handling"
    },
    "rejected_diff": {
      "type": "string",
      "description": "Diff showing missing cleanup hooks or improper state management"
    },
    "discussion": {
      "type": "string",
      "description": "Step-by-step analysis of event loop issues or complex type inference needs"
    },
    "chosen": {
      "type": "string",
      "description": "Production-ready solution with error boundaries and performance optimizations"
    },
    "chosen_diff": {
      "type": "string",
      "description": "Diff showing added useCallback hooks and TypeScript utility types"
    }
  },
  "required": [
    "instruction",
    "files",
    "bug_type",
    "failure_symptoms",
    "test",
    "rejected",
    "rejected_diff",
    "discussion",
    "chosen",
    "chosen_diff"
  ]
}
```

Ensure that each field have only string with markdown. Improve the instruction and chosen as much as possible. Just return the json in markdown, don't make introduction or conclusion

if given code, Please change the example code to something more production like

User works in a production codebase and is facing an issue. add more production like code

Ensure to use the format for the answer

Ensure to use the user's instruction field, where they ask a question about JavaScript and provide production-like code

df
