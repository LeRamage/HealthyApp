$(function(){
    // $('.datePicker').datepicker({
    //     format: "mm-yyyy",
    //     weekStart: 1,
    //     viewMode: 1,
    //     minViewMode: 1
    // });
    pickmeup.defaults.locales['fr'] = {
        days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        daysShort: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        daysMin: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dec']
     }
    pickmeup('.datePicker', {
        format: 'd-m-Y',
        view: 'months',
        locale: 'fr',
        class_name: 'dtDesign',
        select_day: false
    });
});
