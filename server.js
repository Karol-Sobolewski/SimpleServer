const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const formidable = require('formidable');

const app = express();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main', layout: 'light' }));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { name: req.params.name });
});

app.get('/about', (req, res) => {
    res.render('about', { layout: 'light' });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/info', (req, res) => {
    res.render('info');
});

app.get('/history', (req, res) => {
    res.render('history');
});

app.post('/contact/send-message', (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        console.log(files);
        if (err) {
            next(err);
            return;
        }
        const { author, sender, title, message } = fields;
        const { design } = files;
        if (author && sender && title && message && design) {
            res.render('contact', { isSent: true, design: files.design.name });
        }
        else {
            res.render('contact', { isError: true });
        }
    });



});


app.use((req, res) => {
    res.status(404).send('404 not found...');
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});