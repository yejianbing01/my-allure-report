#!/usr/bin/env zx
import { $ } from "zx";

/** 测试环境发布 */
(async () => {
  await $`yarn`;
  await $`yarn build:test`;

  await $`docker-compose -f ops/docker-compose.test.yml down`;

  await $`docker-compose -f ops/docker-compose.test.yml up --build -d`;
})();
