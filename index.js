const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
 
const port = 3000;
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.text({ type: "application/json" }));

app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);

app.get('/axios', (req, res) => {
    res.sendFile(path.join(__dirname, 'node_modules/axios/dist/axios.min.js'))
})
app.get('/', async (req, res) => {
    let users = await axios.get('https://jsonplaceholder.typicode.com/users');
   await res.render('home', {array: users.data}); 
});

app.get('/users', async (req, res) => {
    let users = await axios.get('https://jsonplaceholder.typicode.com/users');
   await res.json(users.data); 
})

app.put('/users', async (req, res) => {
    let modifiedUsers = req.body;
    await res.render('home', {array: JSON.parse(modifiedUsers)}); 
})


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
