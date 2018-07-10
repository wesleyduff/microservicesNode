Docker containers talking to each other
- Each container in a pod shares localhost.

EXAMPLE :
—
Service A is on port 3001
Service B is on port 3000
—
Service A calls Service B:

fetch('http://localhost:3000')
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        res.json({
            data: response
        })
    });

—
Build pod json: or yams
{
  "kind": "Pod",
  "apiVersion": "v1",
  "metadata": {
    "name": "testcrash",
    "labels": {
      "app": "web"
    }
  },
  "spec": {
    "containers": [
      {
        "name": "service-a",
        "image": "crasha",
        "imagePullPolicy": "IfNotPresent",
        "ports" : [
          {
            "containerPort": 3000,
            "name": "service-a",
            "protocol": "TCP"
          }
        ]
      },
      {
        "name": "service-b",
        "image": "crashb",
        "imagePullPolicy": "IfNotPresent",
        "ports" : [
          {
            "containerPort": 3001,
            "name": "crashb",
            "protocol": "TCP"
          }
        ]
      }
    ],
    "restartPolicy": "OnFailure"
  }
}

NOTE* we have two docker containers called 
- crasha 
- crashb


====
Kubectl scripts :

Build the pod from above
$ kubectl create -f k8s.pods.json

Expose the pod externally if you want to use the browser
$ kubectl expose pod testcrash --type=NodePort --port=3001

Ssh into pod to run curl commands
$ kubectl exec -it testcrash -- /bin/bash
- $ curl localhost:3000
- $ curl localhost:3001
- $ curl localhost:3001/call/servicea
Note* only port 3001 is external if you ran the external script above. Localhost 3000 is blocked by the pod and only available inside the pod





