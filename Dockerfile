FROM node:14
WORKDIR /koa2-frame

COPY package.json ./

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN echo 'Asia/Shanghai' >/etc/timezone

RUN npm config set registry "https://registry.npm.taobao.org/" \
  && npm install --production

COPY . .

EXPOSE 5005

CMD ["node", "app.js"]