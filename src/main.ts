import * as core from '@actions/core'
import * as github from '@actions/github'
import axios from 'axios'

async function run() {
  try {
    core.info('Starting Action!')
    core.info('This is v2!')

    const githubToken = core.getInput('github_token', { required: true })
    const apiKey = core.getInput('api_key', { required: true })
    const context = github.context
    const { owner, repo } = context.repo
    const pullRequestNumber = context.payload.pull_request?.number

    core.info(`Found PR with number: ${context.payload.pull_request?.number}`)
    core.info(`Github token: ${githubToken}`)
    core.info(`Environment GITHUB_TOKEN: ${process.env.GITHUB_TOKEN}`)
    core.info(`Environment GIT_TOKEN: ${process.env.GIT_TOKEN}`)

    core.info(`Input github_token: ${githubToken}`)

    const payload = {
      gitHub: {
        githubToken,
        owner,
        repo,
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
