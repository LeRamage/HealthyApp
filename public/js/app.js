// VARIABLES //
let startOfWeek_init = moment().startOf('month').day('monday')
let tab_daysOfWeek_init = create_tdow(startOfWeek_init)
let startOfWeek_nxt = startOfWeek_init
let vmCharts, vmApp, vmInscription, vmConnexion;
let test = 0

new Vue({el:'#fixedEl'})
if($('#connexion').val() != undefined) new Vue({el: '#connexion'})

if($('#inscription').val() != undefined){
    vmInscription = new Vue({ 
        el: '#inscription', 
        data:{
            pseudo:"",
            password:"",
            confirmPassword:"",
            form_success:false,
            pseudo_exist:false,
            notSamePass:false
        },
        methods:{
            sendRequestInscription:function(){
                $.ajax({
                    url: '/inscription',
                    type:"POST",
                    data:{pseudo:this.pseudo,password:this.password,confirmPassword:this.confirmPassword},
                    success: function(data) {
                        if(data[0] === 'redirect') location.replace("http://localhost:8080/?inscription_success=true")
                        else{
                            vmInscription.form_success = data[0].form_success
                            vmInscription.pseudo_exist = data[0].pseudo_exist
                            vmInscription.notSamePass = data[0].notSamePass
                        }   
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert('error ' + textStatus + " " + errorThrown);
                    }
                })
            }
        }
    })
}

if($('#charts').val() != undefined){
    vmCharts = new Vue({
        el:'#charts',
        data:{ data_rep:{} },
        mounted:function(){
            let type_Vi = 0, type_Ve = 0, type_P = 0
            this.data_rep.forEach(element => {
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
            nxtMonth:document.getElementById('nxtMonth').textContent,
            prevMonth:document.getElementById('prevMonth').textContent,
            data_r:JSON.parse(document.getElementById('result_data_repas_calendrier').textContent),
            dates_w1:tab_daysOfWeek_init,
            dates_w2:[],
            dates_w3:[],
            dates_w4:[],
            dates_w5:[],
            repas_midi_w1:[],
            repas_soir_w1:[],
            repas_midi_w2:[],
            repas_soir_w2:[],
            repas_midi_w3:[],
            repas_soir_w3:[],
            repas_midi_w4:[],
            repas_soir_w4:[],
            repas_midi_w5:[],
            repas_soir_w5:[]
        },

        methods:{
            nxtM:function(){
                $.ajax({
                    url: '/nxtMonth',
                    type:"POST",
                    data:{nxt:this.nxtMonth},
                    success: function(data) {
                        startOfWeek_init = moment(vmApp.nxtMonth,'DD-MM-YYYY').startOf('month').day('monday')
                        tab_daysOfWeek_init = create_tdow(startOfWeek_init)
                        vmApp.data_r = data[0].data_r
                        vmApp.nxtMonth = data[0].nxtMonth
                        vmApp.prevMonth = data[0].prevMonth
                        vmApp.repas_midi_w1 = createRepas(tab_daysOfWeek_init,vmApp.data_r,'midi')
                        vmApp.repas_soir_w1 = createRepas(tab_daysOfWeek_init,vmApp.data_r,'soir')
                        vmApp.dates_w1 = tab_daysOfWeek_init
                        startOfWeek_nxt = startOfWeek_init
                        for(j = 0; j < 4; j++){
                            startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
                            if(j == 0) {
                                vmApp.dates_w2 = create_tdow(startOfWeek_nxt)
                                vmApp.repas_midi_w2 = createRepas(vmApp.dates_w2,vmApp.data_r,'midi')
                                vmApp.repas_soir_w2 = createRepas(vmApp.dates_w2,vmApp.data_r,'soir')
                            }
                            else if (j == 1){
                                vmApp.dates_w3 = create_tdow(startOfWeek_nxt)
                                vmApp.repas_midi_w3 = createRepas(vmApp.dates_w3,vmApp.data_r,'midi')
                                vmApp.repas_soir_w3 = createRepas(vmApp.dates_w3,vmApp.data_r,'soir')

                            }
                            else if (j == 2){
                                vmApp.dates_w4 = create_tdow(startOfWeek_nxt)
                                vmApp.repas_midi_w4 = createRepas(vmApp.dates_w4,vmApp.data_r,'midi')
                                vmApp.repas_soir_w4 = createRepas(vmApp.dates_w4,vmApp.data_r,'soir')
                            }
                            else if(j = 3){
                                this.dates_w5 = create_tdow(startOfWeek_nxt)
                                this.repas_midi_w5 = createRepas(this.dates_w5,this.data_r,'midi')
                                this.repas_soir_w5 = createRepas(this.dates_w5,this.data_r,'soir')
                            }
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert('error ' + textStatus + " " + errorThrown);
                    }
                });
            },

            prevM:function(){
                $.ajax({
                    url: '/prevMonth',
                    type:"POST",
                    data:{prev:this.prevMonth},
                    success: function(data) {
                        startOfWeek_init = moment(vmApp.prevMonth,'DD-MM-YYYY').startOf('month').day('monday')
                        tab_daysOfWeek_init = create_tdow(startOfWeek_init)
                        vmApp.data_r = data[0].data_r
                        vmApp.nxtMonth = data[0].nxtMonth
                        vmApp.prevMonth = data[0].prevMonth
                        vmApp.repas_midi_w1 = createRepas(tab_daysOfWeek_init,vmApp.data_r,'midi')
                        vmApp.repas_soir_w1 = createRepas(tab_daysOfWeek_init,vmApp.data_r,'soir')
                        vmApp.dates_w1 = tab_daysOfWeek_init
                        startOfWeek_nxt = startOfWeek_init
                        for(j = 0; j < 4; j++){
                            startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
                            if(j == 0) {
                                vmApp.dates_w2 = create_tdow(startOfWeek_nxt)
                                vmApp.repas_midi_w2 = createRepas(vmApp.dates_w2,vmApp.data_r,'midi')
                                vmApp.repas_soir_w2 = createRepas(vmApp.dates_w2,vmApp.data_r,'soir')
                            }
                            else if (j == 1){
                                vmApp.dates_w3 = create_tdow(startOfWeek_nxt)
                                vmApp.repas_midi_w3 = createRepas(vmApp.dates_w3,vmApp.data_r,'midi')
                                vmApp.repas_soir_w3 = createRepas(vmApp.dates_w3,vmApp.data_r,'soir')

                            }
                            else if (j == 2){
                                vmApp.dates_w4 = create_tdow(startOfWeek_nxt)
                                vmApp.repas_midi_w4 = createRepas(vmApp.dates_w4,vmApp.data_r,'midi')
                                vmApp.repas_soir_w4 = createRepas(vmApp.dates_w4,vmApp.data_r,'soir')
                            }
                            else if(j = 3){
                                this.dates_w5 = create_tdow(startOfWeek_nxt)
                                this.repas_midi_w5 = createRepas(this.dates_w5,this.data_r,'midi')
                                this.repas_soir_w5 = createRepas(this.dates_w5,this.data_r,'soir')
                            }
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert('error ' + textStatus + " " + errorThrown);
                    }
                });
            }
        },

        mounted:function(){
            this.repas_midi_w1 = createRepas(tab_daysOfWeek_init,this.data_r,'midi')
            this.repas_soir_w1 = createRepas(tab_daysOfWeek_init,this.data_r,'soir')
            for(j = 0; j < 4; j++){
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
                else if(j = 3){
                    this.dates_w5 = create_tdow(startOfWeek_nxt)
                    this.repas_midi_w5 = createRepas(this.dates_w5,this.data_r,'midi')
                    this.repas_soir_w5 = createRepas(this.dates_w5,this.data_r,'soir')
                }
            }
        },

        watch:{
            // nxtMonth:function(value){
            //     console.log('NXT MONTH : '+value)
            //     console.log('test: '+test)
            // },
            // prevMonth:function(value){
            //     console.log('PREV MONTH : '+value)
            //     console.log('test : '+test)
            // },
            // data_r:function(value){
            //     console.log('DATA_R : ')
            //     console.log(value)
            // },
            // dates_w1:function(value){
            //     console.log('DATES_W1 : ')
            //     console.log(value)
            // },
            // dates_w2:function(value){
            //     console.log('DATES_W2 : ')
            //     console.log(value)
            // },
            // dates_w3:function(value){
            //     console.log('DATES_W3 : ')
            //     console.log(value)
            // },
            // dates_w4:function(value){
            //     console.log('DATES_W4 : ')
            //     console.log(value)
            // },
            // repas_midi_w1:function(value){
            //     console.log('REPAS_MIDI_W1 : ')
            //     console.log(value)
            // },
            // repas_midi_w2:function(value){
            //     console.log('REPAS_MIDI_W2 : ')
            //     console.log(value)
            // },
            // repas_midi_w3:function(value){
            //     console.log('REPAS_MIDI_W3 : ')
            //     console.log(value)
            // },
            // repas_midi_w4:function(value){
            //     console.log('REPAS_MIDI_W4 : ')
            //     console.log(value)
            // },
            // repas_soir_w1:function(value){
            //     console.log('REPAS_SOIR_W1 : ')
            //     console.log(value)
            // },
            // repas_soir_w2:function(value){
            //     console.log('REPAS_SOIR_W2 : ')
            //     console.log(value)
            // },
            // repas_soir_w3:function(value){
            //     console.log('REPAS_SOIR_W3 : ')
            //     console.log(value)
            // },
            // repas_soir_w4:function(value){
            //     console.log('REPAS_SOIR_W4 : ')
            //     console.log(value)
            // },
        }
        // beforeCreate:function(){
        //     console.log(vmApp.$el)
        // },
    })
}


