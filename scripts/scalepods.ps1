
## Input for pods
$pods = Read-Host -Prompt 'Input the number of pods'

## Login to Azure
az login

## Kubectl script to scale up/down pods
## kubectl scale deploy -n interviews-cluster-2 --replicas=$pods --all

kubectl scale deploy interviews-server --replicas=$pods

kubectl scale deploy db --replicas=$pods

kubectl get pods