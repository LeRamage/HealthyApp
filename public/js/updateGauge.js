let updateGauge = (data, gaugeVege, gaugePoisson, gaugeViande) =>{
    let nb_vege = 0 , nb_viande = 0, nb_poisson = 0
    data.forEach(element => {
        element.type_repas == 1 ? nb_vege++ :
        element.type_repas == 2 ? nb_viande++ :
        nb_poisson++;
    });
    
    let tot = nb_vege + nb_viande + nb_poisson;
    let percent_viande_mth = Math.round((nb_viande / tot) * 100)
    let percent_vege_mth = Math.round((nb_vege / tot) * 100)
    let percent_poisson_mth = Math.round((nb_poisson / tot) * 100)

    gaugeVege.setValueAnimated(percent_vege_mth,2)
    gaugePoisson.setValueAnimated(percent_poisson_mth,2)
    gaugeViande.setValueAnimated(percent_viande_mth,2)
}