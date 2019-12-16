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
            connexion.query('SELECT type_repas FROM userrepas WHERE id_user = ? AND date >= ? AND date <= ?',[result[0].ID,moment().startOf('month').format('YYYY-MM-DD'),moment().endOf('month').format('YYYY-MM-DD')],(error,resultTR,field) => {
                if(error) throw error
                cb(resultTR)
            })
        })
    }

    static addNewRepas(pseudo,type_repas,cb){
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
        connexion.query('SELECT ID FROM user WHERE pseudo = ?',[pseudo],(error,result,fields) =>{
            if(error) throw error
            connexion.query('INSERT INTO userrepas SET type_repas = ?, date = ?, id_user = ?',[tp,moment().format('YYYY-MM-DD'),result[0].ID],(error,resultInsertR,field) =>{
                if(error) throw error
                cb(resultInsertR)
            })
        })
    }
}

module.exports = Db_interact