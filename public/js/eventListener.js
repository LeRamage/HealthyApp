document.addEventListener('DOMContentLoaded', function () {

    let chVege = document.getElementById('chVege');
    let chVi = document.getElementById('chVi');
    let chPo = document.getElementById('chPo');
    let btnAddRepas = document.getElementsByClassName('btnAddRepas');


    chVege.addEventListener('change', ()=>{
        $('#chVi').prop('checked', false);
        $('#chPo').prop('checked', false);
        if(chVege.checked)
            document.getElementById("btn_addRepas").disabled = false;    
        else
            document.getElementById("btn_addRepas").disabled = true;                  
    });


    chVi.addEventListener('change', ()=>{
        $('#chVege').prop('checked', false);
        $('#chPo').prop('checked', false);
        if(chVi.checked)
            document.getElementById("btn_addRepas").disabled = false;
        else
            document.getElementById("btn_addRepas").disabled = false;           
    });

    chPo.addEventListener('change', ()=>{
        $('#chVi').prop('checked', false);
        $('#chVege').prop('checked', false);
        if(element.checked)
            document.getElementById("btn_addRepas").disabled = false;
        else
            document.getElementById("btn_addRepas").disabled = true;  
    });

    Array.from(btnAddRepas).forEach(function(element) {
        element.addEventListener('click',()=>{
            let date = element.dataset.date
            let heure_repas = element.dataset.heure
            $('#date_value').val(date)
           $('#heure_value').val(heure_repas)
        })
    })
});
