# devOps

## 测试环境发布

```sh
  # 在当前项目根目录下执行
  node ops/publish.test.mjs
```

## 生产环境发布

> 由于生产环境为云服务器，无法 pull 代码，采用线下服务器制作好 docker 镜像然后拷贝到线上云服务的方式部署，无法使用 docker-compose

```sh
  # 在当前项目根目录下执行
  node ops/publish.prod.mjs
```

## 配置说明

1. nginx.conf

```sh
# 解决刷新页面出现404的问题
server {
  location / {
    root /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
  }
}
```
