
               
               // Your web app's Firebase configuration
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            var config = {
              apiKey: "AIzaSyCGllKygtvgslm-Seou9YYqrsajjzjYUzM",
              authDomain: "loginsite-9f275.firebaseapp.com",
              databaseURL: "https://loginsite-9f275-default-rtdb.firebaseio.com",
              projectId: "loginsite-9f275",
              storageBucket: "loginsite-9f275.appspot.com",
              messagingSenderId: "294766221060",
              appId: "1:294766221060:web:2a47f1ea6436aa975be251",
              measurementId: "G-WT4W5LRHEL"

          };
        
          // Initialize Firebase
          firebase.initializeApp(config);
          //initialize variables
          
          const database = firebase.database()

          var usersRef = firebase.database().ref('Users');

          /*---------------testing   -----------------------*/
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
                console.log('ignore')
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
                console.log('invalid email and password values')
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
                    console.log('stop, something is invalid formatted here')
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
                        console.log('yes this '+ email +' is here')
                        //insert successfully logged in message
                        getEmailKey(email, password)
                        //var queryPwd = passwordref.equalTo(password);
                        queryPwd.once('value', function(snapshot2) {
                        if(snapshot2.exists()) {
                            console.log('and that is the password')
                            var thiskey = snapshot2.getKey();
                            console.log(thiskey)
                            return;
                        } else {
                            console.log('this is not the password')
                            console.log(password)
                        }
                        
                    })
                    var logindiv = document.getElementById('successful-login');
                    logindiv.parentNode.classList.add('show');
                    //time delay before opening site after login success
                   // setTimeout(function () {
                        //TODO INSERT A FAUX HOMEPAGE
                        //window.open('home.html',"_self");  //
                    //}, 2000);

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
                    console.log("email key " + snap.ref.key);
                    emailKey = snap.ref.key;
                    findPassword(emailKey, elpassword);
                });
            };
            
            //FIND MATCHING PASSWORD
            var authPassword;
            function findPassword(emailKey, elpassword) {
                console.log('yooo')
                database.ref('Users').child(emailKey).once('value').then(function(snapshot) {
                    var value = snapshot.val();
                    authPassword = value.password;  //associated psw
                    console.log('Users:', value.password);
                    console.log(authPassword);
                    itsaMatch(authPassword, elpassword, emailKey);
                    //resp.json(value.password);
                  })
                  //.catch(next);
              }
            
            
            //DOES EMAIL MATCH PASSWORD RETRIEVED
            function itsaMatch(authPassword, elpassword, emailKey) {
                console.log('the auth password' + authPassword)
                if(elpassword == authPassword) {
                    console.log('this email matches the pulled password - login successful')
                    //redirect to home when login successful
                    localStorage.setItem("emailkey", emailKey);
                    window.location.href = 'home.html';
                    //the password matches the username
                } else{
                    //alert('invalid password')
                    console.log('this email does not match the pulled password')
                    //the password does not match the username
                }
            }



