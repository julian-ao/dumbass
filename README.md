# Project 1 - Sludd

## How to run the website

From the root of the project, run

1. _pnpm i_
2. _pnpm dev_

## Documentation

## Commit message template

We used the following commit message template for all commits when contributing to the project.

`<type>`: `<title>`

Explain how the commit addresses the issue

**Co-authored-by:** `<name> <email>`

**Issue:** `#<issueNr>`

--- COMMIT END ---

The `<type>` can be one of the following:

- `feat` (new feature)
- `fix` (bug fix)
- `refactor` (refactoring production code)
- `style` (formatting, missing semicolons, etc; no code change)
- `docs` (changes to documentation)
- `test` (adding or refactoring tests; no production code change)
- `chore` (updating grunt tasks, etc; no production code change)

## Liting

Running ESLint to lint and automatically fix issues in the code in the current directory, and then it runs Prettier to format the code in the same directory.

This should be done before every commit:

```bash
pnpx eslint . --fix && pnpx prettier --write .
```
