develop:
	npx webpack serve

install:
	npm ci

build:
	NODE_ENV=production npx webpack

test:
	NODE_NO_WARNINGS=1 npx jest --coverage

test-watch:
	NODE_NO_WARNINGS=1 npx jest --watch --coverage false

lint:
	npx eslint .