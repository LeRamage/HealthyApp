let updateChartCompare = (data,vm,vmApp) => {
    vm.data_rep = data
    let type_Vi = 0, type_Ve = 0, type_P = 0
    let data_rep = vm.data_rep.filter(el=>{return moment(el.date).month() === vmApp.currentMonth})
    data_rep.forEach(element => {
        element.type_repas === 1 ? type_Ve++ : element.type_repas === 2 ? type_Vi++ : type_P++
    });
    
    let dt = [type_Ve,type_Vi,type_P]
    vm.chartCompare.data.datasets[0].data = dt
    vm.chartCompare.update()  
}

let updateChartComparePercent = (data_rep, vm, vmApp) => {
    let repas_s1 = data_rep.filter(el=>{return moment(el.date).date() < 8 && moment(el.date).month() === vmApp.currentMonth})
    let repas_s2 = data_rep.filter(el=>{return moment(el.date).date() < 15 && moment(el.date).date() >= 8})
    let repas_s3 = data_rep.filter(el=>{return moment(el.date).date() < 22 && moment(el.date).date() >= 15})
    let repas_s4 = data_rep.filter(el=>{return moment(el.date).date() >= 22 })
    
    let data_Vege = [], data_Viande = [], data_Poisson = []

    fillData(repas_s1,data_Vege,data_Viande,data_Poisson)
    fillData(repas_s2,data_Vege,data_Viande,data_Poisson)
    fillData(repas_s3,data_Vege,data_Viande,data_Poisson)
    fillData(repas_s4,data_Vege,data_Viande,data_Poisson)

    vm.chartComparePercent.data.datasets[0].data = data_Vege
    vm.chartComparePercent.data.datasets[1].data = data_Viande  
    vm.chartComparePercent.data.datasets[2].data = data_Poisson
    vm.chartComparePercent.update()
}

   


