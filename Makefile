install:
	npm ci

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

build:
	npm --prefix ./frontend run build

start:
	npx start-server -s ./frontend/dist
