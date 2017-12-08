let falseCount = 0;

function validate(e) {

    let validForm = false;
    falseCount = 0;
    const name = $('#name');
    const mail = $('#mail');
    const activities = $('.activities input');
    $('.required-input').each(function () {
        console.log(this);
       $(this).removeClass('required-input');
    });

    if (!name.val()){
        addError(name);
    }
    if(!validateEmail(mail.val())) {
        addError(mail);
    }
    if(!checkActivity(activities)){
        addError($('.activities'));
        console.log('yes');

    }

    if(falseCount===0){ validForm = true;}

    if(!validForm){
        e.preventDefault();
        window.location.assign("#top");

    }
    
}
function addError(selector) {
    falseCount +=1;
    console.log($('[for="'+selector.attr('id')+'"]'));
    $('[for="'+selector.attr('id')+'"]').addClass('required-input');
    selector.addClass('required-input');


}
function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    }else {
        return false;
    }
}
function checkActivity(selector) {
    let activityCount = false;

    selector.each(function () {
       if (this.checked){
           activityCount = true;
       }
    });

    return activityCount;

}