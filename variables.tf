variable "vpc_region" {
  type        = string
  description = "The AWS region to create resources in"
  default     = "eu-west-1"
}

variable "consul_version" {
  type        = string
  description = "The Consul version"
  default     = "v1.16.0"
}

resource "random_string" "suffix" {
  length  = 4
  special = false
  upper   = false
}
