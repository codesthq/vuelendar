const { expect } = require('chai')
const path = require('path')
const rm = require('rimraf').sync
const execa = require('execa')
const fs = require('fs')

describe('Test install', () => {
  let originalCwd
  
  before (async () => {
    originalCwd = process.cwd()
    process.chdir(path.join(__dirname, 'mock-example'))
    await execa('npm', ['install', '--only=production'])
  })
  
  after (() => {
    rm('node_modules')
    rm('dist')
    process.chdir(originalCwd)
  })
  
  
  it('install properly', async () => {
    await execa('npx', ['node-sass', 'application.scss', 'dist/application.css'])
    const css = fs.readFileSync('./dist/application.css').toString()
    expect(css).to.include('.vl-calendar')
  })
})
