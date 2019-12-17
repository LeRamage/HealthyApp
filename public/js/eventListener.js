document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('chVege').addEventListener('change', ()=>{
        $('#chVi').prop('checked', false);
        $('#chPo').prop('checked', false);
    });
    document.getElementById('chVi').addEventListener('change', ()=>{
        $('#chVege').prop('checked', false);
        $('#chPo').prop('checked', false);
    });
    document.getElementById('chPo').addEventListener('change', ()=>{
        $('#chVi').prop('checked', false);
        $('#chVege').prop('checked', false);
    });

    let addRepas = document.getElementsByClassName("addRepas");
    Array.from(addRepas).forEach(function(element) {
        element.addEventListener('click', () => {
            $('.ui.modal').modal('show');
        });
    });
        
});
