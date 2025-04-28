GOCMD=go
GORUN=$(GOCMD) run
GOBUILD=$(GOCMD) build
GOTEST=$(GOCMD) test
BINARY_NAME=calendar-backend

.PHONY: start build test clean generate

start: build
	./$(BINARY_NAME)

build: clean
	$(GOBUILD) -o $(BINARY_NAME)

test:
	$(GOTEST) $(shell cat testdirs.txt)

lint:
	golangci-lint run

clean:
	rm -f $(BINARY_NAME)

generate:
	$(GORUN) github.com/99designs/gqlgen
