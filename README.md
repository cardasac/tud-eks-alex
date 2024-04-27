aws eks --region $(terraform output -raw region) update-kubeconfig --name $(terraform output -raw kubernetes_cluster_id)

helm install --values helm/values-v1.yaml consul hashicorp/consul --create-namespace --namespace consul

helm upgrade --values helm/values-v2.yaml consul hashicorp/consul --namespace consul


kubectl apply --filename api-gw/consul-api-gateway.yaml --namespace consul && \
kubectl wait --for=condition=accepted gateway/api-gateway --namespace consul --timeout=90s && \
kubectl apply --filename api-gw/routes.yaml --namespace consul && \
kubectl apply --filename api-gw/intentions.yaml --namespace consul
