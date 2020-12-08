var displayedImage = document.querySelector(".current-meme");
var searchBar = document.querySelector("input");
var searchBtn = document.querySelector("#searchBtn");
var main = document.querySelector(".fetched-memes");
var draggable = document.querySelector(".container");
var addText = document.querySelector("#addText");
var boxNum = document.querySelector(".boxNum");
var rightCol = document.querySelector(".rightCol");


const MEME_API = "https://api.imgflip.com/get_memes";

getMeme();

//dragndrop

/* $( function() {
    $( ".meme-txt-area" ).draggable( );
  } );
 */

let memelist = [];

function makeList(memes) {
  memes.forEach((meme) => {
    memelist.push(meme.name);
  });
}

async function getMeme() {
  const response = await fetch("https://api.imgflip.com/get_memes");
  const data = await response.json();
  const memes = data.data.memes;
  /* displayedImage.onclick = (e => {
        
        var imgSrc = memes[getRand()].url ;
        displayedImage.setAttribute('src', imgSrc);
    }) */
  
  setRandomMeme(memes)
  searchBtn.onclick = (e) => {
    //make sure the memelist is not duplicated
    if (memelist.length == 0) {
      makeList(memes);
    }
    clearSection();
    //image.setAttribute('src', null);
    //memelist is array of meme names
    //let input = searchBar.value.toLowerCase();
    memes.forEach((meme) => {
      var imageUrl = meme.url;
      var image = document.createElement("img");

      image.setAttribute("src", imageUrl);
      image.setAttribute("id", meme.id);
      image.setAttribute("class", "img-fluid");
      image.setAttribute("alt", meme.box_count);
      main.appendChild(image);

        //set up function for every meme when clicked
        document.getElementById(meme.id).onclick = (e) => {
          document.getElementById("textboxes").innerHTML = "";
          displayedImage.setAttribute("src", e.target.src);
          displayedImage.setAttribute("id", e.target.id);
          displayedImage.setAttribute("alt", e.target.alt);
          for (let index = 0; index < e.target.alt; index++) {
            var inputBox = `<label for='textbox'>text${index+1}</label><br><input class='textbox' type='text' id='text${index+1}' name='text${index+1}'><br>`;
            $(".textboxes").append(inputBox);
          }
          window.scrollTo(0, 0);
        };
      
    });
  };
}

//should send the details to API and API fill up the details 
async function captionMeme() {
  const formData = new FormData();
  let currentMeme = document.getElementsByClassName("current-meme");
  let memeID = currentMeme[0].id;
  //this should be done server side but fuck it
  formData.append("template_id", memeID);
  formData.append("username", "bobross96");
  formData.append("password", "Mememachine1996");
  //add space if empty to avoid error of no entry
  let textboxes = document.querySelectorAll('.textbox')
  textboxes.forEach((textbox,index) => {
      if (textbox.value == ""){
        textbox.value = " ";
      }
      formData.append(`boxes[${index}][text]`,textbox.value)
  }); 

  console.log(formData);
  fetch("https://api.imgflip.com/caption_image", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
      displayedImage.setAttribute("src", result.data.url);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const data = {
  template_id: "438680",
  username: "bobross96",
  password: "Mememachine1996",
  text0: "lala",
  text1: "poop",
};

function setRandomMeme(memeArray) {
  let randomMemeLocation = Math.floor(Math.random() * memeArray.length);
  let randomMeme = memeArray[randomMemeLocation];
  displayedImage.setAttribute("src", randomMeme.url);
  displayedImage.setAttribute("id", randomMeme.id);
  displayedImage.setAttribute("alt", randomMeme.box_count);
  
  for (let index = 0; index < randomMeme.box_count; index++) {
    var inputBox = `<label for='textbox'>text${index+1}</label><br><input class='textbox' type='text' id='text${index+1}' name='text${index+1}'><br>`;
    $(".textboxes").append(inputBox);
  }
    
  

}

function clearSection() {
  document.querySelector(".fetched-memes").innerHTML = "";
}

function getRand() {
  return Math.floor(Math.random() * 100);
}
