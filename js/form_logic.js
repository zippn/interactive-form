
//Get form
var form = document.getElementsByTagName('form')[0];
//Event cost
var cost = document.createElement('SPAN');
var totalCost = 0;
cost.textContent = "Total: $"+totalCost;
cost.className ='cost';
$(cost).appendTo('.activities');


//Set design/color
const shirtDesign = document.getElementById('design');
$('#colors-js-puns').hide();
//Generate Job Role Other
/*
var jobRoleOther = document.createElement('INPUT');
jobRoleOther.type = 'text';
jobRoleOther.id = 'other-title';
jobRoleOther.placeholder = 'Your Job Role';
$(jobRoleOther).insertAfter('#title');
*/
//Get job menu
const selectJob = document.getElementById('title');
const jobRoleOther = document.getElementById('other-title');
jobRoleOther.style.display = 'none';

//Paypment mods
const payFieldSet = $('form fieldset').last();
const bitcoinDiv = payFieldSet.find('div').last();
const paypalDiv = bitcoinDiv.prev();
const selectPayment = document.getElementById('payment');
const paymentType = $(payFieldSet).children('div');
selectPayment.selectedIndex = 1;
bitcoinDiv.attr('id','bitcoin');
paypalDiv.attr('id','paypal');
paymentType.addClass('disable-payment');

$('#credit-card').removeClass('disable-payment').addClass('active-payment');


//Initial focus
$('#name').focus();
$('form').submit(function (e) {
    validate(e);
});
//Toggle display for job: other
selectJob.addEventListener('change',function (e) {

   switch (e.target.value){
       case 'other':
           jobRoleOther.style.display = 'block';//set visible
           break;
       default:
           jobRoleOther.style.display = 'none';

   }
});

//Shirt Design
shirtDesign.addEventListener('change',function (e) {
    const selectColorSet = document.getElementById('colors-js-puns');
   // const selectColor = document.getElementById('color');

    switch (e.target.value){//action for different shirts
        case 'js puns':
            setActiveColor('JS Puns', 0);
            break;
        case 'heart js':
            setActiveColor('I ♥ JS', 3);
            break;

    }
    switch (shirtDesign.selectedIndex){//set display on color menu
        case 0:
            $(selectColorSet).hide();
            break;
        default:
            $(selectColorSet).show();


    }

});
//Event select
$('.activities input').click(function () {
    const eventString = $(this).parent().text().split(" ");//convert to array
    var eventCost = eventString.pop();//get cost
    var eventTime = eventString.slice(eventString.length-2,eventString.length);//event day/time
    eventTime = eventTime.join(" ");
    eventCost = parseInt(eventCost.substr(1,eventCost.length));//event cost

    disableActivity($(this),eventTime,this.checked);//call function to find common time
    this.checked ? totalCost += eventCost : totalCost-= eventCost;//add/sub cost
    addCost();


});
//Payment select
selectPayment.addEventListener('change',function (e) {
    paymentType.removeClass('active-payment').addClass('disable-payment');
    switch (e.target.value){
        case 'credit card':
            $('#credit-card').removeClass('disable-payment').addClass('active-payment');//set visible
            break;
        case 'bitcoin':
            $('#bitcoin').removeClass('disable-payment').addClass('active-payment');//set visible
            break;
        case 'paypal':
            $('#paypal').removeClass('disable-payment').addClass('active-payment');//set visible
            break;
    }
});

function setActiveColor(design, setIndex) {
    const selectColor = document.getElementById('color');

    const colors = $('#color option');//get colors

    selectColor.selectedIndex = setIndex;//set a color option when filtering shirt type

    colors.addClass('hide');
    colors.each(function () {

        $(this).is(':contains("' + design + '")')? $(this).addClass('active-color'):$(this).removeClass('active-color');//remove select color from view

    });

}

function addCost() {

    cost.textContent = "Total: $"+totalCost;//set cost text

}
function disableActivity(selectedEvent,selectedTime, checked) {
    var events = $('.activities label');//get events

    events.each(function () {
        const current = $(this).find('input');
        console.log(selectedTime+' '+this.textContent);
        console.log(selectedTime.indexOf(this.textContent)!==-1);

        console.log(current.attr('name')!==selectedEvent.attr('name'));

        if (current.attr('name')!==selectedEvent.attr('name')&&this.textContent.indexOf(selectedTime)!==-1){//different event with same time slot
            //console.log(current.attr('name')+' '+eventTime);
            setActives(current,current.parent(),checked);

        }

    });


};
function setActives(selected, parent, checked) {
    selected.attr('disabled',checked);//enable/disable event
    checked ? parent.addClass('disable-activity'):parent.removeClass('disable-activity');//add/remove class 'disable-activity'


}