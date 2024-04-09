FROM node:20
ARG COMPOSEDB_CLI_VERSION=latest
RUN apt-get update && apt-get install -y git curl gettext-base
RUN npm install --location=global @composedb/cli@${COMPOSEDB_CLI_VERSION}

ENTRYPOINT ["composedb"]
