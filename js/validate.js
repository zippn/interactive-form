//Setting vars
let falseCount = 0;
//Get inputs
const name = $('#name');
const mail = $('#mail');
const activities = $('.activities input');
const ccNum = $('#cc-num');
const zipNum = $('#zip');
const cvvNum = $('#cvv');

//input check on the go
form.addEventListener('input',function (e) {
    //console.log(e.target);
    var input = $(e.target);
    var inputName = input.attr('id');
    //console.log(input.attr('id'));

    removeError(input);

    switch (inputName){

        case 'name':

            if ($.trim(input.val()).length===0){

                addError(input);
            }
            break;
        case 'mail':
            if (!validateEmail(input.val())){
                addError(input);
            }
            break;
        case 'cc-num':
            if (!checkCCNum(input.val())) {
                addError(input);

            }
            break;
        case 'zip':
            if (!checkZip(input.val())) {
                addError(input);

            }
            break;
        case 'cvv':
            if (!checkCVV(input.val())) {
                addError(input);

            }
            break;
    }


});

function removeError(e) {
  //  console.log(e);
    e.prev().removeClass('required-input empty-input');

    e.removeClass('required-input empty-input');



}
//validate form
function validate(e) {
    //set/reset validation checks
    let validForm = false;
    falseCount = 0;

    $('.required-input').each(function () {
       // console.log(this);
       $(this).removeClass('required-input empty-input');

    });
    //check inputs
    if ($.trim(name.val()).length===0){
        addError(name);
    }
    if(!validateEmail(mail.val())) {
        addError(mail);
    }
    if(!checkActivity(activities)){
        addError($('.activities'));

    }
    //check credit card if selected
     if (selectPayment.selectedIndex===1) {
         if (!checkCCNum(ccNum.val())) {
             addError(ccNum);

         }
         if (!checkZip(zipNum.val())) {
             addError(zipNum);
         }
         if (!checkCVV(cvvNum.val())) {
             addError(cvvNum);
         }


     }
    //valid form
    if (falseCount === 0) {
        validForm = true;
    }
    //invalid form
    if (!validForm) {
        e.preventDefault();
        window.location.assign("#top");

    }
    
}
//add error warning for invalid iput
function addError(selector) {
    falseCount +=1;
    //console.log('err');
    //console.log($('[for="'+selector.attr('id')+'"]'));
    $('[for="'+selector.attr('id')+'"]').addClass('required-input');
    selector.addClass('required-input');

    if(selector.attr('type')!=='checkbox'){
        
        if(!selector.val()||selector.val()===" "){
            $('[for="'+selector.attr('id')+'"]').addClass('empty-input');
            selector.addClass('empty-input');

        }
    }


}
//check e-mail
function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }else {
        return false;
    }
}
//check activity
function checkActivity(selector) {
    let activityCount = false;

    selector.each(function () {
       if (this.checked){
           activityCount = true;
       }
    });

    return activityCount;

}
//check credit card
function checkCCNum(ccNum) {
    //console.log(ccNum.length);
    if (ccNum.length>=13&&ccNum.length<=16){
        return true;
    }else {
        return false;
    }

}
//check zip code
function checkZip(zip) {
   // console.log(zip.length);
    if (zip.length===5){
        return true;
    }else {
        return false;
    }

}
//check CVV
function checkCVV(cvv) {
    //console.log(cvv.length);
    if (cvv.length===3){
        return true;
    }else {
        return false;
    }

}