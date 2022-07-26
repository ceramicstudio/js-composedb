# Getting Started with ComposeDB

## Create a schema

* Create a graphQL compatible composite schema, such as

```


```

* Compile the schema to [format]


## Run a Ceramic node with indexing on

Check out js-ceramic `https://github.com/ceramicnetwork/js-ceramic` and follow the instructions to install prerequisites and build.

_at the moment there are some bugs, check out `c0ededf2` commit in js-ceramic_

`git checkout c0ededf2`

### Add your model ids and the overall model stream id to the indexing configuration

Edit `~/.ceramic/daemon.config.json` and add a section for indexing, if not already present:

```
  "indexing": {
    "db": "sqlite:///Users/gv/.ceramic/indexing.sqlite",
    "allow-queries-before-historical-sync": true,
    "models": ["YOUR_MODEL_ID", ... ,"kh4q0kq8h3j3zb52p8gjcayuwrdpt"]
  }
```
Note that *kh4q0kq8h3j3zb52p8gjcayuwrdpt* is the stream id for the all-models stream, this must be included

### Run ceramic daemon

`CERAMIC_ENABLE_EXPERIMENTAL_INDEXING='true' node packages/cli/bin/ceramic.js daemon`


## Deploy your compiled schema to ceramic

`composedb composite:deploy YOUR-COMPILED-SCHEMA.json --ceramic-url=http://localhost:7007`


