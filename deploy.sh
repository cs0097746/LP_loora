#!/bin/bash
set -e

cd "$(dirname "$0")"

git reset --hard
git pull origin main
docker compose up -d --build --force-recreate
