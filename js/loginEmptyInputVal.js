/* VALIDATION OF LOGIN FORM IF GIVEN EMPTY OR POOR FORMATTED INPUTS */

function emptyInputs(){
    var switcher = true;
    var emailswitcher = true;

    //CACHE INPUTS
    var email =  document.getElementById('email');
    var pwd = document.getElementById('password');
    //CREATE ARRAY OF INPUTS
    elArray = [email, pwd];
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



//INVALID  PASSWORD ENTERED BUT ACCURATE USERNAME


function invalidPass() {
    var invalidDis = document.getElementById('login-invalidPassword');
    invalidDis.classList.add('active');
}