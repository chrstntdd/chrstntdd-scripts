import { join } from 'path'

const ignores = ['/node_modules/', '/fixtures/', '/__tests__/helpers/', '__mocks__']

export default {
  testURL: 'http://localhost',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.+(js|jsx|ts|tsx)'],
  testRegex: '\\.spec\\.(js|ts|jsx|tsx)$',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': join(
      __dirname,
      'mocks/file-mock.js'
    ),
    '^.+\\.(scss|css)$': join(__dirname, 'mocks/style-mock.js'),
    '^@[/](.*)': `${process.cwd()}/src/$1`
  },
  testPathIgnorePatterns: [...ignores],
  coveragePathIgnorePatterns: [...ignores, 'src/(umd|cjs|esm)-entry.js$'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$']
}
