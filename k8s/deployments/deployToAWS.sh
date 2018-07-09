# Run this once ...
# set AWS_PROFILE environment variable : mine is called home : for personal use
export AWS_PROFILE=home

aws iam create-group --group-name kops

aws iam attach-group-policy --group-name kops \
--policy-arn arn:aws:iam::aws:policy/AmazonEC2FullAccess

aws iam attach-group-policy --group-name kops \
--policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

aws iam attach-group-policy --group-name kops \
--policy-arn arn:aws:iam::aws:policy/AmazonVPCFullAccess

aws iam attach-group-policy --group-name kops \
--policy-arn arn:aws:iam::aws:policy/IAMFullAccess

aws iam attach-group-policy --group-name kops \
--policy-arn arn:aws:iam::aws:policy/AmazonRoute53FullAccess

aws iam create-user --user-name kops

aws iam add-user-to-group --user-name kops --group-name kops

aws iam create-access-key --user-name kops >kops-creds

# set ENV
export AWS_PROFILE=wesdev-kops
export KOPS_CLUSTER_NAME=wesdev.k8s.local
export KOPS_STATE_STORE=s3://wesdev-kops-state-store

# Use AWS CLI to install s3 bucket
aws s3api create-bucket --bucket wesdev-kops-state-store --region us-east-1
aws s3api put-bucket-versioning --bucket wesdev-kops-state-store --versioning-configuration Status=Enabled

# Use KOPS to create cluster : ec2 instance, load balancers etc...
# change t2.micro to t2.small or t2.medium ... depending on what you need
kops create cluster \
--name $KOPS_CLUSTER_NAME --master-count 1 --node-count 2 \
--node-size t2.micro --master-size t2.micro --zones=us-east-1a

kops update cluster --name ${KOPS_CLUSTER_NAME} --state=$KOPS_STATE_STORE --yes

# Validate Cluster
#kops validate cluster


# Delete KOPS cluster off of AWS
# I used the name here insteads of the $KOPS_CLUSTER_NAME. When I delete a cluster, I want to be specific
# kops delete cluster --name wesdev.k8s.local --yes