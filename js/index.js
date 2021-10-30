
 /*
 RED PLANET: FAUX SOCIAL MEDIA PLATFORM

 CONNECT TO REALTIME DATABASE AND THEN PROCESS IF THE USER IS CREATING NEW ACCOUNT
 OR LOGGING IN . IF LOGGING IN, THEN MATCH THE INPUT EMAIL TO A DB KEY AND CHECK IF
 THE KEY HAS THE CORRESPONDING PASSWORD. IF YES, MOVE TO HOMEPAGE, ELSE IF, USER ENTER 
 VALID USERNAME WITH INCORRECT PASSWORD PROMPT USER TO TRY AGAIN || SIGNUP, ELSE, PROMPT
 USER TO SIGNUP -> REDIRECT TO SIGNUP PAGE.
 
 FUTURE IDEAS: 
 -create password and username retrieval with security questions
 -add reply features to faux user comments
 -add posting update features
 */            
               // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            var config = {
              /*
              
              
              
              INSERT YOUR API KEY TO DB HERE
              
              
              
              */

          };
        
          // Initialize Firebase
          firebase.initializeApp(config);

          //initialize variables
          const database = firebase.database();
          var usersRef = firebase.database().ref('Users');

          /*---------------DB manipulation testing   -----------------------*/
          usersRef.on("value", snap => {
            //console.log(snap); // this key will output users
            //console.log(snap.key); // this method will return full user
            //console.log(snap.val());    //<--------A COMPLETE USERS LIST
            //console.log(snap.ref.toString())  //firebase database
        });


            /*---------------testing   -----------------------*/
          //Alert box
          var createUserAlert = document.getElementById('new-create-wrapper');


          //BTNS
          //login to account
          var submitBtn = document.getElementById('submitBtn');
          //create account
          var createUser = document.getElementById('createsubmitBtn');
          createUserHandler(createUser);


        function createUserHandler(createUser) {
            if (createUser) {
                createUser.addEventListener('click', function(e) {
                    e.preventDefault();
                    var createemail =  document.getElementById('createemail').value;
                    var createpassword = document.getElementById('createpassword').value;
                    createEPExist(createemail, createpassword);
                    });
            } else {
                //console.log('ignore')
            };
        };

          //FILTER FOR INVALID PASSWORD EMAIL FORMAT
        function createEPExist(createemail, createpassword){

            //run form validation in createUserVal.js file
            var checkEl = formattingErrors();

            //check what createUserVal.js returns -true/false
            if (checkEl == true) {
                saveUser(createemail, createpassword);
                //save as active user locally
                getEmailKey(createemail, createpassword);
                console.log(emailKey)
                localStorage.setItem("emailkey", emailKey);
                //alert('account created succesfuly')
                var successfulCreationofUser = document.getElementById('successfulCreation');

                successfulCreationofUser.classList.add('show');
                document.getElementById('contactForm').reset();
                //time delay before opening site after login success
            } else {
                //if createUserVal.js returns false then throw error
                //console.log('invalid email and password values')
                throw new Error;
            };
        };

          //Grab the necessary elements
          if (submitBtn) {
            submitBtn.addEventListener('click', submitForm);
          } else {
              console.log('ignore thIs one')
          }
          function submitForm(e) {
              e.preventDefault();
              var email =  document.getElementById('email').value;
              var password = document.getElementById('password').value;
            //TODO  validate for empty inputs here --->
                var emptyInputsResults = emptyInputs();

                if (emptyInputsResults == false) {
                    //console.log('stop, something is invalid formatted here')
                    throw new Error;
                }
              //check if it exists already
              doesitExist(email, password);
          }


          //grabs the email and password key
          const ref = usersRef.orderByChild("email");
          const passwordref = usersRef.orderByChild("password");
          //does this email already exists
          function doesitExist(email ,password){
              var query = ref.equalTo(email);
              query.once('value', function(snapshot) {
                    if(snapshot.exists()){
                        //console.log('yes this '+ email +' is here')
                        //insert successfully logged in message
                        getEmailKey(email, password)
                        //var queryPwd = passwordref.equalTo(password);
                        queryPwd.once('value', function(snapshot2) {
                        if(snapshot2.exists()) {
                            //console.log('correct password')
                            var thiskey = snapshot2.getKey();
                            //console.log(thiskey);
                            return;
                        } else {
                            //console.log('incorrect password')
                            //console.log(password);
                        }
                        
                    })
                    var logindiv = document.getElementById('successful-login');
                    logindiv.parentNode.classList.add('show');
                    /*Extra step: Could insert a time delay here so users can see 
                    this success message before redirecting to home. As 
                    of now it is skipped over*/

                  } else {
                      //would you like to make new account?
                      createUserAlert.classList.add('show');
                      //yes, create new user
                      //saveUser(email, password);
                      //empty form
                      document.getElementById('contactForm').reset();
                      console.log('New user created')

                  }
              });
          };
          

          //Saves and Creates new user
          function saveUser(elemail, elpassword){
              var fName = document.getElementById('firstName').value;
              var lName = document.getElementById('lastName').value;
              var avatar = document.getElementById('avatar').value;
              var title = document.getElementById('careertitle').value;

              var newUser = usersRef.push();
              newUser.set({
                  email: elemail,
                  password: elpassword,
                  firstname: fName,
                  lastname: lName,
                  avatar: avatar,
                  title: title
              });
          }
          


/* -------------------DOES THE EMAIL MATCH THE PASSWORD? -------------------------------*/

            //GET EMAIL KEY ASSOCIATED TO EMAIL
            function getEmailKey(email, elpassword){
                
                var emailKey;
                usersRef.orderByChild("email").equalTo(email).on("child_added", (snap) => {
                    //console.log("email key " + snap.ref.key);
                    emailKey = snap.ref.key;
                    findPassword(emailKey, elpassword);
                });
            };
            
            //FIND MATCHING PASSWORD
            var authPassword;
            function findPassword(emailKey, elpassword) {
                database.ref('Users').child(emailKey).once('value').then(function(snapshot) {
                    var value = snapshot.val();
                    authPassword = value.password;  //associated psw
                    //console.log('Users:', value.password);
                    //console.log(authPassword);
                    itsaMatch(authPassword, elpassword, emailKey);
                  })
              }
            
            
            //DOES EMAIL MATCH PASSWORD RETRIEVED
            function itsaMatch(authPassword, elpassword, emailKey) {
                //console.log('the auth password' + authPassword)
                if(elpassword == authPassword) {
                    console.log('this email matches the pulled password - login successful')
                    //redirect to home when login successful
                    localStorage.setItem("emailkey", emailKey);
                    window.location.href = 'home.html';
                    return;
                    //the password matches the username
                } else{
                    //the password does not match the username
                }
                //Display prompt asking user to "try again" or "sign up"
                invalidPass();
            }



