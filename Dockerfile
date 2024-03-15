FROM node:20
ARG COMPOSEDB_CLI_VERSION=latest
RUN npm install --location=global @composedb/cli@${COMPOSEDB_CLI_VERSION}

ENTRYPOINT ["composedb"]
