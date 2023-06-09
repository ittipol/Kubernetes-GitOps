# Kubernetes - GitOps

## Install Kubernetes
``` bash
brew install kubectl

alias k=kubectl
```

## Install Helm
``` bash
brew install helm
```

## Helm Chart
- https://helm.sh/docs/
- https://artifacthub.io/

# Argo CD
## Install Argo CD
``` bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

## Download Argo CD CLI
``` bash
brew install argocd
```

## Access The Argo CD API Server
### Ingress 
- [https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/](https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/)
### Port Forwarding
``` bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

## Get initial password
### 1. Using The CLI
``` bash
#retrieve this password
argocd admin initial-password -n argocd
```
### 2. Using kubectl command
``` bash
# get password from argocd-initial-admin-secret secret manifest file
kubectl get secret argocd-initial-admin-secret -n argocd

# base64 decode
echo <encoded base64 password> | base64 -d
```

## Login
``` bash
# username admin and the password from above
argocd login <ARGOCD_SERVER>
```

# Minikube

## Install Minikube
``` bash
brew install minikube
```

## Start Minikube
``` bash
minikube start
# or
minikube start --cpus 4 --memory 8192 --vm-driver hyperkit
```

## Build docker images directly inside minikube
``` bash
minikube docker-env

eval $(minikube -p minikube docker-env)

# list a docker images that inside minikube
minikube ssh

docker image ls
```

## Enable the Ingress controller
``` bash
minikube addons enable ingress
```