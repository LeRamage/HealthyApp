let createChartCompare = (element,data_rep,vm) => {
    let type_Vi = 0, type_Ve = 0, type_P = 0
    let data_r = data_rep.filter(el=>{return moment(el.date).month() === vmApp.currentMonth})
    data_r.forEach(element => {
        element.type_repas === 1 ? type_Ve++ : element.type_repas === 2 ? type_Vi++ : type_P++
    });
    let dt = [type_Ve,type_Vi,type_P]

    let chart = new Chart(element, {
        type:'bar',
        data:{
            labels:['Plats végétariens','Plats de Viandes','Plats de Poissons'],
            datasets:[{
                data:dt,
                backgroundColor: [
                    'rgba(191, 255, 0, 0.4)',
                    'rgba(254, 193, 7, 0.4)',
                    'rgba(1, 192, 200, 0.4)'
                ],
                borderColor: [
                    'rgba(191, 255, 0, 1)',
                    'rgba(254, 193, 7, 1)',
                    'rgba(1, 192, 200, 1)'
                ]
            }],
            borderWidth:1,
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title:{
                display:true,
                text: "Comparaison des repas sur le mois"
            },
            legend: { display: false },
        }
    })
    return chart
}

createChartCompararePercent = (element,data_rep,vm) =>{
    let repas_s1 = data_rep.filter(el=>{return moment(el.date).date() < 8 && moment(el.date).month() === vm.currentMonth})
    let repas_s2 = data_rep.filter(el=>{return moment(el.date).date() < 15 && moment(el.date).date() >= 8})
    let repas_s3 = data_rep.filter(el=>{return moment(el.date).date() < 22 && moment(el.date).date() >= 15})
    let repas_s4 = data_rep.filter(el=>{return moment(el.date).date() >= 22 })
    let data_Vege = [], data_Viande = [], data_Poisson = []

    fillData(repas_s1,data_Vege,data_Viande,data_Poisson)
    fillData(repas_s2,data_Vege,data_Viande,data_Poisson)
    fillData(repas_s3,data_Vege,data_Viande,data_Poisson)
    fillData(repas_s4,data_Vege,data_Viande,data_Poisson)

    let chart = new Chart(element,{
        type:'line',
        data:{
            labels:['Semaine 1','Semaine 2','Semaine 3','Semaine 4'],       
            datasets:[
                {
                    label:'% Végé',
                    borderColor: 'rgba(191, 255, 0, 0.4)',
                    data: data_Vege,
                    fill:false
                },
                {
                    label:'% Viande',
                    borderColor: 'rgba(254, 193, 7, 0.4)',
                    data: data_Viande,
                    fill:false
                },
                {
                    label:'% Poisson',
                    borderColor: 'rgba(1, 192, 200, 0.4)',
                    data: data_Poisson,
                    fill:false
                }
            ]

        },  
        options:{
            title:{
                display:true,
                text: "Comparaison en pourcentage"
            }
        }
    })
    return chart;
}

let fillData = (repas_s,dVe,dVi,dP) => {
    let type_Vi = 0, type_Ve = 0, type_P = 0
    repas_s.forEach(element=>{
        element.type_repas === 1 ? type_Ve++ : element.type_repas === 2 ? type_Vi++ : type_P++
    })
    let sumRepas = type_Ve + type_Vi + type_P
    dVe.push(Math.round( (type_Ve / sumRepas) * 100)),dVi.push(Math.round( (type_Vi / sumRepas) * 100)),dP.push(Math.round((type_P / sumRepas) * 100))
}