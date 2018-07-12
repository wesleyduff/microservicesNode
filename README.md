# Setup Kubernetes and Docker w/ Express App
I received an email stating this application will be the mongo db test instance. I was goign to set up a relational DB (postgres), but after reading the email I think we should keep with mongoDB because that is what raven is currently running. 

## First : Install VirtualBox
We need a virtual environment for our kubernetes minikube. I highly suggest Virtualbox because it is free and works pretty well.

## Install home brew then install these apps
- install kubectl with home brew
- install minikube with home brew
- install helm with home brew

## Steps : for local environment setup
- `$ minikube start`  
Wait for minikube to start

Once start open the minikube dashboard
- `$ minikube dashboard`

We need all of our docker containers to live inside our minikube environment. Run this to set this up
- `$ eval $(minikube docker-env)`

Rest of the steps will be inside the **deployments** folder
- `$ sh docker_build_script.sh`

You will need to run the below code to get "tiller" installed on your minikube
- `$ helm init'`  

Wait for tiller. Check the kubernetes pods
- `$ kubectl get pods --all-namespaces | grep "tiller"`  
You should see 1/1 Running when it is ready ... Then proceed

- `$ sh setupDbs.sh`  
Make sure you view the terminal and copy the data that was displayed in the terminal for further implementation inside **"sports"** and **"news"**   
 3. You will need to run : `$ PGPASSWORD=$(kubectl get secret --namespace default <the name of your postgresSQL kubernetes service> -o jsonpath="{.data.postgres-password}" | base64 --decode; echo) && echo $PGPASSWORD`
 4. Take the password that is shown in your terminal and update the connection string with the new password.  
   **A**. it would be best to put this password in an environment variable so you do not check this into source control.  
   **Now you are done with postgresSQL connection** 
 5. You will need to do the same thing for mongo.
    **A**. get password for root mongo user `$  export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace default <your monogodb kubernetes service name> -o jsonpath="{.data.mongodb-root-password}" | base64 --decode) && echo $MONGODB_ROOT_PASSWORD`
    **B**. update connection string in sports with the new password and your monogodb kubernetes service name.

Proceed...
- `$ kubectl apply -f ./local/local_deploy.yaml`  
The deployment is using the docker containers from your local environment. 

Next, type this in your terminal and the browser will go to the main page
- `$ minikube service expressproxy-svc`



## Setup hosts file
- Set terminal all the way to the root ... example: `cd ../../../`
- `$ cd etc`
- `$ sudo nano hosts`

Add 
- 192.168.99.100  rdstest.com
- 192.168.99.100  doctest.com
- 192.168.99.100  pushString.com
- 192.168.99.100  pushDoc.com
- 192.168.99.100  internal.com

Note : this IP address can be retrieved from `$ minikube ip`


# Notes below - just to help out
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
### not in use in this app
Using Ambassador for this. Ambassador provides many features for api applications.
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

Update image
- $ kubectl set image deployment/hello-node hello-node=hello-node:v2

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

also :  
`docker stop $(docker ps -a -q)`  
 `docker rm $(docker ps -a -q)`

ssh into contianer : 
`docker exec -it 636 /bin/bash`

`docker container stop $(docker container ls -a -q) && docker system prune -a -f --volumes`

## Debug a failed pod
At the bottom will show you what happened, step by step
- `$ kubectl describe pod <podname>`