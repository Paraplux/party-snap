FROM node:20.9.0-alpine AS build

ENV APP_HOME=/home/node/app

RUN mkdir -p $APP_HOME/node_modules && chown -R node:node $APP_HOME

WORKDIR $APP_HOME

COPY --chown=node:node package*.json ./

USER node

RUN npm ci && npm cache clean --force

COPY --chown=node:node . .

# Build the React app
RUN npm run build --no-cache

# Use a lightweight web server to serve the static files
FROM node:20.9.0-alpine AS serve

ENV APP_HOME=/home/node/app

WORKDIR $APP_HOME

COPY --from=build $APP_HOME/dist .

RUN apk update && apk add --no-cache curl
# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose port 80
EXPOSE 80

# Start the HTTP server
CMD ["serve", "-s", ".", "-l", "80"]