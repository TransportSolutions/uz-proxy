const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/uz', async (req, res) => {
  const wagon = req.query.wagon;
  if (!wagon) return res.status(400).send('Номер вагона не вказано');

  const url = `https://www.uz.gov.ua/car_info/index.php?func=print&site_nv=${wagon}`;

  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Помилка при отриманні сторінки');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
