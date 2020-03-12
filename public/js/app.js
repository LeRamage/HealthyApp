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


if($('#calendrierRepas').val() != undefined){
    vmApp = new Vue({
        el:'#calendrierRepas',
        components: {
            vuejsDatepicker
        },
        data:{
            nxtMonth:document.getElementById('nxtMonth').textContent,
            prevMonth:document.getElementById('prevMonth').textContent,
            currentMonth:moment().month(),
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
                        vmApp.currentMonth = moment(vmApp.nxtMonth,'DD-MM-YYYY').month()
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
                        vmApp.currentMonth = moment(vmApp.prevMonth,'DD-MM-YYYY').month()
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
}


if($('#charts').val() != undefined){
    vmCharts = new Vue({
        el:'#charts',
        data:{ 
            data_rep:JSON.parse(document.getElementById('result_data_repas_pw').textContent), 
            chartCompare:null, 
            chartComparePercent:null
        },
        mounted:function(){
            let ctx = document.getElementById('chartCompareRepas')
            this.chartCompare = createChartCompare(ctx,this.data_rep,vmApp)
            ctx = document.getElementById('chartCompareRepasPercent')
            this.chartComparePercent = createChartCompararePercent(ctx,this.data_rep,vmApp)
        }
    })
}


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
                data:{date:d,heure:h,currentMonth:vmApp.currentMonth},
                success: function(data) {
                    $('#modal-removeRepas').modal('hide');
                    setArrayRepas(h,d,vmApp,id,newValue)
                    updateChartCompare(data[0].resultQuery,vmCharts,vmApp)
                    updateChartComparePercent(data[0].resultQuery,vmCharts,vmApp)
                    updateGauge(data[0].resultQuery, gaugeVege, gaugePoisson, gaugeViande)
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
                data:{type_repas:t_r,date:d,heure:h,currentMonth:vmApp.currentMonth},
                success:function(data){
                    $('#modal-addRepas').modal('hide'); 
                    setArrayRepas(h,d,vmApp,id,newValue)
                    updateChartCompare(data[0].resultQuery,vmCharts,vmApp)
                    updateChartComparePercent(data[0].resultQuery,vmCharts,vmApp)
                    updateGauge(data[0].resultQuery, gaugeVege, gaugePoisson, gaugeViande)            
                },
                error:function(){
                    alert('error ' + textStatus + " " + errorThrown);
                }
            })
        }
    },
})

if($('#ajoutRepasQuotidien').val() != undefined){
    vmAjoutRQ = new Vue({
        el:'#ajoutRepasQuotidien',
        data:{
            selectedVege_midi: false,
            selectedViande_midi: false,
            selectedPoisson_midi: false,
            selectedVege_soir: false,
            selectedViande_soir: false,
            selectedPoisson_soir: false,
            RepasJourMidiValidated:false,
            currentDay: moment().format('DD-MM-YYYY')
        },
        methods:{
            hideOthers:function(element){
                let heure;
                let type_repas;
                if(element == 'selectedVege_midi'){
                    this.selectedVege_midi = true;
                    type_repas = 1;
                    heure = 'midi'
                }else if(element == 'selectedViande_midi'){
                    this.selectedViande_midi = true;
                    type_repas = 2;
                    heure = 'midi'
                }else if(element == 'selectedPoisson_midi'){
                    this.selectedPoisson_midi = true;
                    type_repas = 3;
                    heure = 'midi'
                }else if(element == 'selectedVege_soir'){
                    this.selectedVege_soir = true;
                    type_repas = 1;
                    heure = 'soir'
                }else if(element == 'selectedViande_soir'){
                    this.selectedViande_soir = true;
                    type_repas = 2;
                    heure = 'soir'
                }else{
                    this.selectedPoisson_soir = true;
                    type_repas = 3;
                    heure = 'soir'
                }
                this.RepasJourMidiValidated = true;

                $.ajax({
                    url:'addRepas',
                    type:'POST',
                    data:{type_repas:type_repas,date:this.currentDay,heure:heure,currentMonth:vmApp.currentMonth},
                    success:function(data){
                        let id=6
                        let vege_template = '<div class="card shadow-sm border"><div class="card-body"><div class="d-flex flex-row"><div class="round sm-round align-self-center round-success"><i class="fas fa-carrot" style="vertical-align: text-top;"></i></div><div class="m-l-7 align-self-center" style="display:flex"><h4 class="m-b-0 title-card">Végétarien</h4><button class="btn btn-danger btnSuppRepas" data-date='+this.currentDay+' data-heure='+heure+' data-id='+id+' data-toggle="modal" data-target="#modal-removeRepas"><i class="fas fa-trash-alt"></i></button></div></div></div></div></div>'
                        let newValue = {id:id,type_repas :vege_template}
                        $('#modal-addRepas').modal('hide'); 
                        setArrayRepas(heure,this.currentDay,vmApp,id,newValue)
                        updateChartCompare(data[0].resultQuery,vmCharts,vmApp)
                        updateChartComparePercent(data[0].resultQuery,vmCharts,vmApp)
                        updateGauge(data[0].resultQuery, gaugeVege, gaugePoisson, gaugeViande)            
                    },
                    error:function(){
                        alert('error ' + textStatus + " " + errorThrown);
                    }
                })
            }
        }       
    })
}

/* ------ Jauge ------ */ 
let data_repas_all = JSON.parse(document.getElementById('result_data_repas_calendrier').textContent)

var gaugeVege = Gauge(document.getElementById("gaugeVege"), {
    max: 100,
    min:0,
    dialStartAngle:180,
    dialEndAngle:0, 
    label: function(value) {
        return Math.round(value) + "%";
    },
    value:0,
    color: function(value) {
      if(value < 20) {
        return "#f7aa38"; // orange
      }else if(value < 40) {
        return "#fffa50"; // yellow
      }else if(value >= 40) {
        return "#5ee432"; // green
      }
    }
});

var gaugePoisson = Gauge(document.getElementById("gaugePoisson"), {
    max: 100,
    min:0,
    dialStartAngle:180,
    dialEndAngle:0, 
    label: function(value) {
        return Math.round(value) + "%";
    },
    value:0,
    color: function(value) {
        if(value < 20) {
            return "#5ee432"; // green 
        }else if(value < 40) {
            return "#f7aa38"; // orange
        }else{
            return "#ef4655"; // red
        }
    }
});


var gaugeViande = Gauge(document.getElementById("gaugeViande"), {
    max: 100,
    min:0,
    dialStartAngle:180,
    dialEndAngle:0, 
    label: function(value) {
        return Math.round(value) + "%";
    },
    value:0,
    color: function(value) {
      if(value < 20) {
        return "#5ee432"; // green 
      }else if(value < 40) {
        return "#f7aa38"; // orange
      }else{
        return "#ef4655"; // red
      }
    }
});

updateGauge(data_repas_all, gaugeVege, gaugePoisson, gaugeViande)
/* ---------------------------- */