#!/usr/bin/env bash

if [ -z "$1" ];then
    cat README.md | sed -n '/Cli Usage/,//p'
    exit 1
fi

HOST="$1"
DAYS="$2"
DAYS="${DAYS:=15}"

leftDays="$(check-cert $HOST)"
echo "[$(date +"%Y-%m-%dT%H:%M:%S%z")] Checking uedsky.com: Expires in $leftDays days"
CHECK_CERT_DAYS="$leftDays"
CHECK_CERT_HOST="$HOST"
if [[ "$leftDays" -lt "$DAYS" ]]; then
    echo 'less'
    false
fi