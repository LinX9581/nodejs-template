# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy the rest of the application code
COPY . .

# Build the application if needed (uncomment if you have a build step)
# RUN yarn build

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3011/healthz || exit 1

# Expose the port the app runs on
EXPOSE 3011

# Start the application
CMD ["yarn", "start"]