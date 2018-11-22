import { copy, emptyDir } from 'fs-extra'
import chalk from 'chalk'
import { outDir, vendors } from './paths'

async function copyVendors() {
  try {
    await copy(vendors, `${outDir}/vendor`)
    console.log(chalk.green('Vendors copied 🤡'))
  } catch (error) {
    console.log(chalk.yellow('Vendors failed to be copied'), { error })
  }
}

async function cleanOutDir() {
  try {
    await emptyDir(outDir)
    console.log(chalk.green('Output directory cleaned! 🛁'))
  } catch (error) {
    console.log(chalk.yellow('Unable to clean out the output directory'), { error })
  }
}

export { copyVendors, cleanOutDir }
