# Neural Inspect

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)


## Getting Started
### Setting up secrets
Define the secrets ``github_token`` and ``api_key`` in your repository. 

Replace "owner" and "project" in the url below if you can't find your secrets: 
``https://github.com/{OWNER}/{PROJECT}/settings/secrets/actions``

 ### Setting up the Github Action
In the root of your repository, create a workflow according to: ``.github/workflows/yourworkflowfile.yml``

Copy and paste the content below into your workflow file.

```yaml
name: Neural Inspect
on:
   pull_request:
      types: [opened, synchronize]

jobs:
   run-analysis:
      runs-on: ubuntu-latest
      steps:
         - uses: actions/checkout@v3
         - name: Run AI Analysis
           uses: johanake/neural-inspect-action@v1
           with:
              github_token: ${{ secrets.GH_TOKEN }}
              api_key: ${{ secrets.API_KEY }
```
:sunglasses: Congratulations, now you are done! 

## Publishing a New Release
1. ``git tag -a v1 -m "First stable release``
2. ``git push origin v1``
