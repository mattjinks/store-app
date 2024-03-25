import express from 'express';
import sharp from 'sharp';
const images = express.Router();

interface ImageQuery {
  width?: string;
  height?: string;
}

images.get('/', async (req, res) => {
  const { width, height } = req.query as ImageQuery;
  const format = 'jpeg';
  const options = {
    width: width ? parseInt(width, 10) : undefined,
    height: height ? parseInt(height, 10) : undefined,
    fit: sharp.fit.cover,
    withoutEnlargement: true,
  };

  try {
    const image = sharp('charles.jpg').resize(options).toFormat(format);
    res.type(`image/${format}`);
    image.pipe(res);
  }

  catch (error) {
    res.send('Error processing image');
    console.log(error);
  }
});

export default images;
