const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const MarkdownIt = require('markdown-it');
const markdownItMark = require('markdown-it-mark');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 提供静态文件，包括字体
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

const markdownIt = new MarkdownIt({
  xhtmlOut: false,
  breaks: true,
  html: true
}).use(markdownItMark);

app.post('/render', async (req, res) => {
  const { markdown, imageUrl, date, logo_img, qrcode_img } = req.body;
  if (!markdown || !date || !logo_img || !qrcode_img) {
    return res.status(400).send('Markdown content, date, logo_img and qrcode_img are required');
  }

  const htmlContent = markdownIt.render(markdown);

  res.render('template', { htmlContent, imageUrl, date, logo_img, qrcode_img }, async (err, html) => {
    if (err) {
      return res.status(500).send('Error rendering template');
    }

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 }); // iPhone 12 Pro dimensions
      await page.setContent(html, { waitUntil: 'networkidle0' });
      await page.evaluateHandle('document.fonts.ready'); // 确保字体加载完成
      const cardElement = await page.$('.flex'); // 使用适当的选择器定位卡片元素
      const boundingBox = await cardElement.boundingBox();
      const imageBuffer = await cardElement.screenshot({
        clip: {
          x: boundingBox.x,
          y: boundingBox.y,
          width: Math.ceil(boundingBox.width),
          height: Math.ceil(boundingBox.height)
        }
      });

      await browser.close();
      res.set('Content-Type', 'image/png');
      res.send(imageBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.post('/html', (req, res) => {
  const { markdown, imageUrl, date, logo_img, qrcode_img } = req.body;
  if (!markdown || !date || !logo_img || !qrcode_img) {
    return res.status(400).send('Markdown content, date, logo_img and qrcode_img are required');
  }

  const htmlContent = markdownIt.render(markdown);

  res.render('template', { htmlContent, imageUrl, date, logo_img, qrcode_img }, (err, html) => {
    if (err) {
      return res.status(500).send('Error rendering template');
    }

    res.set('Content-Type', 'text/html');
    res.send(html);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
