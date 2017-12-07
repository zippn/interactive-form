
//Get form
var form = document.getElementsByTagName('form')[0];
//Event cost
var totalCost = 0;

//Set design/color
const shirtDesign = document.getElementById('design');

//Generate Job Role Other
var jobRoleOther = document.createElement('INPUT');
var selectJob = document.getElementById('title');
jobRoleOther.type = 'text';
jobRoleOther.id = 'other-title';
jobRoleOther.placeholder = 'Your Job Role';
$(jobRoleOther).insertAfter('#title');



//Initial focus
$('#name').focus();

//Toggle display for job: other
selectJob.addEventListener('change',function (e) {
   console.log(e.target.value);

   switch (e.target.value){
       case 'other':
           jobRoleOther.style.display = 'block';
           break;
       default:
           jobRoleOther.style.display = '';

   }
});

//Shirt Design
shirtDesign.addEventListener('change',function (e) {
    const selectColorSet = document.getElementById('colors-js-puns');
    const selectColor = document.getElementById('color');
    console.log(e.target.value);

    switch (e.target.value){
        case 'js puns':
            setActiveColor('JS Puns', 0);
            break;
        case 'heart js':
            setActiveColor('I ♥ JS', 3);
            break;

    }
    switch (shirtDesign.selectedIndex){
        case 0:
            selectColorSet.className = '';
            break;
        default:
            selectColorSet.className = 'active-menu';


    }

});

function setActiveColor(design, setIndex) {
    const selectColor = document.getElementById('color');

    const colors = $('#color option');

    selectColor.selectedIndex = setIndex;


    colors.each(function () {

        $(this).is(':contains("' + design + '")')? $(this).addClass('active-color'):$(this).removeClass('active-color');

    });

}

$('.activities input').click(function () {
    const eventString = $(this).parent().text().split(" ");
    var eventCost = eventString.pop();
    var eventTime = eventString.slice(eventString.length-2,eventString.length);
    eventTime = eventTime.join(" ");
    eventCost = parseInt(eventCost.substr(1,eventCost.length));

    disableActivity($(this),eventTime,this.checked);
    this.checked ? totalCost += eventCost : totalCost-= eventCost;
    addCost();
    console.log(totalCost);


});

function addCost() {
    const cost = document.createElement('P');

    cost.textContent = "Total: "+totalCost;
    cost.className ='cost';
    $('.activities .cost').remove();
    $(cost).appendTo('.activities');

}
function disableActivity(selectedEvent,selectedTime, checked) {
    console.log(selectedTime);
    var events = $('.activities label');

    events.each(function () {
        const eventString = $(this).text().split(" ");
        const current = $(this).find('input');
        var eventTime = eventString.slice(eventString.length-3,eventString.length-1);
        eventTime = eventTime.join(" ");

        if (current.attr('name')!==selectedEvent.attr('name')&&selectedTime===eventTime){
            console.log(current.attr('name')+' '+eventTime);
            setActives(current,current.parent(),checked);

        }

    });


};
function setActives(selected, parent, checked) {
    selected.attr('disabled',checked);
    checked ? parent.addClass('disable-activity'):parent.removeClass('disable-activity');


}