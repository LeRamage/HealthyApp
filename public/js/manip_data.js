let create_tdow = (sow) => {
    let tdow = [sow.format('DD-MM-YYYY')]
    for(i = 1; i < 7; i++ ){
        sow = moment(sow).add(1,'days')
        tdow.push(sow.format('DD-MM-YYYY'))
    }
    return tdow
}

let createRepas = (tdow,data_r,ve_t,vi_t,po_t,heure) => {
    let repas_m = [];
    let add_repas_template; 

    tdow.forEach(element => {
        add_repas_template = '<button class="ui positive button btnAddRepas verticalyCenter" data-date='+element+' data-heure='+heure+' data-toggle="modal" data-target="#modal-addRepas"><i class="fa fa-plus iconPlus" aria-hidden="true"></i>Ajouter un repas</button>'
        let repas = data_r.filter(el=>{
            return (element === moment(el.date).format('DD-MM-YYYY') && el.heure_repas == heure)
        })
        if(repas.length > 0){
            switch(repas[0].type_repas){
                case 1 :
                    repas_m.push({type_repas : ve_t})
                    break
                case 2 :
                    repas_m.push({type_repas : vi_t})
                    break
                case 3 :
                    repas_m.push({type_repas : po_t})
                    break
            }
        } 
        else
            repas_m.push({type_repas : add_repas_template})
    });
    return repas_m
}