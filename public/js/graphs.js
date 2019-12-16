let ctx = document.getElementById('myChart')
let myChart = new Chart(ctx, {
    type:'bar',
    data:{
        labels:['Plats végétariens','Plats de Viandes','Plats de Poissons'],
        datasets:[{
            label:"Comparaison des repas sur le mois",
            data:[15,7,9],
            backgroundColor: [
                'rgba(191, 255, 0, 0.4)',
                'rgba(255, 102, 0, 0.4)',
                'rgba(255, 255, 51, 0.4)'
            ],
            borderColor: [
                'rgba(191, 255, 0, 1)',
                'rgba(255, 102, 0, 1)',
                'rgba(255, 255, 51, 1)'
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