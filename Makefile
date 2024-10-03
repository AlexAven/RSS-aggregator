develop:
	npx webpack serve

install:
	npm ci

build:
	NODE_ENV=production npx webpack

test:
	npx jest --coverage

test-watch:
	npx jest --watch --coverage false

lint:
	npx eslint .