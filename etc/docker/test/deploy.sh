#!/bin/bash
stack=${1:-${PWD##*/}} # by default, the name of the cointaining folder
compose_file=${2:-docker-compose.yml}
env_file=${3:-deploy_env.sh}

## import env
source $env_file

echo ${IMAGE_PREFIX}
echo ${IMAGE_TAG}

## run
docker \
    stack \
    deploy \
    --resolve-image=always \
    --compose-file $compose_file $stack \
    --with-registry-auth
