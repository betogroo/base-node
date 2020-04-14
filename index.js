const express = require("express")
const app = express()
const PORT = 3000

app.set('view engine', 'ejs');
app.use(express.static('public'));

const IndexRouter = require('./routes/IndexRouter')

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/', IndexRouter)

app.listen(PORT, () => {
    console.log("O servidor está rodando em http://localhost:" + PORT)
})

