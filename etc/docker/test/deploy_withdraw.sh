#!/bin/bash
stack=${1:-${PWD##*/}} # by default, the name of the cointaining folder
env_file=${2:-deploy_env.sh}

## import env
source $env_file

echo ${IMAGE_PREFIX}
echo ${IMAGE_TAG}

## run
docker stack rm $stack
