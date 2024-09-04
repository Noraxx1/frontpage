# 1. Use a Node.js base image. You can choose the specific version you need.
FROM node:20-bullseye-slim

# 2. Install curl (required to download bun)
RUN apt-get update && apt-get install -y curl

# 3. Install bun
RUN curl -fsSL https://bun.sh/install | bash

# 4. Add bun to the PATH environment variable
ENV BUN_INSTALL="/root/.bun"
ENV PATH="${BUN_INSTALL}/bin:${PATH}"

# 5. Set the working directory inside the container
WORKDIR /app

# 6. Copy package.json, bun.lockb, and any other files needed for installation
COPY package.json bun.lockb ./

# 7. Install dependencies using bun
RUN bun install

# 8. Copy the rest of the application files into the container
COPY . .

# 9. Specify the command to run your app
CMD ["bun", "run", "host.js"]

# 10. Expose the port your app runs on (optional)
EXPOSE 3000

