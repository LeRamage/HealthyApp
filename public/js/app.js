// VARIABLES //
let startOfWeek_init = moment().startOf('month')
let tab_daysOfWeek_init = create_tdow(startOfWeek_init)
let startOfWeek_nxt = startOfWeek_init
let vmCharts, vmApp, vmInscription, vmModals;

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
        data:{ data_rep:JSON.parse(document.getElementById('result_data_repas_pw').textContent),chartCompare:null },
        mounted:function(){
            let type_Vi = 0, type_Ve = 0, type_P = 0
            this.data_rep.forEach(element => {
                if(element.type_repas === 1) type_Ve++
                else if(element.type_repas === 2) type_Vi++
                else if(element.type_repas === 3) type_P++
            });

            let dt = [type_Ve,type_Vi,type_P]
            let ctx = document.getElementById('chartCompareRepas')
            this.chartCompare = createChart(ctx,dt)
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
            repas_soir_w5:[],
            lastDay:moment().endOf('month').date() - 28
        },

        methods:{
            nxtM:function(){
                $.ajax({
                    url: '/nxtMonth',
                    type:"POST",
                    data:{nxt:this.nxtMonth},
                    success: function(data) {
                        startOfWeek_init = moment(vmApp.nxtMonth,'DD-MM-YYYY').startOf('month')
                        tab_daysOfWeek_init = create_tdow(startOfWeek_init)
                        vmApp.lastDay = moment(vmApp.nxtMonth,'DD-MM-YYYY').endOf('month').date() - 28
                        vmApp.data_r = data[0].data_r
                        vmApp.nxtMonth = data[0].nxtMonth
                        vmApp.prevMonth = data[0].prevMonth
                        vmApp.repas_midi_w1 = createRepas(tab_daysOfWeek_init,vmApp.data_r,'midi')
                        vmApp.repas_soir_w1 = createRepas(tab_daysOfWeek_init,vmApp.data_r,'soir')
                        vmApp.dates_w1 = tab_daysOfWeek_init
                        startOfWeek_nxt = startOfWeek_init

                        startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
                        vmApp.dates_w2 = create_tdow(startOfWeek_nxt)
                        vmApp.repas_midi_w2 = createRepas(vmApp.dates_w2,vmApp.data_r,'midi')
                        vmApp.repas_soir_w2 = createRepas(vmApp.dates_w2,vmApp.data_r,'soir')

                        startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
                        vmApp.dates_w3 = create_tdow(startOfWeek_nxt)
                        vmApp.repas_midi_w3 = createRepas(vmApp.dates_w3,vmApp.data_r,'midi')
                        vmApp.repas_soir_w3 = createRepas(vmApp.dates_w3,vmApp.data_r,'soir')

                        startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
                        vmApp.dates_w4 = create_tdow(startOfWeek_nxt)
                        vmApp.repas_midi_w4 = createRepas(vmApp.dates_w4,vmApp.data_r,'midi')
                        vmApp.repas_soir_w4 = createRepas(vmApp.dates_w4,vmApp.data_r,'soir')
                    
                        startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
                        vmApp.dates_w5 = create_tdow(startOfWeek_nxt)
                        vmApp.repas_midi_w5 = createRepas(vmApp.dates_w5,vmApp.data_r,'midi')
                        vmApp.repas_soir_w5 = createRepas(vmApp.dates_w5,vmApp.data_r,'soir')                       
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
                        startOfWeek_init = moment(vmApp.prevMonth,'DD-MM-YYYY').startOf('month')
                        tab_daysOfWeek_init = create_tdow(startOfWeek_init)
                        vmApp.lastDay = moment(vmApp.prevMonth,'DD-MM-YYYY').endOf('month').date() - 28
                        vmApp.data_r = data[0].data_r
                        vmApp.nxtMonth = data[0].nxtMonth
                        vmApp.prevMonth = data[0].prevMonth
                        vmApp.repas_midi_w1 = createRepas(tab_daysOfWeek_init,vmApp.data_r,'midi')
                        vmApp.repas_soir_w1 = createRepas(tab_daysOfWeek_init,vmApp.data_r,'soir')
                        vmApp.dates_w1 = tab_daysOfWeek_init
                        startOfWeek_nxt = startOfWeek_init

                        startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
                        vmApp.dates_w2 = create_tdow(startOfWeek_nxt)
                        vmApp.repas_midi_w2 = createRepas(vmApp.dates_w2,vmApp.data_r,'midi')
                        vmApp.repas_soir_w2 = createRepas(vmApp.dates_w2,vmApp.data_r,'soir')
                    
                        startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
                        vmApp.dates_w3 = create_tdow(startOfWeek_nxt)
                        vmApp.repas_midi_w3 = createRepas(vmApp.dates_w3,vmApp.data_r,'midi')
                        vmApp.repas_soir_w3 = createRepas(vmApp.dates_w3,vmApp.data_r,'soir')
                    
                        startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
                        vmApp.dates_w4 = create_tdow(startOfWeek_nxt)
                        vmApp.repas_midi_w4 = createRepas(vmApp.dates_w4,vmApp.data_r,'midi')
                        vmApp.repas_soir_w4 = createRepas(vmApp.dates_w4,vmApp.data_r,'soir')
                    
                        startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
                        vmApp.dates_w5 = create_tdow(startOfWeek_nxt)
                        vmApp.repas_midi_w5 = createRepas(vmApp.dates_w5,vmApp.data_r,'midi')
                        vmApp.repas_soir_w5 = createRepas(vmApp.dates_w5,vmApp.data_r,'soir')                           
                        
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

            startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
            this.dates_w2 = create_tdow(startOfWeek_nxt)
            this.repas_midi_w2 = createRepas(this.dates_w2,this.data_r,'midi')
            this.repas_soir_w2 = createRepas(this.dates_w2,this.data_r,'soir')
                
            startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
            this.dates_w3 = create_tdow(startOfWeek_nxt)
            this.repas_midi_w3 = createRepas(this.dates_w3,this.data_r,'midi')
            this.repas_soir_w3 = createRepas(this.dates_w3,this.data_r,'soir')

            startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
            this.dates_w4 = create_tdow(startOfWeek_nxt)
            this.repas_midi_w4 = createRepas(this.dates_w4,this.data_r,'midi')
            this.repas_soir_w4 = createRepas(this.dates_w4,this.data_r,'soir')

            startOfWeek_nxt = startOfWeek_nxt.add(7,'days')
            this.dates_w5 = create_tdow(startOfWeek_nxt)
            this.repas_midi_w5 = createRepas(this.dates_w5,this.data_r,'midi')
            this.repas_soir_w5 = createRepas(this.dates_w5,this.data_r,'soir')      
        },

        updated:function(){
            let btnAddRepas = document.getElementsByClassName('btnAddRepas')
            let btnSuppRepas = document.getElementsByClassName('btnSuppRepas')

            Array.from(btnAddRepas).forEach(function(element) {
                element.addEventListener('click',()=>{
                    let date = element.dataset.date
                    let heure_repas = element.dataset.heure
                    $('#date_add').val(date)
                    $('#heure_add').val(heure_repas)
                })
            })

            Array.from(btnSuppRepas).forEach((element) =>{
                element.addEventListener('click',()=>{
                    let date = element.dataset.date
                    let heure_repas = element.dataset.heure
                    let id = element.dataset.id
                    $('#date_supp').val(date)
                    $('#heure_supp').val(heure_repas)
                    $('#id_supp').val(id)
                })
            })
        }
    })

    vmModals = new Vue({
        el:'#modals',
        methods:{
            deleteRepas:function(){
                let id = $('#id_supp').val()
                let d = $('#date_supp').val()
                let h = $('#heure_supp').val()
                let btnAddR = '<button class="ui positive button btnAddRepas verticalyCenter" data-date='+d+' data-heure='+h+' data-id='+id+' data-toggle="modal" data-target="#modal-addRepas"><i class="fa fa-plus iconPlus" aria-hidden="true"></i>Ajouter un repas</button>'
                let newValue = {id:id,type_repas : btnAddR}
                $.ajax({
                    url:'/suppRepas',
                    type:"POST",
                    data:{date:d,heure:h},
                    success: function(data) {
                        $('#modal-removeRepas').modal('hide');
                        let d = moment($('#date_supp').val(),'DD-MM-YYYY').date()
                        setArrayRepas(h,d,vmApp,id,newValue)

                        vmCharts.data_rep = data[0].resultQuery
                        let type_Vi = 0, type_Ve = 0, type_P = 0
                        vmCharts.data_rep.forEach(element => {
                            if(element.type_repas === 1) type_Ve++
                            else if(element.type_repas === 2) type_Vi++
                            else if(element.type_repas === 3) type_P++
                        });
            
                        let dt = [type_Ve,type_Vi,type_P]
                        vmCharts.chartCompare.data.datasets[0].data = dt
                        vmCharts.chartCompare.update() 
                    },
                    error:function(){
                        alert('error ' + textStatus + " " + errorThrown);
                    }
                })
            },

            addNewRepas:function(){
                let chVege = document.getElementById('chVege')
                let chVi = document.getElementById('chVi')
                let d = $('#date_add').val()
                let h = $('#heure_add').val()
                let id = $('#id_add').val()
                let vege_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round sm-round align-self-center round-success"><i class="fas fa-carrot" style="vertical-align: text-top;"></i></div><div class="m-l-7 align-self-center" style="display:flex"><h4 class="m-b-0 title-card">Végétarien</h4><button class="btn btn-danger btnSuppRepas" data-date='+d+' data-heure='+h+' data-id='+id+' data-toggle="modal" data-target="#modal-removeRepas"><i class="fas fa-trash-alt"></i></button></div></div></div></div></div>'
                let viande_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round sm-round align-self-center round-warning"><i class="fas fa-drumstick-bite" style="vertical-align: text-top;"></i></div><div class="m-l-7 align-self-center" style="display:flex"><h4 class="m-b-0 title-card">Viande</h4><button class="btn btn-danger btnSuppRepas" data-date='+d+' data-heure='+h+' data-id='+id+' data-toggle="modal" data-target="#modal-removeRepas"><i class="fas fa-trash-alt"></i></button></div></div></div></div>'
                let poisson_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round sm-round align-self-center round-info"><i class="fas fa-fish" style="vertical-align: text-top;"></i></div><div class="m-l-7 align-self-center" style="display:flex"><h4 class="m-b-0 title-card">Poisson</h4><button class="btn btn-danger btnSuppRepas" data-date='+d+' data-heure='+h+' data-id='+id+' data-toggle="modal" data-target="#modal-removeRepas"><i class="fas fa-trash-alt"></i></button></div></div></div></div>'
                let t_r,newValue;
                chVege.checked ? t_r = 'vege' : chVi.checked ? t_r = 'viande' : t_r = 'poisson'
                t_r == 'vege' ? newValue = {id:id,type_repas :vege_template} : t_r == 'viande' ? newValue = {id:id,type_repas :viande_template} : newValue = {id:id,type_repas :poisson_template}

                $.ajax({
                    url:'/addRepas',
                    type:'POST',
                    data:{type_repas:t_r,date:d,heure:h},
                    success:function(data){
                        $('#modal-addRepas').modal('hide'); 
                        d = moment($('#date_add').val(),'DD-MM-YYYY').date()
                        setArrayRepas(h,d,vmApp,id,newValue)
                        
                        vmCharts.data_rep = data[0].resultQuery
                        let type_Vi = 0, type_Ve = 0, type_P = 0
                        vmCharts.data_rep.forEach(element => {
                            if(element.type_repas === 1) type_Ve++
                            else if(element.type_repas === 2) type_Vi++
                            else if(element.type_repas === 3) type_P++
                        });
            
                        let dt = [type_Ve,type_Vi,type_P]
                        vmCharts.chartCompare.data.datasets[0].data = dt
                        vmCharts.chartCompare.update()                    
                    },
                    error:function(){
                        alert('error ' + textStatus + " " + errorThrown);
                    }
                })
            }
        },
    })
}


