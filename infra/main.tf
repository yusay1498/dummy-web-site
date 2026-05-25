## cloudfront
module "cloudfront" {
  source = "./modules/cloudfront"

  bucket_name     = var.bucket_name
  bucket_tag_name = var.bucket_tag_name
  bucket_acl      = var.bucket_acl

  oac_name = "${var.project}-${var.oac_name}"

  s3_origin_id_name = var.s3_origin_id_name

  geo_location        = var.geo_location
  price_class         = var.price_class
  default_root_object = var.default_root_object
  min_ttl             = var.min_ttl
  default_ttl         = var.default_ttl
  max_ttl             = var.max_ttl

  error_page_path       = "/${var.default_root_object}"
  error_caching_min_ttl = var.error_caching_min_ttl
}

