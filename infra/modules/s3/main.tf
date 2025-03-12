# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket
resource "aws_s3_bucket" "front" {
  bucket = var.front_bucket

  tags = {
    Name        = var.front_bucket
    Environment = var.front_environment
  }
}

resource "aws_s3_bucket_ownership_controls" "front" {
  bucket = aws_s3_bucket.front.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_acl
resource "aws_s3_bucket_acl" "front" {
  depends_on = [aws_s3_bucket_ownership_controls.front]

  bucket = aws_s3_bucket.front.id
  acl    = var.bucket_acl
}

# https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_website_configuration
resource "aws_s3_bucket_website_configuration" "main" {
  bucket = aws_s3_bucket.front.id

  index_document {
    suffix = var.index_document
  }

  error_document {
    key = var.error_document
  }

  routing_rule {
    condition {
      key_prefix_equals = var.routing_rule_condition_key_prefix
    }
    redirect {
      replace_key_prefix_with = var.routing_rule_redirect_prefix
    }
  }
}
