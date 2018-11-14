build:
	bundle install
	yarn install && yarn build

deploy:
	@make build
	bundle exec foreman start
