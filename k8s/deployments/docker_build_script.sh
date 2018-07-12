#!/usr/bin/env bash
docker build -t local:expressproxy:v2 ../../expressproxy-svc
docker build -t local/docms:v2 ../../DOC-svc
docker build -t local/internal:v2 ../../INTERNAL-svc
docker build -t local/pushms:v2 ../../PUSH-svc
docker build -t local/rdsms:v2 ../../RDS-svc
docker build -t local/vault:v2 ../../VAULT-svc