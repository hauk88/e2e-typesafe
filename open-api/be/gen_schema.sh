#!/bin/bash

cd "$(dirname "$0")"

eval "$(conda shell.bash hook)"
conda activate e2ets
python gen_schema.py