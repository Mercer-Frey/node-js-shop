const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const hbsFun = require('express-handlebars')
const errorController = require('./controllers/error')

const app = express();

// app.engine('hbsNameEngine', hbsFun({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}))

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404)

app.listen(3000);
