# Setup Kubernetes and Docker w/ Express App
I received an email stating this application will be the mongo db test instance. I was goign to set up a relational DB (postgres), but after reading the email I think we should keep with mongoDB because that is what raven is currently running. 

First you need to install home brew.
- install kubectl with home brew
- install minikube with home brew

Dowload "sequel-pro" to mamnage your local Relational DB.

## Setup hosts file
- Set terminal all the way to the root ... example: `cd ../../../`
- `$ cd etc`
- `$ sudo nano hosts`

Add 
- 192.168.99.100     rtest.com

Note : this IP address can be retrieved from `$ minikube ip`


## Setup local DB - Mongodb
Install mongo docker continer inside kubernetes pod. 
- cd into `k8s\deployments` then run `$ kubectl create -f ./mongo.yml`

ssh into kubernetes mongodb container : mongo-c59... may be different. run `kubectl get pods | grep 'mongo' to get your mongo pod name
- $ `kubectl exec -it mongo-c596cd56-c6462 -- /bin/bash`

make 2 dbs ['news', 'sports']
- news : collection : breakingNews
- sports : collection : lakers

THought - : I would like to sue mongoose for mongodb that way we can have schemas and a littl emroe control over documents.
## Setup local DB - Postgres
Install postgresql with brew
- $ brew install postgresql

To have launchd start postgresql now and restart at login:
  brew services start postgresql
Or, if you don't want/need a background service you can just run:
  pg_ctl -D /usr/local/var/postgres start
==> Summary
🍺  /usr/local/Cellar/postgresql/10.4: 3,389 files, 39.2MB

## Install VirtualBox
We need a virtual environment for our kubernetes minikube. I highly suggest Virtualbox because it is free and works pretty well.


### Commands :
- $ minikube start

Make sure the minikube is happy
- $ kubectl get services -n kube-system

Minikube will need to share our local Docker Repo. To do this use the command below
- $ eval $(minikube docker-env)

to undo this : 
- $ eval $(minikube docker-env -u)

Update kubectl config
- $ kubectl apply -f ./file.yaml

## Test inside a container inside the cluster with BusyBoxplus
- $ kubectl run curl --image=radial/busyboxplus:curl -i --tty

Run a curl : 
- first we need to get the IP address of our service 
- - $ kubectl get services | grep "hello-world"
- Next use the IP address to perform a CURL on our api endpoint
- - $ curl 10.104.86.220/api/invoices/1

resume : `kubectl attach curl-775f9567b5-tq4v9 -c curl -i -t`

## Create an ingress so that traffic and find its way from outside the cluster
Using Ambassador for this

[Ambassador](https://www.getambassador.io/)

tunnel from  localhost to the minikube cluster
- $ minikube service ambassador --url

mine was : http://192.168.99.100:30586

## BUILD
- inside /k8s `sh docker_build_script.sh`
- once that is done run `sh deploy.sh`

## Cleanup 
- $ kubectl delete pods --all
- $ kubectl delete services --all
- $ kubectl delete deployments --all
- $ kubectl delete services,pods,deployments --all
- $ docker system prune -a // -a does all images. Leave off -a to just do the ones not used
- $ kubectl get pods --all-namespaces
- $ kubectl delete --all namespaces
- $ minikube service -n microservices api-gateway-service --url

list docker images 
- $ docker images -a
- $ docker image ls

docker - clean out unused data and processes
- $ docker system prune
- - --all
- - --volumes

docker - prune containers, volumes and images
- $ docker container prune
- $ docker volume prune
- $ docker image prune

Destroy ALL for a Docker Refresh
- get container IDs : `$ docker container ls -aq`
- show just running ` $ --all`
- only display numeric IDs `-quiet`

ssh into contianer : 
`docker exec -it 636 /bin/bash`

`docker container stop $(docker container ls -a -q) && docker system prune -a -f --volumes`