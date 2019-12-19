let add_repas_template = '<button class="ui positive button" data-toggle="modal" data-target="#modal-addRepas"><i class="fa fa-plus iconPlus" aria-hidden="true"></i>Ajouter un repas</button>'
let vege_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round align-self-center round-success"><i class="fas fa-carrot"></i></div><div class="m-l-10 align-self-center" style="display:flex"><h3 class="m-b-0">Végétarien</h3><button class="btn btn-danger" style="margin-left:1em"><i class="fas fa-trash-alt"></i></button></div></div></div></div></div>'
let viande_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round align-self-center round-warning"><i class="fas fa-drumstick-bite"></i></div><div class="m-l-10 align-self-center" style="display:flex"><h3 class="m-b-0">Viande</h3><button class="btn btn-danger" style="margin-left:1em"><i class="fas fa-trash-alt"></i></button></div></div></div></div>'
let poisson_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round align-self-center round-info"><i class="fas fa-fish"></i></div><div class="m-l-10 align-self-center" style="display:flex"><h3 class="m-b-0">Poisson</h3><button class="btn btn-danger" style="margin-left:1em"><i class="fas fa-trash-alt"></i></button></div></div></div></div>'

let vmInscription = new Vue({
    el: '#inscription',
})

let vmApp = new Vue({
    el:'#app',
    data:{
        data_r:{},
        dates:[
            {date:'16-12-2019'},
            {date:'17-12-2019'},
            {date:'18-12-2019'},
            {date:'19-12-2019'},
            {date:'20-12-2019'},
            {date:'21-12-2019'},
            {date:'22-12-2019'}
        ],
        repas_midi:[
            {type_repas : vege_template},
            {type_repas : vege_template},
            {type_repas : viande_template},
            {type_repas: add_repas_template},
            {type_repas: add_repas_template},
            {type_repas: add_repas_template},
            {type_repas: add_repas_template}
        ],
        repas_soir:[
            {type_repas : vege_template},
            {type_repas : poisson_template},
            {type_repas: add_repas_template},
            {type_repas: add_repas_template},
            {type_repas: add_repas_template},
            {type_repas: add_repas_template},
            {type_repas: add_repas_template}
        ]
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


