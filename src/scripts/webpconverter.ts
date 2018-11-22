import chalk from 'chalk'
import { promisify } from 'util'
import { execFile } from 'child_process'
import { join } from 'path'

import { projectRoot } from '../paths'

const asyncExecFile = promisify(execFile)

/**
 * @description
 * To provide the correct location to the executable for respective environments
 */
const program = (function getBinLocation() {
  switch (process.platform) {
    case 'darwin':
      return join(projectRoot, 'dist/vendor/libwebp-mac/bin/cwebp')
    case 'linux':
      return join(projectRoot, 'dist/vendor/libwebp-linux/bin/cwebp')
    case 'win32':
      /* assume 64bit */
      return join(projectRoot, 'dist/vendor/libwebp-win/bin/cwebp.exe')

    default:
      throw Error(
        `Sorry bru, we do not currently support your platform of choice, ${
          process.platform
        }. \n Only macOS, Linux, and 64bit Windows 10 is supported.`
      )
  }
})()

/**
 * @description
 * Tiny wrapper around the cwebp binary
 * @see https://developers.google.com/speed/webp/docs/cwebp
 */
async function cwebp(inputImgUrl: string, outputImgUrl: string, options: string): Promise<any> {
  let query = `${options} ${inputImgUrl} -o ${outputImgUrl}`

  try {
    // writes to stderr for some reason..?
    const { stderr } = await asyncExecFile(program, query.split(/\s+/))

    console.log(stderr)
    console.log(chalk.green('Success! One webp image coming up 🖼'))
  } catch (error) {
    console.log(chalk.yellow('Yikes! There was an error in converting that image: '), { error })
  }
}

export default cwebp
