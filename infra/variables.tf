# General settings
variable "project" {
  type = string
}

variable "region" {
  description = "Region where to deploy the resources"
  type        = string
}

variable "environment" {
  type        = string
  description = "The environment where to deploy the solution"
}

variable "front_bucket" {
  type = string
}

variable "front_environment" {
  description = "The environment (e.g., Dev, Stage, Prod)"
  type        = string
  default     = "Dev"
}

variable "bucket_acl" {
  type = string
  default = "private"
}

variable "index_document" {
  description = "The index document for the S3 bucket website"
  type        = string
  default     = "index.html"
}

variable "error_document" {
  description = "The error document for the S3 bucket website"
  type        = string
  default     = "error.html"
}

variable "routing_rule_condition_key_prefix" {
  description = "The key prefix for routing rule condition"
  type        = string
  default     = "docs/"
}

variable "routing_rule_redirect_prefix" {
  description = "The key prefix for routing rule redirect"
  type        = string
  default     = "documents/"
}
