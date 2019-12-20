let connexion = require('../config/db_co')
let moment = require('moment')

class Db_interact{

    static connectToApp(pseudo,password, cb){
        connexion.query('SELECT * from user WHERE pseudo = ? AND password = ?',[pseudo,password], (error, result, fields) => {
            if (error) throw error 
            cb(result)
        })
    }

    static insertNewUser(pseudo,password,cb){
        if(pseudo === '' || password === '') cb('emptyInputs')  
        else{
            connexion.query('SELECT * FROM user WHERE pseudo = ?',[pseudo], (error, result, fields) => {
                if (error) throw error
                if(result.length === 0){
                    connexion.query("INSERT INTO user SET pseudo = ?, password = ?",[pseudo,password], (error,result,fields) => {
                        if(error) throw error
                        cb(result)
                    })
                }
                else cb('pseudoExist')                   
            })
        }
    }

    static getUserRepas(pseudo,cb){
        connexion.query('SELECT ID FROM user WHERE pseudo = ?',[pseudo],(error,result,fields) =>{
            if(error) throw error
            connexion.query('SELECT type_repas,date,heure_repas FROM userrepas WHERE id_user = ? AND date >= ? AND date <= ? ORDER BY date',[result[0].ID,moment().startOf('month').format('YYYY-MM-DD'),moment().endOf('month').format('YYYY-MM-DD')],(error,resultTR,field) => {
                if(error) throw error
                cb(resultTR)
            })
        })
    }

    static addNewRepas(pseudo,type_repas,date,heure_repas,cb){
        let tp = 0;
        switch(type_repas){
            case "vege":
                tp = 1;
                break; 
            case "viande":
                tp = 2;
                break;
            case "poisson":
                tp = 3
                break;
        }
        let d = moment(date,'DD-MM-YYYY').format('YYYY-MM-DD')
        console.log("date : "+d)
        connexion.query('SELECT ID FROM user WHERE pseudo = ?',[pseudo],(error,result,fields) =>{
            if(error) throw error
            console.log('ID : '+result[0].ID)
            connexion.query('INSERT INTO userrepas SET type_repas = ?, date = ?, id_user = ?, heure_repas = ?',[tp,d,result[0].ID, heure_repas],(error,resultInsertR,field) =>{
                if(error) throw error
                cb(resultInsertR)
            })
        })
    }
}

module.exports = Db_interact