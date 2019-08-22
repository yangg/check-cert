# check-cert
检查 https 证书是否临近过期时间，可以 js 调用或者 cli 通过管道(企业微信或Telegram)发送通知

## Installation
```bash
npm i -g check-cert # cli 建议 -g
```

## Usage
```
async function main() {
  const checkCert = require('./')
  const leftDays = await checkCert('uedsky.com')
  console.log(leftDays)
}
main()
```

## Cli Usage
```
check-cert <host> [days]

<host> 指定要检查的域名
[days] 临近多少天后发送提醒，默认 15
```

示例：配置 crontab -e 每天凌晨3点检查
```bash
# 企业微信通知
0 3 * * * PATH=/ur/home/.nvm/versions/node/v8.9.1/bin:$PATH . /path/to/check-cert/cli.sh uedsky.com || curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxx' -H 'Content-Type: application/json' -d '{"msgtype":"markdown","markdown":{"content":"请注意，'$CHECK_CERT_HOST' 的 HTTPS 证书将于 <font color=\"warning\">'$CHECK_CERT_DAYS'</font> 天后过期！"}}' >> /tmp/check-cert.log
```