import json
import os
import urllib.request
import urllib.error
import boto3
import random

with open("messages.txt") as f:
    FLAG_MESSAGES = f.read().splitlines()

def fetch_json(url, headers):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = response.read().decode()
            return response.getcode(), json.loads(data)
    except urllib.error.HTTPError as e:
        error_data = e.read().decode()
        try:
            return e.code, json.loads(error_data)
        except Exception:
            return e.code, error_data

def get_solves_data(base_url, token):
    headers = {
        "Authorization": f"Token {token}",
        "Content-Type": "application/json"
    }
    return fetch_json(f"{base_url}/api/v1/users/me/solves", headers)

def gen_flags(prefix, num):
    messages = random.sample(FLAG_MESSAGES, num)
    return [f"{prefix}{{{message}}}" for message in messages]

def upload_to_s3(bucket_name, file_name, data, content_type="text/plain"):
    s3 = boto3.client("s3")
    response = s3.put_object(
        Bucket=bucket_name,
        Key=file_name,
        Body=data if isinstance(data, bytes) else data.encode(),
        ContentType=content_type
    )
    return response

def lambda_handler(event, context):
    token = os.environ.get("CTFD_TOKEN")
    base_url = os.environ.get("CTFD_BASE_URL")
    flag_prefix = os.environ.get("FLAG_PREFIX")
    bucket_name = os.environ.get("S3_BUCKET_NAME")

    if not token or not base_url or not flag_prefix or not bucket_name:
        return {
            "statusCode": 500,
            "body": json.dumps({
                "error": "Missing configuration",
                "details": "CTFD_TOKEN, CTFD_BASE_URL, FLAG_PREFIX, S3_BUCKET_NAME must be set"
            })
        }

    if len(FLAG_MESSAGES) != len(set(FLAG_MESSAGES)):
        return {
            "statusCode": 500,
            "body": json.dumps({
                "error": "Duplicate messages",
                "details": "FLAG_MESSAGES must not contain duplicate messages"
            })
        }

    status_code, solves_data = get_solves_data(base_url, token)
    if status_code != 200:
        return {
            "statusCode": status_code,
            "body": json.dumps({
                "error": "Failed to fetch solved challenges",
                "details": solves_data
            })
        }

    solves = solves_data.get("data", [])
    flags = gen_flags(flag_prefix, len(solves))
    assert len(solves) == len(flags) == len(set(flags))
    category_to_challenge_flags = {}
    for solve, flag in zip(solves, flags):
        challenge = solve.get("challenge", {})
        category = challenge.get("category", "uncategorized")
        name = challenge.get("name", "unknown")
        date_str = solve.get("date")
        if category not in category_to_challenge_flags:
            category_to_challenge_flags[category] = {}
        category_to_challenge_flags[category][name] = {
            "flag": flag,
            "date": date_str
        }

    res = upload_to_s3(bucket_name, "flags.json", json.dumps(category_to_challenge_flags))
    if res.get("ResponseMetadata", {}).get("HTTPStatusCode") != 200:
        return {
            "statusCode": 500,
            "body": json.dumps({
                "error": "Failed to upload flags to S3",
                "details": res,
            })
        }

    return {
        "statusCode": 200,
        "body": "Flags generated and uploaded to S3"
    }
