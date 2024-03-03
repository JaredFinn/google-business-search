const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Adjust CORS options as needed
app.use(cors());

// Serve static files from the /docs directory
app.use(express.static(path.join('.', '/docs')));

// Handle SPA routing, return all requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join('.', '/docs/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
