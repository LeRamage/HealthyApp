document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('chVege').addEventListener('change', ()=>{
        $('#chVi').prop('checked', false);
        $('#chPo').prop('checked', false);
        if($('#chVege').prop('checked'))
            document.getElementById("btn_addRepas").disabled = false;
        else
            document.getElementById("btn_addRepas").disabled = true;       
    });
    document.getElementById('chVi').addEventListener('change', ()=>{
        $('#chVege').prop('checked', false);
        $('#chPo').prop('checked', false);
        document.getElementById("btn_addRepas").disabled = false;
        if($('#chVi').prop('checked'))
            document.getElementById("btn_addRepas").disabled = false;
        else
            document.getElementById("btn_addRepas").disabled = true; 
    });
    document.getElementById('chPo').addEventListener('change', ()=>{
        $('#chVi').prop('checked', false);
        $('#chVege').prop('checked', false);
        document.getElementById("btn_addRepas").disabled = false;
        if($('#chPo').prop('checked'))
            document.getElementById("btn_addRepas").disabled = false;
        else
            document.getElementById("btn_addRepas").disabled = true; 
    });
        
});
