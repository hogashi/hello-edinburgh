build:
	bundle install --path vendor/bundle
	yarn install && yarn build

deploy:
	@make build
	bundle exec foreman start
