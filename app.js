const express = require('express');
const regionRoutes = require('./routes/region.js')

const app = express();

var port = process.env.PORT || 3200;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.redirect('/region/Africa/Lagos');
});

app.use('/region', regionRoutes);

app.use((req, res) => {
    res.status(404).render('404')
});