terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "3.29.0"
    }
  }
}
provider "aws" {
    # Configuration options
    region = "us-east-1"
}

// Set up S3 bucket
resource "aws_s3_bucket" "b" {
  bucket = "devjournal-frontend"
  acl    = "public-read"

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
        "Sid": "PublicReadGetObject",
        "Effect": "Allow",
        "Principal": "*",
        "Action": [
            "s3:GetObject"
        ],
        "Resource": "arn:aws:s3:::devjournal-frontend/*"
        }
    ]
    }
    EOF

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

// Get the ACM certificate
data "aws_acm_certificate" "issued" {
  domain   = "therealdevjournal590.link"
  statuses = ["ISSUED"]
}

// CloudFront
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }

    domain_name = aws_s3_bucket.b.website_endpoint
    origin_id   = "therealdevjournal590.link"

  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront distribution for devjournal frontend S3 bucket"
  default_root_object = "index.html"

  aliases = ["therealdevjournal590.link"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "therealdevjournal590.link"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA", "GB", "DE"]
    }
  }

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.issued.arn
    ssl_support_method  = "sni-only"
  }
}