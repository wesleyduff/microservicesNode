#!/usr/bin/env bash
 helm install stable/mongodb
 helm install stable/postgres
 kubectl create -f ./namespace.yaml;
 kubectl create -f ./deployments/;