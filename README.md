### README.md
[中文版本](README-CN.md)
# Markdown to Image Renderer

This project is a Node.js application that converts Markdown content into an image using Puppeteer. The application renders the Markdown content as HTML, applies custom styles, and takes a screenshot to generate an image. The project is containerized using Docker for easy deployment.

## Features

- Convert Markdown content to styled HTML.
- Render HTML to an image using Puppeteer.
- Custom styles for various Markdown elements including blockquotes.
- Dockerized for easy deployment and consistent environment.

## Project Structure

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

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Docker

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/md2canvas.git
   cd md2canvas
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

### Running the Application

1. **Start the server**:
   ```sh
   node server.js
   ```

2. **Send a POST request** to the `/render` endpoint with the following JSON payload:
   ```json
   {
     "markdown": "# Hello World\nThis is a sample Markdown content.",
     "imageUrl": "https://example.com/image.png",
     "date": "Vol.1 2024-6-9",
     "logo_img": "https://example.com/logo.png",
     "qrcode_img": "https://example.com/qrcode.png"
   }
   ```

### Docker

1. **Build the Docker image**:
   ```sh
   docker build -t md2canvas:0.0.2 --output type=docker ..
   ```

2. **Run the Docker container**:
   ```sh
   docker run -d --cap-add=SYS_ADMIN -p 3000:3000 --name md2canvas md2canvas:0.0.2
   ```

## API Endpoints

### `/render`

- **Method**: POST
- **Description**: Renders the Markdown content and returns an image.
- **Request Body**:
  ```json
  {
    "markdown": "string",
    "imageUrl": "string",
    "date": "string",
    "logo_img": "string",
    "qrcode_img": "string"
  }
  ```

### `/html`

- **Method**: POST
- **Description**: Renders the Markdown content and returns the HTML.
- **Request Body**:
  ```json
  {
    "markdown": "string",
    "imageUrl": "string",
    "date": "string",
    "logo_img": "string",
    "qrcode_img": "string"
  }
  ```

## Contributing

Feel free to submit issues and pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.