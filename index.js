const { render } = require("ejs");
const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");

//Informando o Express para usar o EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get('/', (req, res) => {
   res.render("index");
});

app.get('/perguntas', (req, res) => {
   res.render("perguntas");
});

app.post('/salvarpergunta', function (req, res) {
   var titulo    = req.body.titulo;
   var descricao = req.body.descricao;

   res.send('Formulário recebido! Titulo: ' + titulo + '; Descricao: ' + descricao + ';');
});


app.listen(8080,()=>{
   console.log("App rodando");
});