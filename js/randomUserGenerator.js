//COMMENT BANK
var commentBank = [
  "Look out for meteor showers tonight guys! Woo! &#x1F320",
  "A true space odyssey: it's been 20 years since our Mars Odyssey spacecraft entered orbit around the Red Planet." ,
  "I hate it when people say Space Exploration is a waste of money &#x1F624",
  "I'm at the Southern Launch Site rn. 1hr till take off! &#x1F60a",
  "Guys, the 25th cycle is upon us, and it brings more opportunities to see the northern lights.",
  '“Across the sea of space, the stars are other suns."  - Carl Sagan.',
  '“Part of life’s mystery depends on future possibilities, and mystery is an elusive quality which evaporates when sampled frequently, to be followed by boredom. " – Michael Collins.',
  "Did anyone see the space debri that fell last night over the bay? &#x1F603	"
]

//returns random comment from commentBank
function findComment() {
  var max = (commentBank.length - 1);
  var i = getRandomArbitrary(max);
  var comment = commentBank[i];
  return comment;
}


//---------------------------------------------------------------------

//API REQUEST
async function getUsers() {
  let response = await fetch('https://randomuser.me/api/?format=json');
  let data = await response.json()
  return data;
}




//FIND ALL ELEMENTS THAT ARE NEEDING FAUX USER DATA
var fNameHolder = document.getElementsByClassName('api-generate-user');

Array.from(fNameHolder).forEach( holder => {
  //request api each time to ensure data variation
  getUsers().then(data => {
    //create the user and fill in element's children (h3,p,img)
    createUser(data, holder);
  }); 
})

function createUser(data, holder) {
  data.results.map(user => {
  //get generate user info
  const first = user.name.first;
  const last = user.name.last;
  const picture = user.picture.thumbnail;
  //get random comment
  var comment = findComment();
  
  var header = holder.querySelector('.generate-user-name');
  var pictureholder = holder.querySelector('img');
  var commentholder = holder.querySelector('p');
  
  //append generated data
  commentholder.innerHTML = comment;
  header.innerHTML = first + " " + last;
  pictureholder.src = picture;
  });
}



