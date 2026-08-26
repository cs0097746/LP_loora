#!/bin/bash
set -e

git reset --hard
git pull origin main
docker compose up -d --build --force-recreate
