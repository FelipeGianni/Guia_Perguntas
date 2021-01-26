const { render } = require("ejs");
const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta   = require("./database/Pergunta");
const Resposta   = require("./database/Resposta");

//Database
connection.authenticate()
         .then(() => {
            console.log('Conexão feita com o banco de dados');
         })
         .catch((error) => {
            console.log(error);
         });

//Informando o Express para usar o EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get('/', (req, res) => {
   Pergunta.findAll({ raw: true, order: [['id', 'DESC']] }).then(perguntas => {
      res.render("index", {
         perguntas: perguntas
      });
   });
});

app.get('/perguntar', (req, res) => {
   res.render("perguntar");
});

app.post('/salvarpergunta', function (req, res) {
   var titulo    = req.body.titulo;
   var descricao = req.body.descricao;

   //res.send('Formulário recebido! Titulo: ' + titulo + '; Descricao: ' + descricao + ';');
   Pergunta.create({
      titulo: titulo,
      descricao: descricao
   }).then(() => {
      res.redirect('/');
   });
});


app.get('/pergunta/:id', (req, res) => {
   var id = req.params.id;

   Pergunta.findOne({
      where: {id: id}
   }).then(pergunta => {
      if(pergunta != undefined){
         Resposta.findAll({
            where: {perguntaId: id},
            order: [['id','ASC']]
         }).then(respostas => {
            res.render('pergunta', {
               pergunta: pergunta,
               respostas: respostas
            });
         });
      } else {
         res.redirect('/');
      }
   });
});


app.post('/responder', function(req, res) {
  const { corpo, pergunta } = req.body;
  
   Resposta.create({
      corpo: corpo,
      perguntaId: pergunta
   }).then(() => {
      res.redirect('/pergunta/'+pergunta);
   });
});


app.listen(8080,()=>{
   console.log("App rodando");
});