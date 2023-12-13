const app = require('./app');
const io = require('./io');

app.listen(3000);
io(app);