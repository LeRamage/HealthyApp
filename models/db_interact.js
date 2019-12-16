let connexion = require('../config/db_co')

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
            connexion.query('SELECT type_repas FROM userrepas WHERE id_user = ?',[result[0].ID],(error,resultTR,field) => {
                if(error) throw error
                cb(resultTR)
            })
        })
    }
}

module.exports = Db_interact