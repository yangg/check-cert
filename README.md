# check-cert
检查 https 证书是否临近过期时间，可以 js 调用或者 cli 通过管道(企业微信或Telegram)发送通知

## Installation
```bash
npm i -g check-cert # cli 建议 -g
```

## Usage
```js
async function main() {
  const checkCert = require('./')
  const leftDays = await checkCert('uedsky.com')
  console.log(leftDays)
}
main()
```

## Cli Usage
```bash
check-cert <host> [--days 15] [...curlOpts]

<host> 指定要检查的域名
[days] 临近多少天后发送提醒，默认 15
[curlOpts] curl 参数，发送通知
```

示例：配置 crontab -e 每天凌晨3点检查
```bash
# 企业微信通知
0 9 * * * PATH=/ur/home/.nvm/versions/node/v8.9.1/bin:$PATH check-cert uedsky.com 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=<key>' -H 'Content-Type: application/json' -d '{"msgtype":"markdown","markdown":{"content":"请注意，$CHECK_CERT_HOST 的 HTTPS 证书将于 <font color=\"warning\">$CHECK_CERT_DAYS</font> 天后过期！"}}' >> /tmp/check-cert.log 2>&1
# telegram 通知
0 9 * * * PATH=/home/wgdahu/.nvm/versions/node/v10.14.1/bin:$PATH check-cert api.pocketchess.cn --days 90 'https://api.telegram.org/bot<token>/sendMessage?chat_id=xxx&parse_mode=Markdown' -d 'text=请注意, $CHECK_CERT_HOST 的 HTTPS 证书将于 *$CHECK_CERT_DAYS* 天后过期！' --socks5 sdb2:5678 >> /tmp/check-cert.log 2>&1
```