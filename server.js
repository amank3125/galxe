const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors module

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Proxy endpoint
app.post('/graphql-proxy', async (req, res) => {
  const { query, variables } = req.body;

  try {
    const response = await axios.post('https://graphigo.prd.galaxy.eco/query', { query, variables });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
