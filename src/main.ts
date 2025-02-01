import * as core from '@actions/core'
import * as github from '@actions/github'
import axios from 'axios'

async function run() {
  try {
    core.info('Starting Action!')

    // Try getting from inputs
    let token = core.getInput('github_token')
    let apiKey = core.getInput('api_key')

    // Fallback to environment variables
    if (!token) token = process.env.GIT_TOKEN ?? ''
    if (!apiKey) apiKey = process.env.API_KEY ?? ''

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

    core.info(`Github Token value: ${token}`)
    core.info(`API Key value: ${apiKey}`)

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
