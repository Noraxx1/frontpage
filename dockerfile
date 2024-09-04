FROM node:20-bullseye-slim

RUN apt-get update && apt-get install -y curl

RUN curl -fsSL https://bun.sh/install | bash || { echo 'Bun installation failed'; exit 1; }
ENV BUN_INSTALL="/root/.bun"
ENV PATH="${BUN_INSTALL}/bin:${PATH}"

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install || { echo 'Bun dependencies installation failed'; exit 1; }

COPY . .

RUND node host.js

EXPOSE 3000
