# FROM node:lts-alpine3.19 AS release 换基础镜像
FROM zenika/alpine-chrome:124-with-node AS release

# 跳过 chromium 下载, 指定 chromium 浏览器路径的环境变量
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

# 设置工作目录
WORKDIR /app

# 将依赖文件拷贝到工作目录, copy 都加上 --chown=chrome 应该是给权限
COPY --chown=chrome package*.json ./

# 安装依赖
RUN npm install --production

# 拷贝程序文件到工作目录
COPY --chown=chrome views/ ./views/
COPY --chown=chrome server.js .

# 复制字体文件到系统字体目录
COPY --chown=chrome fonts/SmileySans.otf /usr/share/fonts/SmileySans.otf

# 更新字体缓存
RUN fc-cache -f -v

# 暴露应用运行的端口
EXPOSE 3000

# 启动应用
CMD ["node", "server.js"]
