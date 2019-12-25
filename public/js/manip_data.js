let create_tdow = (sow) => {
    let tdow = [{id:0,date:sow.format('DD-MM-YYYY')}]
    for(i = 1; i < 7; i++ ){
        sow = moment(sow).add(1,'days')
        tdow.push({id:i,date:sow.format('DD-MM-YYYY')})
    }
    return tdow
}

let createRepas = (tdow,data_r,heure) => {
    let repas_m = [];
    let add_repas_template; 
    let vege_template;
    let viande_template;
    let poisson_template;
    let k = 0;
    tdow.forEach(element => {
        // TEMPLATE // 
        vege_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round sm-round align-self-center round-success"><i class="fas fa-carrot" style="vertical-align: text-top;"></i></div><div class="m-l-7 align-self-center" style="display:flex"><h4 class="m-b-0 title-card">Végétarien</h4><button class="btn btn-danger btnSuppRepas" data-date='+element+' data-heure='+heure+' data-toggle="modal" data-target="#modal-removeRepas" style="margin-left:0.5em"><i class="fas fa-trash-alt"></i></button></div></div></div></div></div>'
        viande_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round sm-round align-self-center round-warning"><i class="fas fa-drumstick-bite" style="vertical-align: text-top;"></i></div><div class="m-l-7 align-self-center" style="display:flex"><h4 class="m-b-0 title-card">Viande</h4><button class="btn btn-danger btnSuppRepas" data-date='+element+' data-heure='+heure+' data-toggle="modal" data-target="#modal-removeRepas" style="margin-left:0.5em"><i class="fas fa-trash-alt"></i></button></div></div></div></div>'
        poisson_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round sm-round align-self-center round-info"><i class="fas fa-fish" style="vertical-align: text-top;"></i></div><div class="m-l-7 align-self-center" style="display:flex"><h4 class="m-b-0 title-card">Poisson</h4><button class="btn btn-danger btnSuppRepas" data-date='+element+' data-heure='+heure+' data-toggle="modal" data-target="#modal-removeRepas" style="margin-left:0.5em"><i class="fas fa-trash-alt"></i></button></div></div></div></div>'
        add_repas_template = '<button class="ui positive button btnAddRepas verticalyCenter" data-date='+element+' data-heure='+heure+' data-toggle="modal" data-target="#modal-addRepas"><i class="fa fa-plus iconPlus" aria-hidden="true"></i>Ajouter un repas</button>'
        
        let repas = data_r.filter(el=>{
            return (element.date === moment(el.date).format('DD-MM-YYYY') && el.heure_repas == heure)
        })
    
        if(repas.length > 0){
            switch(repas[0].type_repas){
                case 1 :
                    repas_m.push({id:k,type_repas : vege_template})
                    break
                case 2 :
                    repas_m.push({id:k,type_repas : viande_template})
                    break
                case 3 :
                    repas_m.push({id:k,type_repas : poisson_template})
                    break
            }
        } 
        else
            repas_m.push({id:k,type_repas : add_repas_template})
        k++;
    });
    return repas_m
}