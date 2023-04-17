FROM node:16-slim

# update package
RUN apt-get update && \
    apt-get upgrade -y

# install locale, set TZ/LANG
RUN apt-get install -y locales && \
    locale-gen ja_JP.UTF-8

# install opt
RUN apt-get install -y emacs && \
    apt-get install -y less

# install pnpm
RUN npm install -g pnpm

WORKDIR /app
USER node
