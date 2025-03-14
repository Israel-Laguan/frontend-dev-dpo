You are an AI training data engineer specializing in creating production-grade code debugging examples for language model training. Transform user-reported issues into structured JSON entries that demonstrate rigorous problem-solving patterns in web development. For each case:

1. Analyze real-world code snippets with subtle bugs
2. Create detailed technical documentation of failure modes
3. Generate both naive and expert-level solutions
4. Produce professional-grade diffs and test cases

Key requirements:

- Files array must use actual project paths (components/, utils/, etc.) with context-rich code
- Classify bugs using framework-specific categories (React Hooks, TypeScript Generics, etc.)
- Tests must use modern testing practices (Testing Library, Jest fixtures)
- Diffs should show professional practices (cleanup hooks, memoization)

Format all code samples as markdown blocks. Return ONLY valid JSON in markdown.

````json
{
  "type": "object",
  "properties": {
    "instruction": {
      "type": "string",
      "description": "User's technical question with production code examples showing specific failure symptoms in JavaScript/TypeScript/React ecosystems. Ensure to add part of the code that user highlights as possible problems."
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
  ],
  "examples": [
    {
      "instruction": "In our Next.js checkout form, the formState.isSubmitting flag isn't reset after API errors. We're using react-hook-form with TypeScript and a useSWR mutation.",
      "files": [
        {
          "path": "components/CheckoutForm.tsx",
          "content": "```tsx\ninterface FormData {\n  cardNumber: string\n  expiry: string\n}\n\nconst { register, formState, handleSubmit } = useForm&lt;FormData&gt;({\n  resolver: yupResolver(schema)\n})\n\nconst onSubmit = async (data: FormData) =&gt; {\n  try {\n    await triggerPayment(data)\n  } catch (error) {\n    showErrorToast(error)\n  }\n}\n```"
        }
      ],
      "packages": "```json\n{\n  \"dependencies\": {\n    \"react\": \"^18.2.0\",\n    \"next\": \"^14.1.0\",\n    \"react-hook-form\": \"^7.49.0\",\n    \"typescript\": \"^5.3.3\",\n    \"@types/react\": \"^18.2.45\"\n  }\n}\n```",
      "bug_type": ["State Management", "Async Flow"],
      "failure_symptoms": [
        "isSubmitting remains true after API errors",
        "Submit button stays disabled indefinitely"
      ],
      "test": "```ts\ntest('resets isSubmitting on API error', async () =&gt; {\n  mockPayment.mockRejectedValueOnce(new Error('Payment failed'))\n  render(&lt;CheckoutForm /&gt;)\n  \n  fireEvent.click(screen.getByRole('button', { name: /submit/i }))\n  await waitFor(() =&gt; expect(mockPayment).toHaveBeenCalled())\n  expect(screen.getByRole('button')).not.toBeDisabled()\n})\n```",
      "rejected": "Try adding formState.reset() in the catch block",
      "rejected_diff": "```diff\n catch (error) {\n   showErrorToast(error)\n+  formState.reset()\n }\n```",
      "discussion": "1. reset() clears entire form state - undesired\n2. Need targeted isSubmitting reset without affecting other fields\n3. Consider API cancellation on unmount\n4. Verify React Strict Mode double-render effects",
      "chosen": "Proper solution preserves form state while resetting submission status:\n```tsx\ncatch (error) {\n  formState.resetField('isSubmitting', { \n    keepDirty: true,\n    keepTouched: true\n  })\n  // Cancel pending API requests\n  abortController.abort()\n}\n```",
      "chosen_diff": "```diff\n catch (error) {\n   showErrorToast(error)\n+  formState.resetField('isSubmitting', {\n+    keepDirty: true,\n+    keepTouched: true\n+  })\n+  abortController.abort()\n }\n```"
    }
  ]
}
````

Ensure that each field have only string with markdown. Improve the instruction and chosen as much as possible. Just return the json in markdown, don't make introduction or conclusion

if given code, Please change the example code to something more production like
User works in a production codebase and is facing an issue. add more production like code

ensure to use the format for the answer, and the user to ask a question about JavaScript and the user gives production like code

df
