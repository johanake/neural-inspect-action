import * as core from '@actions/core'
import * as github from '@actions/github'
import axios from 'axios'

async function run() {
  try {
    core.info('Starting Action!')
    const githubToken = core.getInput('github_token', { required: true })
    const apiKey = core.getInput('api_key', { required: true })
    const context = github.context
    const { owner, repo } = context.repo
    const pullRequestNumber = context.payload.pull_request?.number

    core.info(`Found PR with number: ${context.payload.pull_request?.number}`)
    core.info(`Github token: ${githubToken}`)

    const payload = {
      gitHub: {
        owner,
        repository: repo,
        pullRequestNumber
      },
      apiKey
    }

    const response = await axios.post(
      'http://api.neuralinspect.com/smart-review',
      payload
    )

    core.info(`Request sent successfully. Status: ${response.status}`)
    core.setOutput('response', JSON.stringify(response.data))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    core.error('Action failed!')

    core.setFailed(error.message)
  }
}

run()
