# Backend of openapi testing

This is the backend for running a openapi3 compatible api

## How to run

- Install poetry
- Run `poetry install`
- Run `poetry run fastapi dev main.py` to run the backend

## Generating openapi3 spec

Run `gen_schema.sh`. The spec will be written to openapi.json
