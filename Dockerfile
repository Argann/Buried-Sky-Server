# We build from the node image
FROM node:latest

# We create the directory for the project
RUN mkdir /usr/src/app

# We change the workdir
WORKDIR /usr/src/app

# We copy our source code to the docker image
COPY . /usr/src/app

# Install everything
RUN npm install

# Our app is listening on the port 5000
EXPOSE 5000

# Finally, when we want to run our image, it's this command.
CMD ["node", "index.js"]
