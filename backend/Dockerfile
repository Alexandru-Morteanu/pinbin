# Build stage
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Install dependencies for development
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install dependencies for production
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Prerelease stage
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [Optional] Tests & Build
ENV NODE_ENV=production
RUN bun test
RUN bun run build

# Install TensorFlow Python
USER root
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip3 install tensorflow

# Release stage
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/index.ts .
COPY --from=prerelease /usr/src/app/package.json .

USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "dev"]
