# Common base stage
FROM node:20-alpine as common-build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

# Production build stage
FROM common-build-stage as production-build-stage

COPY . .

ENV NODE_ENV=production

CMD ["npm", "run", "start"]

# Development build stage
FROM common-build-stage as development-build-stage
# Copy the rest of the code for initial container start
COPY . .

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]
