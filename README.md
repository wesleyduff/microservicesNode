# MUST DO FIRST
1. Run build_scripts/build_uri_endpoint_mapper.js script with either : "dev" or "test" : "test" = AWS DEV charterdev
- `export NODE_ENV=dev&& node build_uri_endpoint_mapper.js`
- `export NODE_ENV=test&& node build_uri_endpoint_mapper.js`

2. Build docker container
3. Tag docker build
4. Push docker image to AWS ECS "charter/raven/testharness"

## Run locally
1. run svc via : `npm run local`
2. run ui via : `npm run local`

## debug svc locally
1. run svc locally via the debugger in intellij.
- setup environment variables as describe in the chalk page.
1. use postman
2. setup headers to run locally 
3. submit get or post via postman to svc