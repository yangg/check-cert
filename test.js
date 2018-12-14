
async function main() {
  const checkCert = require('./')
  const leftDays = await checkCert('uedsky.com')
  console.log(leftDays)
}
main()