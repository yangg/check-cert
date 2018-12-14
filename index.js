
// curl --insecure -v https://uedsky.com -I 2>&1 | grep "expire date"

const https = require('https')
const DAY_SECS = 3600*24*1000

function checkCert(host) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      port: 443,
      path: '/',
      method: 'HEAD',
      checkServerIdentity: function(host, cert) {
        const valid_to = new Date(cert.valid_to)
        const leftDays = (valid_to - Date.now())/DAY_SECS | 0
        resolve(leftDays)
      },
    };
  
    options.agent = new https.Agent(options)
    const req = https.request(options)
  
    req.on('error', reject)
    req.end()
  })
}

module.exports = checkCert
 
// vim: ft=javascript
