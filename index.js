var express = require('express');
var app = express();
var neo4j = require('neo4j-driver').v1;
var bodyParser = require('body-parser');

var imagen = 'img/emojimezcal.gif', color = 'none';

//CONFIGURACIÓN DE MÓDULOS INTERNOS DE EXPRESS
app.use(bodyParser.json()); //DECLARACION DE PROTOCOLO DE LECTURA DE LAS VARIABLES INTERNAS "BODY" DE LAS FUNCIONES 
app.use(bodyParser.urlencoded({ extended:true})); //DECLARACIÓN DE ENCODER DE URL

// Conexión con base de datos remota
var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;

if(graphenedbURL == undefined){
	var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'mdl'));
	var session = driver.session();
}else{
	var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));
	var session = driver.session();
};

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    
imagen = 'img/emoji_veladora.gif'; 
color = 'none';
    
  response.render('pages/index', {
        imagen: imagen,
        color: color,
        mensaje: ""
  });
});

app.post('/votacion', function(req, res){
    var email = req.body.email;
    
    console.log('Comenzando registro...');
    
    session
        .run('MATCH (n:EmojiVoter) WHERE n.email = {email} RETURN n', {email:email})
        .then(function(resultado) {
        
            
            
    if( resultado.records[0] != undefined){
        
        console.log('resultado: ');
            console.log(resultado.records[0]._fields[0].properties.email);
        
          if( resultado.records[0]._fields[0].properties.email == email){
                res.render('pages/index', {
                    imagen: imagen,
                    color: color,
                    mensaje: 'Este correo ya ha sido registrado!'
                })
                
                console.log("Este correo ya ha sido registrado!")
            }else{
            
            
            session
                .run('CREATE (n:EmojiVoter {email: {email} }) RETURN n', {email:email})
                .then(function(resultado){
                    imagen = 'img/agradecimiento.gif';
                    color = '#ffcc16';
                    res.render('pages/index', {
                        imagen: imagen,
                        color: color,
                        mensaje: ""
                    })
                    
                    console.log("Este correo ya ha sido registrado!")
                })
                .catch(function(error){
                    console.log(error);
                })
            
            }
            
    }else{
        
         console.log('resultado: ');
            console.log(resultado.records[0]);
        
        if(resultado.records[0] == email ){
            res.render('pages/index', {
                    imagen: imagen,
                    color: color,
                    mensaje: 'Este correo ya ha sido registrado!'
                })
            console.log("Este correo ya ha sido registrado!")
            
        }else{
            session
                .run('CREATE (n:EmojiVoter {email: {email} }) RETURN n', {email:email})
                .then(function(resultado){
                    imagen = 'img/agradecimiento.gif';
                    color = '#ffcc16';
                    res.render('pages/index', {
                        imagen: imagen,
                        color: color,
                        
                    })
                })
                .catch(function(error){
                    console.log(error);
                })
        }
        
    }
        
          
            
        })
         .catch(function(error){
                console.log(error);
            }) 
    
    
     
});

app.get('/porque', function(req, res){
    res.render('pages/porque');
})

app.get('/proceso', function(req, res){
    res.render('pages/proceso');
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});