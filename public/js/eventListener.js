document.addEventListener('DOMContentLoaded', function () {

    let chVege = document.getElementById('chVege')
    let chVi = document.getElementById('chVi')
    let chPo = document.getElementById('chPo')
    let btnAddRepas = document.getElementsByClassName('btnAddRepas')
    let btnSuppRepas = document.getElementsByClassName('btnSuppRepas')

    chVege.addEventListener('change', ()=>{
        $('#chVi').prop('checked', false);
        $('#chPo').prop('checked', false);
        chVege.checked ? document.getElementById("btn_addRepas").disabled = false : document.getElementById("btn_addRepas").disabled = true               
    });


    chVi.addEventListener('change', ()=>{
        $('#chVege').prop('checked', false);
        $('#chPo').prop('checked', false);
        chVi.checked ? document.getElementById("btn_addRepas").disabled = false : document.getElementById("btn_addRepas").disabled = false               
    });

    chPo.addEventListener('change', ()=>{
        $('#chVi').prop('checked', false);
        $('#chVege').prop('checked', false);  
        chPo.checked ? document.getElementById("btn_addRepas").disabled = false : document.getElementById("btn_addRepas").disabled = true 
    });

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
            $('#date_supp').val(date)
            $('#heure_supp').val(heure_repas)
        })
    })
});
