SHELL := /bin/bash

.PHONY: install dev lint test typecheck build start clean deploy

install:
	@npm install

dev:
	@npm run dev

lint:
	@npm run lint

test:
	@npm test -- --runInBand

typecheck:
	@npx tsc --noEmit

build:
	@npm run build

start:
	@npm run start

clean:
	@rm -rf .next

# Set DEPLOY_CMD to the actual deploy command, e.g.:
#   DEPLOY_CMD="npx vercel --prod" make deploy
deploy: build
	@test -n "$(DEPLOY_CMD)" || { echo "Set DEPLOY_CMD (e.g. DEPLOY_CMD='npx vercel --prod')"; exit 1; }
	@echo "Running deploy: $(DEPLOY_CMD)"
	@$(DEPLOY_CMD)
