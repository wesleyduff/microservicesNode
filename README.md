# Setup : Express, Docker & Kubernetes : microservice app
What this app does : 
- routes requests from a mapped host file configuration to the correct microservice.
 - data coming in that is relational goes to the postgresSQL DB
 - data coming in the form of a document is redirected into the mongo database.
 
Example : 
- http://rdstest.com/api/rds/healthcheck : Expressproxy notices the host "rdstest.com" and directs the request to the rds microservice that manipulates the data and saves that data to a realation database. 

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
Make sure you view the terminal and copy the data that was displayed in the terminal so you can update the database endpoints in each microservice. 
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