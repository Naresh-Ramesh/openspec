---
name: opsx-token-usage
description: Estimate context-window consumption after an OpenSpec propose, apply, archive, or explore workflow. Use when the user wants to know how many tokens were consumed, how much of the model context window remains, and which parts of the request consumed the budget.
allowed-tools: Bash(openspec:*), Read
license: MIT
compatibility: Requires openspec CLI and a model/provider with a known context window.
metadata:
  author: openspec
  version: "1.0"
---

Estimate how much of the model's context window was used after a single OpenSpec workflow run. This is a reporting skill, not a workflow that changes spec files. It should be used after `propose`, `apply`, `archive`, or `explore` finishes so the user can see their effective token consumption.

## Core principle

The exact token count is provider-specific. If the platform or runtime exposes actual token usage, use that value as the source of truth. If it does not, report an estimate and clearly label it as an estimate.

Use this conservative approximation:

- 1 token is approximately 4 characters of plain English text
- apply a small padding factor for JSON, whitespace, tool output, and metadata
- estimate all visible prompt + tool-context momentum as part of the same context budget

Never claim an exact value without evidence from actual provider telemetry.

## What to measure

For the finished OpenSpec workflow, estimate the context consumed in these buckets:

1. Base system and skill instructions
   - model instruction set
   - OpenSpec skill/system guidance
   - workflow instructions loaded for the selected operation

2. User request and conversation context
   - current prompt
   - prior messages that remained in the live context window
   - user-provided constraints or requirements

3. OpenSpec command context
   - `openspec status --json`
   - `openspec instructions ... --json`
   - `openspec context --json`
   - any CLI JSON or error output that was loaded into context

4. Workspace and code reads
   - files read by the workflow
   - specs or design artifacts inspected
   - implementation context files relevant to the change

5. Generated output
   - proposal, design, spec, tasks, or implementation output created during the workflow
   - final assistant response for the user

6. Residual window
   - remaining context after the workflow
   - percentage used of the model window

## Estimation formula

Use this formula when actual token counts are unavailable:

```text
estimated_tokens = round((total_characters / 4) * 1.12)
```

Where:
- total_characters = combined characters from the relevant prompt, retrieved files, tool output, and generated output
- 1.12 = safety margin for formatting, JSON escaping, metadata, and conversation overhead

Then compute:

```text
percent_used = (estimated_tokens / model_context_window) * 100
remaining_tokens = model_context_window - estimated_tokens
```

When the model window is unknown, say:

- model window: unknown
- estimated usage: based on observed context snapshot
- confidence: estimate only

## Required output format

At the end of any `propose`, `apply`, `archive`, or `explore` run, provide a compact summary like this:

```text
OpenSpec Token Usage Report
==========================
Workflow: <propose | apply | archive | explore>
Model context window: <window size> tokens
Actual token telemetry: <yes/no>
Estimated usage: <N> tokens
Estimated remaining: <N> tokens
Percent used: <P>%

Breakdown:
- Base instructions: <N> tokens
- User + conversation context: <N> tokens
- OpenSpec CLI / status / instructions JSON: <N> tokens
- Read files / specs / project context: <N> tokens
- Generated planning or implementation output: <N> tokens
- Final response / tool output: <N> tokens

Largest consumers:
1. <largest source>
2. <second largest source>
3. <third largest source>

Interpretation:
- <safe / medium / high> context pressure
- <remaining headroom or risk note>
- This value is an estimate unless provider telemetry was available.
```

## Reporting rules

- If actual provider usage is visible, report exact numbers and note the source.
- If actual usage is not visible, clearly mark all totals as estimates.
- The user asked for "how much was consumed"; answer in both raw tokens and percentage used.
- Show where the budget went, not just the total.
- Be specific about workflow stage, because `explore` often consumes more context from reading and brainstorming than `archive`, while `apply` may consume more from code and task context.
- Do not invent hidden telemetry. If the tool does not expose actual usage, say so.

## Example interpretation

```text
OpenSpec Token Usage Report
==========================
Workflow: apply
Model context window: 128000 tokens
Actual token telemetry: no
Estimated usage: 34120 tokens
Estimated remaining: 93880 tokens
Percent used: 26.6%

Breakdown:
- Base instructions: 6800 tokens
- User + conversation context: 4200 tokens
- OpenSpec CLI / instructions JSON: 5200 tokens
- Read files / specs / project context: 9800 tokens
- Generated implementation output: 5600 tokens
- Final response / tool output: 2520 tokens

Largest consumers:
1. Read files / specs / project context
2. Base instructions
3. OpenSpec CLI / instructions JSON

Interpretation:
- Moderate usage
- Plenty of headroom remains
- This is an estimate unless provider telemetry is available.
```

## Practical usage

When the user says any of the following, run this skill:
- "How many tokens did that use?"
- "What is my context window usage after this OpenSpec run?"
- "How much of the model budget was consumed by explore/apply/propose/archive?"
- "What exactly consumed the context budget in this workflow?"

It should answer with a clear, evidence-based estimate and a short explanation of the biggest contributors.

## Important guardrail

This skill is for reporting only. It does not change OpenSpec artifacts or the project itself. It measures the work done and explains how the prompt and context were consumed.

