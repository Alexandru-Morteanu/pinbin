# Use an official Node.js runtime as a parent image
FROM node:20-bullseye

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy SSL certificates
COPY certs /app/certs

# Expose the port
EXPOSE 8080

# Command to run your application
CMD ["node", "index.js"]
