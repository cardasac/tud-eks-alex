resource "helm_release" "hashicorp" {
  name       = "consul"
  repository = "https://helm.releases.hashicorp.com"
  chart      = "consul"
  namespace  = kubernetes_namespace_v1.consul.id
  values = [
    "${file("values.yaml")}"
  ]
}

resource "helm_release" "grafana" {
  name       = "grafana"
  repository = "https://grafana.github.io/helm-charts"
  chart      = "grafana"
  version    = "6.23.1"
  values = [
    "${file("grafana.yaml")}"
  ]
}

resource "helm_release" "prometheus" {
  name       = "prometheus-community"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "prometheus"
  version    = "15.5.3"
  values = [
    "${file("prometheus.yaml")}"
  ]
}

resource "helm_release" "loki" {
  name       = "loki"
  version    = "2.9.9"
  repository = "https://grafana.github.io/helm-charts"
  chart      = "loki-stack"
  values = [
    "${file("loki.yaml")}"
  ]
}

resource "kubernetes_namespace_v1" "consul" {
  metadata {
    annotations = {
      name = "consul"
    }

    name = "consul"
  }
}
