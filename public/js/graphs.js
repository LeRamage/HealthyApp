let createChart = (element,dt) => {
    let myChart = new Chart(element, {
        type:'bar',
        data:{
            labels:['Plats végétariens','Plats de Viandes','Plats de Poissons'],
            datasets:[{
                label:"Comparaison des repas sur le mois",
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
            }
        }
    })
    return myChart
}