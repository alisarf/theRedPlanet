
function formattingErrors(){
    var switcher = true;
    var emailswitcher = true;

    //CACHE INPUTS
    var email = document.getElementById('createemail');
    var pwd = document.getElementById('createpassword');
    var fName = document.getElementById('firstName');
    var lName = document.getElementById('lastName');
    var career = document.getElementById('careertitle');
    var avatar = document.getElementById('avatar');
    //CREATE ARRAY OF INPUTS
    elArray = [email, pwd, fName, lName, career, avatar];
    //check for empty inputs
    checkArray(elArray);

    //CHECK EMAIL FORMAT
    if(validateEmail(email.value) == false) {
        getInvalidFormatEl(email);
        emailswitcher = false;
    } else {
        removeInvalidFormatEl(email);
        emailswitcher = true;
    };

    //****FINAL STEP: CHECK STATUSES OF SWITCHES AND RETURN VALUE TO INDEX.JS***
    if (switcher == false || emailswitcher == false) {
        (console.log(emailswitcher))
        throw new Error;
    } else if (switcher == true && emailswitcher == true){
        return true;
    }

    /*--- FXNS BELOW REQUIRE ACCESS TO SWITCHER VARIABLE ---*/

    //ITERATE OVER ELEMENTS IN ARRAY FOR EMPTY VALUES
    function checkArray(array) {
        Array.from(array).forEach( el => {
            checkEmpty(el);
        });
    };

    //CHECK FOR EMPTY INPUT VALUES
        //*requires switcher access*
    function checkEmpty(el) {
        if(el.value.length == 0){
            //get invalid prompts
            getInvalidFormatEl(el);
            switcher = false;
            //console.log(el + 'this is throwing the switch, here the switch status currently' + switcher)
            return switcher;
        } else {
            //console.log('this is not throwing the switch, here the switch status currently' + switcher)
            //get invalid prompts
            removeInvalidFormatEl(el);
        };
    };
};

//EMAIL VALIDATOR
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


/* -------SHOW/HIDE INVALID UI PROMPTS-------- */

//display invalid format UI prompts
function getInvalidFormatEl(el){
    console.log(el + ' add invalidformat')
    
    var txt = el.parentNode.querySelector('.invalidText');
    var img = el.parentNode.querySelector('.invalidIcon');
    txt.classList.add('showinvalid');
    img.classList.add('showinvalid');
};

//remove invalid format UI prompts
function removeInvalidFormatEl(el){
    console.log(el + ' remove invalidformat')
    
    var txt = el.parentNode.querySelector('.invalidText');
    var img = el.parentNode.querySelector('.invalidIcon');
    txt.classList.remove('showinvalid');
    img.classList.remove('showinvalid');
};
