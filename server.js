const express = require('express');
const app = express();

const PORT = process.env.PORT || PORT;

app.listen(PORT, () => console.log(`Server listening on port:${PORT}`));

