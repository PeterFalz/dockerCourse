# --- --------------------------------------------------
# --- builder-Image für Zusammenbau und Compile

FROM node:18.13.0-alpine AS builder

USER node
WORKDIR /home/node

ADD --chown=node package.json /home/node
ADD --chown=node package-lock.json /home/node
RUN npm install

ADD --chown=node . /home/node
RUN npx tsc

# --- --------------------------------------------------
# --- Image für das, was für die Auslieferung notwendig ist

FROM node:18.13.0-alpine

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package.json ./package.json
COPY --from=builder /home/node/package-lock.json ./package-lock.json
COPY --from=builder /home/node/build ./build
COPY --from=builder /home/node/public ./public

RUN npm install --production

CMD [ "node", "build/app.js" ]
