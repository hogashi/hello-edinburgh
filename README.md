# hello-edinburgh

- shows timeline
  - auto-reload in 1 minute (rate limit)
- tweets with geo info
  - text only for now

## Deploy

1. edit `.env` (sample: `.env.sample`)
1. `$ apt install yarn`
1. `$ gem install bundler`
1. `$ make deploy`

## Development

- deploy in development environment
  - `$ make deploy-dev`
- test js with jest
  - `$ yarn test`
- lint js
  - `$ yarn lint`
