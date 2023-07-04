# Spork Staking v2

This build is based off of scaffold-eth 2. In addition it uses [sst.dev](https://sst.dev) to manage the infrastructure and deployments to AWS.

## Architecture

![Architecture](./docs/architecture.png)

## Secret Manager Setup

The following values have to be set by the user in the AWS Secret Manager:

- `POLYGON_ALCHEMY_KEY`
- `SSPORK_ADDRESS`
- `NEXT_PUBLIC_WHITELISTED_ADDRESSES`

Use:

`npx sst secrets set VARIABLE_NAME VARIABLE_VALUE`

Example:

`npx sst secrets set POLYGON_ALCHEMY_KEY 1234567890`

Note that `NEXT_PUBLIC_WHITELISTED_ADDRESSES` is a comma separated list of addresses. Example:

`npx sst secrets set NEXT_PUBLIC_WHITELISTED_ADDRESSES 0x1234567890,0x0987654321`

## Contract ownership

The contract owner address is: 0x496E5dA3A13215e95351091a9aeCe295a3569e84
