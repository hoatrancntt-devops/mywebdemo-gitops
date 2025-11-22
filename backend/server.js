const express = require('express');
const app = express();
const port = 3000;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Backend - Version CTO Approved!\ TRAN VAN HOA- DEVOPSVIET', timestamp: new Date() });
});

app.listen(port, () => console.log(`Backend listening at port ${port}`));
