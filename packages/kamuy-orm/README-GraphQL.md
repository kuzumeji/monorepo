# GraphQL アクセス

- API キーなど資格情報ヘッダーでアクセスできるが、スループットと安全性から推奨されない

  ```sh
  curl -X POST 'https://ap-southeast-1.aws.realm.mongodb.com/api/client/v2.0/app/data-gipvp/graphql' \
  --header 'apiKey: xhbRDK7QxE6ye5JQiEt0WmHniR74qpWRNdmKLLwWYLHqJz5mdbDEASUeGV67rBOC' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "query": "query user { users { _id email name} }"
  }'
  ```

- アクセストークンを使用した Bearer 認証でアクセスすれば、スループットと安全性がよく推奨される

  - API キーでユーザ認証
    ```sh
    curl -X POST 'https://ap-southeast-1.aws.realm.mongodb.com/api/client/v2.0/app/data-gipvp/auth/providers/api-key/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "key": "xhbRDK7QxE6ye5JQiEt0WmHniR74qpWRNdmKLLwWYLHqJz5mdbDEASUeGV67rBOC"
    }'
    ```
    - レスポンス例
      ```text
      {
          "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RldmljZV9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsImJhYXNfZG9tYWluX2lkIjoiNjQyM2EwYzhmZTNiZjNhM2NhMmQzYTMwIiwiZXhwIjoxNjgwMTYxNjM1LCJpYXQiOjE2ODAxNTk4MzUsImlzcyI6IjY0MjUzNDViZGNmMmNmMWM0ZWE3MDAyZSIsInN0aXRjaF9kZXZJZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsInN0aXRjaF9kb21haW5JZCI6IjY0MjNhMGM4ZmUzYmYzYTNjYTJkM2EzMCIsInN1YiI6IjY0MjNhMGZlZGI2MTg4Y2ZhNDUzOGZmOCIsInR5cCI6ImFjY2VzcyJ9.rjNeVi1nHyglY9ecaPZKgOdYnxbuOemCzVZZucjITl0",
          "refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RhdGEiOm51bGwsImJhYXNfZGV2aWNlX2lkIjoiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwiYmFhc19kb21haW5faWQiOiI2NDIzYTBjOGZlM2JmM2EzY2EyZDNhMzAiLCJiYWFzX2lkIjoiNjQyNTM0NWJkY2YyY2YxYzRlYTcwMDJlIiwiYmFhc19pZGVudGl0eSI6eyJpZCI6IjY0MjNhMGZlZGI2MTg4Y2ZhNDUzOGZmYSIsInByb3ZpZGVyX3R5cGUiOiJhcGkta2V5IiwicHJvdmlkZXJfaWQiOiI2NDIzYTBkN2U3MmFjN2YxZWViYWUxMDMifSwiZXhwIjoxNjg1MzQzODM1LCJpYXQiOjE2ODAxNTk4MzUsInN0aXRjaF9kYXRhIjpudWxsLCJzdGl0Y2hfZGV2SWQiOiIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLCJzdGl0Y2hfZG9tYWluSWQiOiI2NDIzYTBjOGZlM2JmM2EzY2EyZDNhMzAiLCJzdGl0Y2hfaWQiOiI2NDI1MzQ1YmRjZjJjZjFjNGVhNzAwMmUiLCJzdGl0Y2hfaWRlbnQiOnsiaWQiOiI2NDIzYTBmZWRiNjE4OGNmYTQ1MzhmZmEiLCJwcm92aWRlcl90eXBlIjoiYXBpLWtleSIsInByb3ZpZGVyX2lkIjoiNjQyM2EwZDdlNzJhYzdmMWVlYmFlMTAzIn0sInN1YiI6IjY0MjNhMGZlZGI2MTg4Y2ZhNDUzOGZmOCIsInR5cCI6InJlZnJlc2gifQ.mwJg_b51rdRqIqxWrlydll3-e_p486RHmJd1m9Gc_VI",
          "user_id":"6423a0fedb6188cfa4538ff8",
          "device_id":"000000000000000000000000"
      }
      ```

  - Bearer 認証
    - 上記レスポンスのアクセストークンをBearerに指定する(`Authorization`ヘッダ)
    ```sh
    curl -X POST 'https://ap-southeast-1.aws.realm.mongodb.com/api/client/v2.0/app/data-gipvp/graphql' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RldmljZV9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsImJhYXNfZG9tYWluX2lkIjoiNjQyM2EwYzhmZTNiZjNhM2NhMmQzYTMwIiwiZXhwIjoxNjgwMTkyODE5LCJpYXQiOjE2ODAxOTEwMTksImlzcyI6IjY0MjVhZTJiZDliYmE0NjAxOWFjOGMyZiIsInN0aXRjaF9kZXZJZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsInN0aXRjaF9kb21haW5JZCI6IjY0MjNhMGM4ZmUzYmYzYTNjYTJkM2EzMCIsInN1YiI6IjY0MjNhMGZlZGI2MTg4Y2ZhNDUzOGZmOCIsInR5cCI6ImFjY2VzcyJ9.rNDOIXPTS70VlT6cKZgaHOJRsXq9W3H3BElMcxTG7fY' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "query": "query user { users { _id email name} }"
    }'
    ```
