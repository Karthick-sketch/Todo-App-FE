# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build the React app
RUN npm run build

# Specify the runtime command
CMD ["npm", "run", "dev"]
