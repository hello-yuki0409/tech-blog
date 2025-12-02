SHELL := /bin/bash

.PHONY: dev test deploy

dev:
	@npm run dev

test:
	@npm test -- --runInBand

# Example: DEPLOY_CMD="npx vercel --prod" make deploy
deploy: test
	@npm run build
	@test -n "$(DEPLOY_CMD)" || { echo "Set DEPLOY_CMD (e.g. DEPLOY_CMD='npx vercel --prod')"; exit 1; }
	@echo "Running deploy: $(DEPLOY_CMD)"
	@$(DEPLOY_CMD)
