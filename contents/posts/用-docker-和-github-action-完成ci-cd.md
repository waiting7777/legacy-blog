---
title: 用 Docker 和 Github Action 完成 CI CD
tags: devops, ci cd, github action
category: Blog
excerpt: 如果靜態部落格每次都要手動更新，在這年代也未免太麻煩。
date: 2022-08-09
image: ./images/docker-github-action.png
image_caption: from gridsome.org
author: author1
slug: 用-docker-和-github-action-完成ci-cd
---

## 什麼是 CI CD？

CI CD 是指 Continuous Integration 和 Continuous Deployment 的總稱。意思是，當你的項目上傳到 Github，並且通過 CI，就可以自動地將你的項目部署到你的伺服器上。

## 如何做 CI CD？

因為部落格改用 Nextjs 改寫後，每次部署的流程其實就是 `yarn build` 和 `yarn start`，在自己機器上 pull 最新的 code 然後包好最新的 build，再跑起來。現在就是打算把這段流程改成使用 Docker 和 Github Action。

## 如何做 Docker？

在機器上安裝 docker，並且執行 docker build -t xxx 指定自己的 tag，以下是我使用的 dockerfile

```yaml
# Install dependencies only when needed
FROM node:16-alpine as Base

WORKDIR /app

COPY package.json yarn.lock ./

FROM base as build
RUN export NODE_ENV=production
RUN yarn

COPY . .
RUN yarn build

FROM base as prod-build

RUN yarn install --production
RUN cp -R node_modules prod_node_modules

FROM base as prod

COPY --from=prod-build /app/prod_node_modules /app/node_modules
COPY --from=build  /app/.next /app/.next
COPY --from=build  /app/public /app/public

EXPOSE 3000
CMD ["yarn", "start"]
```

build 完之後 push 到 docker hub 上，再用 Github Action 去做 deploy。

## 如何做 Github Action？

先分析到底有哪些動作

- Check out the repo
- Build and push Docker image
- 遠端登入到自己的機器
- pull Docker image and run it

將上敘述的動作寫成 Github Action，並且執行。

```yaml
name: Publish Docker image

on:
  push:
    branches:
      - main

jobs:
  push_to_registry:
    name: Push Docker image to Docker Hub
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v2

      - name: Login in to Docker Hub
        uses: docker/login-action@f054a8b539a109f9f41c372932f1ae047eff08c9
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@98669ae865ea3cffbcbaa878cf57c20bbf1c6c38
        with:
          images: waiting7777/blog

      - name: Build and push Docker image
        uses: docker/build-push-action@ad44023a93711e3deb337508980b4b5e9bcdc5dc
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

      - name: SSH Remote Commands
        uses: appleboy/ssh-action@v0.1.4
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          password: ${{ secrets.PASSWORD }}
          script: |
            docker kill $(docker ps -q)
            docker rm $(docker ps -a -q)
            docker pull waiting7777/blog:main
            docker run -d -t -p 80:3000 waiting7777/blog:main
```

如此遍能完成 CI CD。

## 心得

有了 docker 以後，build 網站終於不用管理環境，再搭配上 Github Action 就可以自動部署了。
