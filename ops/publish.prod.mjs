#!/usr/bin/env zx
import { fs, $ } from "zx";

(async () => {
  // 当前版本号
  const { version } = await fs.readJson("./package.json");
  // docker镜像名称
  const currentImageTag = `report:${version}`;
  // docker容器名称
  const containerName = "report-production";
  // 生产服务器配置
  const remoteServer = {
    dockerImagesPath: "",
    ip: "",
    sshPort: "",
  };
  // 发版机（192.168.0.123）机器配置
  const clientDockerPath = "/root/docker-images/";
  const currentImage = `${clientDockerPath}${currentImageTag}.tar`;

  console.log("------------ 1.安装依赖 ------------");
  await $`yarn`;

  console.log("------------ 2.webpack打包 ------------");
  await $`yarn build:production`;

  console.log("------------ 3.构建镜像 ------------");
  await $`docker build -f Dockerfile -t ${currentImageTag} .`; // --build-arg REPORT_ENV=production

  console.log("------------ 4.保存镜像文件到本地 ------------");
  await $`docker save ${currentImageTag} > ${currentImage}`;

  console.log("------------ 5.复制镜像到生产服务器 ------------");
  await $`scp -P ${remoteServer.sshPort} ${currentImage} root@${remoteServer.ip}:${remoteServer.dockerImagesPath}/`;

  console.log("------------ 6.登录生产服务器部署应用 ------------");
  await $`ssh root@${remoteServer.ip} -p ${remoteServer.sshPort} << EOF
    docker ps -a | grep ${containerName} | awk '{print \\$1}' | xargs docker stop
    docker ps -a | grep ${containerName} | awk '{print \\$1}' | xargs docker rm -f
    docker images | grep web | awk '{print \\$3}' | xargs docker rmi -f

    docker load < ${remoteServer.dockerImagesPath}/${currentImageTag}.tar
    docker run -d --name ${containerName} -p 8080:80 --restart=always ${currentImageTag}
    exit
    EOF
  `;
})();
