#!/usr/bin/env bash
docker build -t local/uisvc:v1 ../../expressproxy-svc
docker build -t local/docms:v1 ../../DOC-svc
docker build -t local/internalms:v1 ../../INTERNAL-svc
docker build -t local/pushms:v1 ../../PUSH-svc
docker build -t local/rdsms:v1 ../../RDS-svc
docker build -t local/vault:v1 ../../VAULT-svc
docker build -t local/uisvc:v1 ../../UI-svc