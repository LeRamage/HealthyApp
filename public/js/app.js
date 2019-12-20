// TEMPLATE // 
let vege_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round align-self-center round-success"><i class="fas fa-carrot"></i></div><div class="m-l-10 align-self-center" style="display:flex"><h3 class="m-b-0">Végétarien</h3><button class="btn btn-danger" data-toggle="modal" data-target="#modal-removeRepas" style="margin-left:1em"><i class="fas fa-trash-alt"></i></button></div></div></div></div></div>'
let viande_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round align-self-center round-warning"><i class="fas fa-drumstick-bite"></i></div><div class="m-l-10 align-self-center" style="display:flex"><h3 class="m-b-0">Viande</h3><button class="btn btn-danger" data-toggle="modal" data-target="#modal-removeRepas" style="margin-left:1em"><i class="fas fa-trash-alt"></i></button></div></div></div></div>'
let poisson_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round align-self-center round-info"><i class="fas fa-fish"></i></div><div class="m-l-10 align-self-center" style="display:flex"><h3 class="m-b-0">Poisson</h3><button class="btn btn-danger" data-toggle="modal" data-target="#modal-removeRepas" style="margin-left:1em"><i class="fas fa-trash-alt"></i></button></div></div></div></div>'

// VARIABLES // 
let startOfWeek_init = moment().startOf('week').add(1,'days')
let tab_daysOfWeek_init = create_tdow(startOfWeek_init)

// VUE MODEL //
let vmInscription = new Vue({ el: '#inscription'})

let vmApp = new Vue({
    el:'#app',
    data:{
        data_r:{},
        dates:tab_daysOfWeek_init,
        repas_midi:[],
        repas_soir:[]
    },
    
    mounted:function(){
        this.repas_midi = createRepas(tab_daysOfWeek_init,this.data_r,vege_template,viande_template,poisson_template,'midi')
        this.repas_soir = createRepas(tab_daysOfWeek_init,this.data_r,vege_template,viande_template,poisson_template,'soir')
        
        let type_Vi = 0, type_Ve = 0, type_P = 0
        this.data_r.forEach(element => {
            if(element.type_repas === 1) type_Ve++
            else if(element.type_repas === 2) type_Vi++
            else if(element.type_repas === 3) type_P++
        });


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
})


