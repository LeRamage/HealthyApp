let create_tdow = (sow) => {
    let tdow = [sow.format('DD-MM-YYYY')]
    for(i = 1; i < 7; i++ ){
        sow = moment(sow).add(1,'days')
        tdow.push(sow.format('DD-MM-YYYY'))
    }
    return tdow
}

let createRepas = (tdow,data_r,heure) => {
    let repas_m = [];
    let add_repas_template; 
    let vege_template;
    let viande_template;
    let poisson_template;

    tdow.forEach(element => {
        // TEMPLATE // 
        vege_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round align-self-center round-success"><i class="fas fa-carrot"></i></div><div class="m-l-10 align-self-center" style="display:flex"><h3 class="m-b-0">Végétarien</h3><button class="btn btn-danger btnSuppRepas" data-date='+element+' data-heure='+heure+' data-toggle="modal" data-target="#modal-removeRepas" style="margin-left:1em"><i class="fas fa-trash-alt"></i></button></div></div></div></div></div>'
        viande_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round align-self-center round-warning"><i class="fas fa-drumstick-bite"></i></div><div class="m-l-10 align-self-center" style="display:flex"><h3 class="m-b-0">Viande</h3><button class="btn btn-danger btnSuppRepas" data-date='+element+' data-heure='+heure+' data-toggle="modal" data-target="#modal-removeRepas" style="margin-left:1em"><i class="fas fa-trash-alt"></i></button></div></div></div></div>'
        poisson_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round align-self-center round-info"><i class="fas fa-fish"></i></div><div class="m-l-10 align-self-center" style="display:flex"><h3 class="m-b-0">Poisson</h3><button class="btn btn-danger btnSuppRepas" data-date='+element+' data-heure='+heure+' data-toggle="modal" data-target="#modal-removeRepas" style="margin-left:1em"><i class="fas fa-trash-alt"></i></button></div></div></div></div>'
        add_repas_template = '<button class="ui positive button btnAddRepas verticalyCenter" data-date='+element+' data-heure='+heure+' data-toggle="modal" data-target="#modal-addRepas"><i class="fa fa-plus iconPlus" aria-hidden="true"></i>Ajouter un repas</button>'

        let repas = data_r.filter(el=>{
            return (element === moment(el.date).format('DD-MM-YYYY') && el.heure_repas == heure)
        })
        if(repas.length > 0){
            switch(repas[0].type_repas){
                case 1 :
                    repas_m.push({type_repas : vege_template})
                    break
                case 2 :
                    repas_m.push({type_repas : viande_template})
                    break
                case 3 :
                    repas_m.push({type_repas : poisson_template})
                    break
            }
        } 
        else
            repas_m.push({type_repas : add_repas_template})
    });
    return repas_m
}