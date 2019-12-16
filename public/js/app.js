let vmInscription = new Vue({
    el: '#inscription',
})

let vmApp = new Vue({
    el:'#app',
    data:{
        data_r:{},
    },
    mounted:function(){
        let type_Vi = 0, type_Ve = 0, type_P = 0
        for(i=0;i<this.data_r.length;i++){
            if(this.data_r[i].type_repas === 1) type_Ve++
            else if(this.data_r[i].type_repas === 2) type_Vi++
            else if(this.data_r[i].type_repas === 3) type_P++
        }
        let dt = [type_Ve,type_Vi,type_P]
        let ctx = document.getElementById('chartCompareRepas')
        let myChart = new Chart(ctx, {
            type:'bar',
            data:{
                labels:['Plats végétariens','Plats de Viandes','Plats de Poissons'],
                datasets:[{
                    label:"Comparaison des repas sur le mois",
                    data:dt,
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
        return myChart
    }
})



