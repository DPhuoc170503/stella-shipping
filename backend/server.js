const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const navRoute = require('./routes/nav');
const articlesRoute = require('./routes/articles');
const pricingRoute = require('./routes/pricing');
const quotesRoute = require('./routes/quotes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/nav', navRoute);
app.use('/api/articles', articlesRoute);
app.use('/api/pricing', pricingRoute);
app.use('/api/quotes', quotesRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));
