// VARIABLES // 
let startOfWeek_init = moment().startOf('month').day('monday')
let tab_daysOfWeek_init = create_tdow(startOfWeek_init)
let startOfWeek_nxt = startOfWeek_init
let vmCharts, vmApp;

new Vue({el:'#fixedEl'})
if($('#connexion').val() != undefined) new Vue({ el: '#connexion' })
if($('#inscription').val() != undefined) new Vue({ el: '#inscription' })

if($('#charts').val() != undefined){
    vmCharts = new Vue({
        el:'#charts',
        data:{ data_r:{} },
        mounted:function(){
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
}

if($('#calendrierRepas').val() != undefined){
    vmApp = new Vue({
        el:'#calendrierRepas',
        components: {
            vuejsDatepicker
        },
        data:{
            data_r:{},
            dates_w1:tab_daysOfWeek_init,
            dates_w2:[],
            dates_w3:[],
            dates_w4:[],
            repas_midi_w1:[],
            repas_soir_w1:[],
            repas_midi_w2:[],
            repas_soir_w2:[],
            repas_midi_w3:[],
            repas_soir_w3:[],
            repas_midi_w4:[],
            repas_soir_w4:[],
        },
        
        mounted:function(){
            this.repas_midi_w1 = createRepas(tab_daysOfWeek_init,this.data_r,'midi')
            this.repas_soir_w1 = createRepas(tab_daysOfWeek_init,this.data_r,'soir')
            for(j = 0; j < 3; j++){
                startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
                if(j == 0) {
                    this.dates_w2 = create_tdow(startOfWeek_nxt)
                    this.repas_midi_w2 = createRepas(this.dates_w2,this.data_r,'midi')
                    this.repas_soir_w2 = createRepas(this.dates_w2,this.data_r,'soir')
                }
                else if (j == 1){
                    this.dates_w3 = create_tdow(startOfWeek_nxt)
                    this.repas_midi_w3 = createRepas(this.dates_w3,this.data_r,'midi')
                    this.repas_soir_w3 = createRepas(this.dates_w3,this.data_r,'soir')
    
                } 
                else if (j == 2){
                    this.dates_w4 = create_tdow(startOfWeek_nxt)
                    this.repas_midi_w4 = createRepas(this.dates_w4,this.data_r,'midi')
                    this.repas_soir_w4 = createRepas(this.dates_w4,this.data_r,'soir')
                }
            }
        }
    })
}


