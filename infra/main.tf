## s3
module "s3" {
  source = "./modules/s3"

  front_bucket = var.front_bucket
  front_environment = var.front_environment
  bucket_acl = var.bucket_acl

  index_document = var.index_document
  error_document = var.error_document
  routing_rule_condition_key_prefix = var.routing_rule_condition_key_prefix
  routing_rule_redirect_prefix = var.routing_rule_redirect_prefix
}
