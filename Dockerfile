# ================== STEP 1: Build ==================
FROM firebytes.azurecr.io/firebytes/node:18-alpine-pnpm as builder

# 将 angular 前端源码复制到 /app 目录中
WORKDIR /app
COPY . .

# 还原 node_modules
RUN pnpm install --frozen-lockfile
RUN ls -l
RUN echo "package restore is success"

# 编译项目
# RUN npm run build
RUN pnpm build
RUN echo "build is success"

# ================== STEP 2: Publish ==================
FROM nginx:alpine-slim

# 复制 nginx.conf 配置文件到镜像中
COPY ["./nginx/default.conf", "/etc/nginx/nginx.conf"]

# 删除 nginx html 原有内容
RUN rm -rf /usr/share/nginx/html/*

# 从编译镜像复制编译结果到此镜像
COPY --from=builder /app/dist /usr/share/nginx/html

