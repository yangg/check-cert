#!/usr/bin/env bash


HOST="$1"
if [ -z "$HOST" ];then
    cat README.md | sed -n '/Cli Usage/,//p'
    exit 1
fi
shift
DAYS=15
if [ "$1" = "--days" ]; then
    DAYS="$2"
    shift 2
fi
set -eu

scriptDir="$(test -L "$0" && dirname "$(readlink -f "$0" 2> /dev/null)" || echo './')"
leftDays="$("$scriptDir/index-cli.js" $HOST)"

# echo "HOST:$HOST"
# echo "DAYS:$DAYS"
# echo "curlOpts:$@"
msg="[$(date +"%Y-%m-%dT%H:%M:%S%z")] Checking $HOST: Expires in $leftDays days"
if [[ "$leftDays" -lt "$DAYS" ]]; then
    if [[ $# -gt 0 ]]; then
        curlOpts=()
        for arg in "$@"; do
            arg="${arg/\$CHECK_CERT_HOST/$HOST}"
            arg="${arg/\$CHECK_CERT_DAYS/$leftDays}"
            curlOpts+=("$arg")
        done
        echo -e "\n[$(date +"%Y-%m-%dT%H:%M:%S%z")] ${curlOpts[@]}" >> /tmp/check-cert-request.log
        curl -sq "${curlOpts[@]}" >> /tmp/check-cert-request.log 2>&1
        msg="$msg [notified]"
    fi
fi
echo $msg
