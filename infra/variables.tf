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

variable "bucket_name" {
  type = string
  default = "mybucket"
}

variable "bucket_tag_name" {
  type = string
  default = "My bucket"
}

variable "bucket_acl" {
  type = string
  default = "private"
}

variable "oac_name" {
  type = string
  default = "oac"
}

variable "s3_origin_id_name" {
  type = string
  default = "myS3Origin"
}

variable "geo_location" {
  type        = list(string)
  default     = ["JP"]
}

variable "price_class" {
  type        = string
  default     = "PriceClass_200"
}

variable "default_root_object" {
  type        = string
  default     = "index.html"
}

variable "min_ttl" {
  type        = number
  default     = 0
}

variable "default_ttl" {
  type        = number
  default     = 3600
}

variable "max_ttl" {
  type        = number
  default     = 86400
}

variable "error_caching_min_ttl" {
  type        = number
  default     = 300
}
