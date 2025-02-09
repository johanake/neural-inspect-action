import * as core from '@actions/core'
import * as github from '@actions/github'
import axios from 'axios'

async function run() {
  try {
    core.info('Starting Action!')

    // Try getting from inputs
    const token = core.getInput('github_token')
    const apiKey = core.getInput('api_key')

    core.info(
      `Found PR with number: ${github.context.payload.pull_request?.number}`
    )
    core.info(`Github Token: ${token ? 'Received ✅' : 'NULL ❌'}`)
    core.info(`API Key: ${apiKey ? 'Received ✅' : 'NULL ❌'}`)

    if (!token || !apiKey) {
      core.setFailed(
        'Missing required tokens. Ensure they are set in the workflow.'
      )
      return
    }

    const { owner, repo } = github.context.repo
    const pullRequestNumber = github.context.payload.pull_request?.number

    const payload = {
      gitHub: {
        token,
        owner,
        repository: repo,
        pullRequestNumber
      },
      apiKey: apiKey
    }

    const response = await axios.post(
      'https://api.neuralinspect.com/smart-review',
      payload
    )

    core.info(`Request sent successfully. Status: ${response.status}`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    core.error('Action failed!')

    core.setFailed(error.message)
  }
}

run()
