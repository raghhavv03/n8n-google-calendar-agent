import { parseWebhookResponse } from "../lib/api";

type TestCase = {
  name: string;
  input: unknown;
  expected: string;
};

const cases: TestCase[] = [
  {
    name: "plain text (n8n Respond With: Text)",
    input: "Hey — how can I help with your calendar today?",
    expected: "Hey — how can I help with your calendar today?",
  },
  {
    name: "JSON object with output",
    input: { output: "Your meeting has been scheduled." },
    expected: "Your meeting has been scheduled.",
  },
  {
    name: "JSON object with response",
    input: { response: "Done!" },
    expected: "Done!",
  },
  {
    name: "JSON object with message",
    input: { message: "Here are your events." },
    expected: "Here are your events.",
  },
  {
    name: "JSON array (n8n node output)",
    input: [{ output: "Calendar updated." }],
    expected: "Calendar updated.",
  },
  {
    name: "JSON string",
    input: '{"output":"Parsed from string"}',
    expected: "Parsed from string",
  },
  {
    name: "empty input",
    input: "",
    expected: "",
  },
  {
    name: "whitespace trimming",
    input: "  hello  ",
    expected: "hello",
  },
];

let failed = 0;

for (const { name, input, expected } of cases) {
  const result = parseWebhookResponse(input);
  if (result !== expected) {
    console.error(`✗ ${name}`);
    console.error(`  expected: ${JSON.stringify(expected)}`);
    console.error(`  received: ${JSON.stringify(result)}`);
    failed++;
  } else {
    console.log(`✓ ${name}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} test(s) failed.`);
  process.exit(1);
}

console.log(`\nAll ${cases.length} tests passed.`);
