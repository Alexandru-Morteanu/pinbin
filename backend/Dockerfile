# Use an official Node.js runtime as a parent image
FROM node:20-bullseye

# Set the working directory in the container
WORKDIR /app

# Copy package.json and bun.lockb files to the working directory
COPY package.json bun.lockb ./

# Install Bun
RUN npm install -g bun

# Copy the rest of your application code to the working directory
COPY . .

# Install Bun dependencies
RUN bun install

# Expose the port your app will run on
EXPOSE 8000

# Command to run your application
CMD ["bun", "src/index.ts"]
