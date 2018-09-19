#!/usr/bin/env node
// curl --insecure -v https://uedsky.com -I 2>&1 | grep "expire date"


const https = require('https')
if(!global.URL) {
  global.URL = require('url').URL
}
const DAY_SECS = 3600*24*1000
let NOTIFY_URL = null

function notify(text) {
  const options = new URL(NOTIFY_URL)
  options.searchParams.append('text', text)
  https.request(options).end()
}

function check(args) {
  const [HOST, token, days = 20] = args
  const VALID_DAYS = days * DAY_SECS + Date.now()
  if(!(HOST && token)) {
    const readme = require('fs').readFileSync(__dirname + '/README.md').toString()
    console.error(readme.substr(readme.indexOf('# Usage')))
    process.exit(1)
  }
  NOTIFY_URL = token.startsWith('SCU') ? `https://sc.ftqq.com/${token}.send`
  : `https://pushbear.ftqq.com/sub?sendkey=${token}`

  const options = {
    hostname: HOST,
    port: 443,
    path: '/',
    method: 'HEAD',
    checkServerIdentity: function(host, cert) {
      const valid_to = new Date(cert.valid_to)
      let MSG = `[${new Date().toISOString()}] Checking ${HOST}: `
      const leftDays = (valid_to - Date.now())/DAY_SECS | 0
      if(VALID_DAYS - valid_to > 0) {
        notify(`你的${HOST}证书${leftDays}天后将过期！`)
        MSG += `${leftDays}天后将过期！`
      } else {
        MSG += `expires after ${leftDays} days, OK`
      }
      console.log(MSG)
    },
  };

  options.agent = new https.Agent(options)
  const req = https.request(options)

  req.on('error', (e) => {
    console.error(e.message)
  })
  req.end()
}

check(process.argv.slice(2))
 
// vim: ft=javascript
