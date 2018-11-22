#!/usr/bin/env node
import spawn from 'cross-spawn'
import chalk from 'chalk'
import { cleanOutDir, copyVendors } from './utils'

import webp from './scripts/webpconverter'

const [, , script, ...args] = process.argv

type ScriptTypes = {
  'build-project': string
  'elm-format': string
  prettier: string
  webp: string
}

const SCRIPTS: ScriptTypes = {
  'build-project': 'build-project',
  'elm-format': 'elm-format',
  prettier: 'prettier',
  webp: 'webp'
}

async function compileSource() {
  try {
    spawn('tsc', ['-p', 'tsconfig.json'], { stdio: 'inherit' })
    console.log(chalk.cyan('WOO! All TypeScript was successfully compiled.'))
  } catch (error) {
    console.log(chalk.yellow('An error occurred when trying to compile TypeScript :', error))
  }
}

/////////////////////////////////////////////
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
;(async function run(s: keyof ScriptTypes) {
  switch (s) {
    case SCRIPTS['build-project']: {
      await cleanOutDir()

      await compileSource()

      await copyVendors()

      break
    }

    case SCRIPTS.webp: {
      const [input, output, ...options] = args

      webp(input, output, options.map(x => x).join(' '))
      break
    }
    default: {
      console.log(`script ${script} is not recognized`)
    }
  }
})(SCRIPTS[script])
