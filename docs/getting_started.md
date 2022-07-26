# Getting Started with ComposeDB

## Create a schema

* Write a graphQL compatible composite schema in a text file, such as

example: task.schema
```
type Task @model(
    accountRelation: LIST,
    description: "Basic task"
) {
    assignee: String! @length(min:1, max: 30)
    completed: Boolean
    content: String! @length(max:2000)
}

```

* generate a DID key 

If you do not already have a DID key handy, you will need to create one 

If you have downloaded and installed this repo or the [js-glaze](https://github.com/ceramicstudio/js-glaze) repo you can run
```
cd packages/cli
node bin/run.js did:generate-seed
```
save this result for use as the did key in the next step.

* Create schema and output encoded composite

`composedb composite:create [graphql_def_file] -k [didkey] -o [output_file.json]`

Inspect the output file for the model id(s), to use in the next step

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

`composedb composite:deploy [output_file.json] --ceramic-url=http://localhost:7007`


