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
const database = firebase.database();
var usersRef = firebase.database().ref('Users');
  
/*---------------TESTING DATABASE MANIPULATION...aka ignore-----------------------*/
/*
usersRef.on("value", snap => {
    console.log(snap); // this key will output users
    console.log(snap.key); // this method will return full user
    console.log(snap.val());    //user list
    console.log(snap.ref.toString())  //firebase database
});
*/

//RETRIEVE ACTIVE USER LOGIN BY EMAIL KEY
var emailKey = localStorage.getItem("emailkey");
//console.log(emailKey)


//---------CHECK IF USER LOGGED IN--------
//IF NOT, SEND USER TO LOGIN SCREEN
if (emailKey == null) {
    console.log('this user skipped logging in');
    alert('Please remember to login.')
    window.open('login.html',"_self");
} else {
    console.log('this user logged in')
}


//COLLECT VALUES FROM USER'S ACCOUNT

var authAvatar, authFirstName;
database.ref('Users').child(emailKey).once('value').then(function(snapshot) {
    var value = snapshot.val();
    authPassword = value.password;  //associated psw
    authAvatar = value.avatar;
    authFirstName = value.firstname;
    authLastName = value.lastname;
    authCareer = value.title;

    console.log(authAvatar)

    //set emoji by gender
    setAvatar(authAvatar);
    setFirstName(authFirstName);
    setLastName(authLastName);
    setFullName(authFirstName, authLastName)
    setCareer(authCareer);
});

//console.log(authFirstName);


function setAvatar(avatar) {
    var userIcons = document.querySelectorAll('.userIcon');
    Array.from(userIcons).forEach( holder => {
        console.log(avatar)
        holder.src =  'images/avatars/'+ avatar +'.png';
    })
};

function setFirstName(fName) {
    var fNameHolders = document.querySelectorAll('.fName');
    Array.from(fNameHolders).forEach( holder => {
        holder.innerHTML = fName;
    })
};

function setLastName(lName) {
    var lNameHolders = document.querySelectorAll('.lName');
    Array.from(lNameHolders).forEach( holder => {
        holder.innerHTML = lName;
    })
};
function setFullName(fName, lName) {
    var fullName = fName + " " + lName;
    var fullNameHolders = document.querySelectorAll('.activeFullname');
    Array.from(fullNameHolders).forEach( holder => {
        holder.innerHTML = fullName;
    })
}

function setCareer(careerTitle) {
    var career = document.getElementById('career');
    career.innerHTML = careerTitle;
}



//-------------SIGN OUT ---------------------

function signOut(){
    localStorage.removeItem("emailkey", emailKey);
};


