install:
	npm ci
	npm ci --prefix ./frontend

lint:
	npx eslint .

test:
	npm test

test-playwright:
	npm --prefix ./frontend test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

build:
	npm --prefix ./frontend run build

start:
	npx start-server -s ./frontend/dist

start-frontend:
	npm --prefix ./frontend run dev
