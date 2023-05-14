# base image
FROM node:latest

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install --force

# copy app files
COPY . .

# build app
RUN npm run build

# set environment variables
ENV REACT_APP_API_URL=http://localhost

# expose port
EXPOSE 3000

# start app
CMD ["npm", "start"]