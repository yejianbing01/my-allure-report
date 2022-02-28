FROM nginx:latest

COPY ./build /usr/share/nginx/html

# 设置时区
RUN /bin/rm -rf /etc/localtime \
  && /bin/ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo 'Asia/Shanghai' >/etc/timezone

EXPOSE 80