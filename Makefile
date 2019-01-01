build-dev:
	bundle install --path vendor/bundle
	yarn install && yarn build-dev

build:
	bundle install --path vendor/bundle
	yarn install && yarn build

deploy-dev:
	@make build-dev
	bundle exec foreman start

deploy:
	@make build
	bundle exec foreman start
