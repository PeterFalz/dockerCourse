FROM node:18.13.0-alpine

USER node
WORKDIR /home/node
ADD --chown=node . /home/node

CMD [ "node", "app.js" ]
