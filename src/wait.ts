import * as core from '@actions/core'

/**
 * Waits for a number of milliseconds.
 *
 * @param milliseconds The number of milliseconds to wait.
 * @returns Resolves with 'done!' after the wait is over.
 */
export async function wait(milliseconds: number): Promise<string> {
  return new Promise((resolve) => {
    core.info('hello')
    if (isNaN(milliseconds)) throw new Error('milliseconds is not a number')

    setTimeout(() => resolve('done!'), milliseconds)
  })
}
