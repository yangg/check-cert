# check-cert
检查 https 证书是否临近过期时间，可以 js 调用或者 cli 通过 [Server酱](http://sc.ftqq.com/) 通知

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
check-cert <host> <token> [days]

<host> 指定要检查的域名
<token> Server酱的消息发送key，支持【发送消息】和【一对多推送】
[days] 临近多少天后发送提醒，默认 20
```

示例：配置 crontab -e 每天凌晨3点检查
```bash
0 3 * * * PATH=/ur/home/.nvm/versions/node/v8.9.1/bin:$PATH check-cert uedsky.com  <SCUtoken> >> /tmp/check-cert.log
```