// Variables //
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')
let cookie = require('cookie-parser')
let Db_interact = require("./models/db_interact")

// Donnée de la base //
let allRepas;


// Moteur de Template //
app.set('view engine', 'ejs')

// Middleware //
app.use('/assets',express.static('public'))
app.use('/sem',express.static('semantic'))
app.use('/elite',express.static('eliteA'))
app.use('/elite/module',express.static('mod'))
app.use('/models',express.static('models'))
app.use(bodyParser.urlencoded({ extended :false }))
app.use(bodyParser.json())
app.use(cookie())
app.use(session({
    secret: 'akanzlkrnlkn',
    resave: false,
    saveUninitialized: true,
    cookie: {secure:false}
}))
app.use(require('./middleware/flash'))

// Routes //

// GET //
app.get('/', (request,response) => {
    if(request.cookies.userCookie != undefined)
        response.render('pages/page-wrapper', {isConnected:true,userPseudo:request.cookies.userCookie,data_repas:allRepas}) 
    else
        response.render('pages/index')
})

app.get('/inscription', (req,res) =>{
    res.render('pages/inscription',{isConnected:false})
})

app.get('/index', (req,res) =>{
    if(req.cookies.userCookie != undefined)
        res.clearCookie('userCookie')
    res.render('pages/index',{isConnected:false,form_success:null})
})

app.get('/app',(req,res) =>{
    if(req.cookies.userCookie)
        res.render('pages/page-wrapper',{isConnected:true,userPseudo:req.cookies.userCookie,data_repas:allRepas})
    else
        res.render('pages/index',{isConnected:false,form_success:null})
})


// POST //
app.post('/', (req,res) =>{
    Db_interact.connectToApp(req.body.pseudo,req.body.password, (resultQuery) =>{
        if(resultQuery.length > 0){
            res.cookie('userCookie', req.body.pseudo, {maxAge: 360000});
            Db_interact.getUserRepas(req.body.pseudo, (resultQuery) => {
                allRepas = JSON.stringify(resultQuery)
                res.render('pages/page-wrapper', {isConnected:true,userPseudo:req.body.pseudo,data_repas:allRepas})
            })
        }           
        else
            res.render('pages/index', {form_success:false})
    })
})

app.post('/inscription', (req, res) =>{
    Db_interact.insertNewUser(req.body.pseudo,req.body.password,req.body.confirmPassword,(resultQuery) =>{
        if(resultQuery === 'pseudoExist')
            res.render('pages/inscription',{pseudo_exist:true})      
        else if(resultQuery === 'emptyInputs')
            res.render('pages/inscription',{form_success:false})       
        else if(resultQuery === 'notSamePass')
            res.render('pages/inscription',{notSamePass:true})      
        else
            res.render('pages/index',{inscription_success:true})
        
    })
})

app.post('/addRepas',(req, res) =>{
    Db_interact.addNewRepas(req.cookies.userCookie,req.body.type_repas,req.body.date,req.body.heure,() =>{
        Db_interact.getUserRepas(req.cookies.userCookie, (resultQuery) => {
            allRepas = JSON.stringify(resultQuery)
            res.render('pages/page-wrapper', {isConnected:true,userPseudo:req.cookies.userCookie,data_repas:allRepas})
        })
    })   
})

app.post('/suppRepas',(req,res)=>{
    Db_interact.suppRepas(req.cookies.userCookie, req.body.date, req.body.heure, () =>{
        Db_interact.getUserRepas(req.cookies.userCookie, (resultQuery) => {
            allRepas = JSON.stringify(resultQuery)
            res.render('pages/page-wrapper', {isConnected:true,userPseudo:req.cookies.userCookie,data_repas:allRepas})
        })
    })
})

// app.post('/', (request,response) => {
//     if(request.body.message === undefined || request.body.message ==='')
//         // request.session.error = "Il y a une erreur"
//         request.flash('error', "vous n'avez pas posté de message")
//         response.redirect("/")
// })

// Port //
app.listen(8080)