#!/bin/bash

cd "$(dirname "$0")"

poetry run python gen_schema.py
