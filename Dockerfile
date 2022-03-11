# 1. 安装依赖
FROM node:16-alpine AS node_modules
WORKDIR /app  
COPY ./package.json ./yarn.lock ./
RUN yarn config set disturl https://npm.taobao.org/dist
RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn config set strict-ssl false
RUN yarn install

# 2. 打包
FROM node:16-alpine AS build
ARG REPORT_ENV
WORKDIR /app  
RUN yarn config set disturl https://npm.taobao.org/dist
RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn config set strict-ssl false
RUN yarn global add dotenv-cli
COPY . .
COPY --from=node_modules /app/node_modules ./node_modules
RUN yarn build:$REPORT_ENV

# 3. 部署nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# 设置权限
RUN /bin/chmod -R 755 /usr/share/nginx/html
# 设置时区
RUN /bin/rm -rf /etc/localtime \
  && /bin/ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo 'Asia/Shanghai' >/etc/timezone
EXPOSE 80