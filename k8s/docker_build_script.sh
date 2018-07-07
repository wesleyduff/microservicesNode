#!/usr/bin/env bash
docker build -t node/api-gateway ../api-gateway
docker build -t node/news-service ../news-service
docker build -t node/sports-service ../sports-service