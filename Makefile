build-dev:
	bundle install --path vendor/bundle
	yarn install && yarn build-dev

build:
	bundle install --path vendor/bundle
	yarn install && yarn build

serve-dev:
	APP_ENV=development bundle exec foreman start

serve:
	APP_ENV=production bundle exec foreman start

deploy-dev:
	@make build-dev
	@make serve-dev

deploy:
	@make build
	@make serve
