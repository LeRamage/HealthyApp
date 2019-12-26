// Variables //
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')
let cookie = require('cookie-parser')
let Db_interact = require("./models/db_interact")
let moment = require('moment')

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
app.use('/pickmeup',express.static('pickMeUp'))
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
        response.render('pages/page-wrapper', {isConnected:true,userPseudo:request.cookies.userCookie,data_repas:allRepas,monthNext:JSON.stringify(moment().startOf('month').add(1,'months').format('DD-MM-YYYY')),monthPrev:JSON.stringify(moment().startOf('month').subtract(1,'months').format('DD-MM-YYYY'))}) 
    else{
        if(request.query.inscription_success) {
            response.render('pages/index', {isConnected:false,inscription_success:true})
        }
        else{
            response.render('pages/index',{isConnected:false})
        } 
    }       
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
    if(req.cookies.userCookie){
        res.render('pages/page-wrapper',{isConnected:true,userPseudo:req.cookies.userCookie,data_repas:allRepas,monthNext:JSON.stringify(moment().startOf('month').add(1,'months').format('DD-MM-YYYY')),monthPrev:JSON.stringify(moment().startOf('month').subtract(1,'months').format('DD-MM-YYYY'))})
    }
    else{
        res.render('pages/index',{isConnected:false,form_success:null})
    }
})


// POST //
app.post('/', (req,res) =>{
    Db_interact.connectToApp(req.body.pseudo,req.body.password, (resultQuery) =>{
        if(resultQuery.length > 0){
            res.cookie('userCookie', req.body.pseudo, {maxAge: 360000});
            Db_interact.getUserRepas(req.body.pseudo,moment().startOf('month').format('YYYY-MM-DD'),(resultQuery) => {
                allRepas = JSON.stringify(resultQuery)
                res.render('pages/page-wrapper', {isConnected:true,userPseudo:req.body.pseudo,data_repas:allRepas,monthNext:JSON.stringify(moment().startOf('month').add(1,'months').format('DD-MM-YYYY')),monthPrev:JSON.stringify(moment().startOf('month').subtract(1,'months').format('DD-MM-YYYY'))})
            })
        }           
        else
            res.render('pages/index', {form_success:false})
    })
})

app.post('/inscription', (req, res) =>{
    Db_interact.insertNewUser(req.body.pseudo,req.body.password,req.body.confirmPassword,(resultQuery) =>{
        let data = []
        if(resultQuery === 'pseudoExist'){
            data.push({pseudo_exist:true,form_success:false,notSamePass:false})
            res.send(data)      
        }
        else if(resultQuery === 'emptyInputs'){
            data.push({pseudo_exist:false,form_success:true,notSamePass:false})
            res.send(data)       
        }
        else if(resultQuery === 'notSamePass'){
            data.push({pseudo_exist:false,form_success:false,notSamePass:true})
            res.send(data)      
        }
        else{
            res.send(['redirect'])
        }      
    })
})

app.post('/addRepas',(req, res) =>{
    console.log(req.body)
    Db_interact.addNewRepas(req.cookies.userCookie,req.body.type_repas,req.body.date,req.body.heure,() =>{
        Db_interact.getUserRepas(req.cookies.userCookie,moment(req.body.date,'DD-MM-YYYY').format('YYYY-MM-DD'),(resultQuery) => {
            allRepas = JSON.stringify(resultQuery)
            let data = [{resultQuery}]
            res.send(data)
        })
    })   
})

app.post('/suppRepas',(req,res)=>{
    Db_interact.suppRepas(req.cookies.userCookie, req.body.date, req.body.heure, () =>{
        Db_interact.getUserRepas(req.cookies.userCookie,moment(req.body.date,'DD-MM-YYYY').format('YYYY-MM-DD') ,(resultQuery) => {
            allRepas = JSON.stringify(resultQuery)
            let data = [{resultQuery}]
            res.send(data)
        })
    })
})

app.post('/nxtMonth',(req,res)=>{
    Db_interact.getUserRepas(req.cookies.userCookie, moment(req.body.nxt,'DD-MM-YYYY'),(resultQuery) => {
        let data = []
        let data_r = resultQuery
        data.push({data_r:data_r, nxtMonth:moment(req.body.nxt,'DD-MM-YYYY').add(1,'months').format('DD-MM-YYYY'), prevMonth:moment(req.body.nxt,'DD-MM-YYYY').subtract(1,'months').format('DD-MM-YYYY') })
        res.send(data)
    })
})

app.post('/prevMonth',(req,res)=>{
    Db_interact.getUserRepas(req.cookies.userCookie, moment(req.body.prev,'DD-MM-YYYY'),(resultQuery) => {
        let data = []
        let data_r = resultQuery
        data.push({data_r:data_r, nxtMonth:moment(req.body.prev,'DD-MM-YYYY').add(1,'months').format('DD-MM-YYYY'), prevMonth:moment(req.body.prev,'DD-MM-YYYY').subtract(1,'months').format('DD-MM-YYYY') })
        res.send(data)
    })
})


// Port //
app.listen(8080)