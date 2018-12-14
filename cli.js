#!/usr/bin/env node

const checkCert = require('./')
const https = require('https')

if(!global.URL) {
  global.URL = require('url').URL
}
let NOTIFY_URL = null

function notify(text) {
  const options = new URL(NOTIFY_URL)
  options.searchParams.append('text', text)
  https.request(options).end()
}

function check(args) {
  const [HOST, token, days = 20] = args
  if(!(HOST && token)) {
    const readme = require('fs').readFileSync(__dirname + '/README.md').toString()
    console.error(readme.substr(readme.indexOf('# Usage')))
    process.exit(1)
  }
  NOTIFY_URL = token.startsWith('SCU') ? `https://sc.ftqq.com/${token}.send`
  : `https://pushbear.ftqq.com/sub?sendkey=${token}`


  checkCert(HOST).then((leftDays) => {
    let MSG = `[${new Date().toISOString()}] Checking ${HOST}: `
    if(leftDays < days) {
      notify(`你的${HOST}证书${leftDays}天后将过期！`)
      MSG += `${leftDays}天后将过期！`
    } else {
      MSG += `expires after ${leftDays} days, OK`
    }
    console.log(MSG)
  })
}

check(process.argv.slice(2))
 
// vim: ft=javascript
