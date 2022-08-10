#!/bin/bash
# First run your local ceramic node with `--network inmemory` param
node ../../bin/run.js composite:create ./data/composite.profiles.schema -o ../mocks/encoded.composite.profiles.json -k 7abdadac0eaf13799f6efb326fc6d4d0e27e28a38305356856545302b063f08c
node ../../bin/run.js composite:create ./data/composite.picture.post.schema -o ../mocks/encoded.composite.picture.post.json -k 7abdadac0eaf13799f6efb326fc6d4d0e27e28a38305356856545302b063f08c
node ../../bin/run.js composite:create ./data/composite.undeployed.schema -o ../mocks/encoded.composite.undeployed.json -k 7abdadac0eaf13799f6efb326fc6d4d0e27e28a38305356856545302b063f08c
node ../../bin/run.js composite:compile ../mocks/encoded.composite.picture.post.json ../mocks/runtime.composite.picture.post.json
