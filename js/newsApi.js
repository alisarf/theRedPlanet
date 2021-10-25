//API REQUEST
async function getUsers() {
  let response = await fetch('https://api.spaceflightnewsapi.net/v3/articles');
  let data = await response.json()
  return data;
}

getUsers().then(data => {
  setArticle(data);
});

//get random integer
function getRandomArbitrary(max) {
  var i = Math.random() * (max - 0) + 0;
  i = Math.ceil(i);
  return i;
}

function setArticle(data){
  //find all elements requiring faux data
  var apiArticle = document.getElementsByClassName('apiArticle');
  Array.from(apiArticle).forEach( holder => {
    //grab random integer for index
    var i = getRandomArbitrary(9);

    var apiImg = holder.querySelector('img');
    var apiH3 = holder.querySelector('h3');
    var apiP = holder.querySelector('p');

    //check if paragraph is needed
    if(typeof(apiP) != 'undefined' && apiP != null){
      //append new faux data
      apiP.innerHTML = data[i].summary;
    };
    //check if image is needed
    if(typeof(apiImg) != 'undefined' && apiImg != null){
      apiImg.src = data[i].imageUrl;
    };
    //check if h3 is needed
    if(typeof(apiH3) != 'undefined' && apiH3 != null){
      apiH3.innerHTML = data[i].title;
    };
  });

}

