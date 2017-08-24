# We build from the node image
FROM node:latest

# We load the package.json before the code.
# With that, Docker only install dependancies if this file change.
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

# We change the workdir
WORKDIR /usr/src/app

# We copy our source code to the docker image
COPY . /usr/src/app

# Our app is listening on the port 5000
EXPOSE 5000

# Finally, when we want to run our image, it's this command.
CMD ["node", "index.js"]
