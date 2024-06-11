### README.md (中文版本)
[English Version](README-EN.md)
# Markdown 到图片渲染器

该项目是一个基于 Node.js 的应用程序，用于将 Markdown 内容转换为图片。应用程序将 Markdown 内容渲染为 HTML，应用自定义样式，然后使用 Puppeteer 截图生成图片。项目使用 Docker 容器化，便于部署。

## 功能

- 将 Markdown 内容转换为带样式的 HTML。
- 使用 Puppeteer 将 HTML 渲染为图片。
- 为各种 Markdown 元素（包括 blockquote）应用自定义样式。
- 使用 Docker 容器化，便于部署和环境一致性。

## 示例
![Example](example/image.png)

## 项目结构

```
md2canvas/
  ├── fonts/
  │   └── SmileySans.otf
  ├── node_modules/
  ├── views/
  │   └── template.ejs
  ├── .dockerignore
  ├── Dockerfile
  ├── package-lock.json
  ├── package.json
  └── server.js
```

## 快速开始

### 前置条件

- Node.js (v14 或更高版本)
- Docker

### 安装

1. **克隆仓库**：
   ```sh
   git clone https://github.com/your-username/md2canvas.git
   cd md2canvas
   ```

2. **安装依赖**：
   ```sh
   npm install
   ```

### 运行应用程序

1. **启动服务器**：
   ```sh
   node server.js
   ```

2. **发送 POST 请求** 到 `/render` 端点，使用以下 JSON 负载：
   ```json
    {
    "markdown": "# Hello World\nThis is a sample Markdown content.",
    "imageUrl": "https://example.com/image.png",  // 选填
    "date": "Vol.1 2024-6-9",
    "logo_img": "https://example.com/logo.png",
    "qrcode_img": "https://example.com/qrcode.png"
    }
   ```

### Docker

1. **构建 Docker 镜像**：
   ```sh
   docker build -t md2canvas:0.0.2 --output type=docker .
   ```

2. **运行 Docker 容器**：
   ```sh
   docker run -d --cap-add=SYS_ADMIN -p 3000:3000 --name md2canvas md2canvas:0.0.2
   ```

## API 端点

### `/render`

- **方法**: POST
- **描述**: 渲染 Markdown 内容并返回图片。
- **请求体**:
  ```json
  {
    "markdown": "string",
    "imageUrl": "string", // 选填
    "date": "string",
    "logo_img": "string",
    "qrcode_img": "string"
  }
  ```

### `/html`

- **方法**: POST
- **描述**: 渲染 Markdown 内容并返回 HTML。
- **请求体**:
  ```json
  {
    "markdown": "string",
    "imageUrl": "string", 
    "date": "string",
    "logo_img": "string",
    "qrcode_img": "string"
  }
  ```

## 贡献

欢迎提交问题和拉取请求。对于重大更改，请先打开一个问题以讨论您想要更改的内容。

## 许可证

本项目采用 MIT 许可证。