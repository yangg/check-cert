#!/usr/bin/env node

const checkCert = require('./')

function check (args) {
  checkCert(args[0]).then((leftDays) => {
    console.log(leftDays)
  })
}

check(process.argv.slice(2))

// vim: ft=javascript
