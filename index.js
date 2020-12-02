var displayedImage = document.querySelector(".current-meme");
var searchBar = document.querySelector("input");
var searchBtn = document.querySelector("#searchBtn");
var main = document.querySelector(".fetched-memes");
var draggable = document.querySelector(".container");
var addText = document.querySelector("#addText");
var boxNum = document.querySelector(".boxNum");
var rightCol = document.querySelector(".rightCol");

const MEME_API = "https://api.imgflip.com/get_memes";

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
        displayedImage.setAttribute("src", e.target.src);
        displayedImage.setAttribute("id", e.target.id);
        displayedImage.setAttribute("class", "current-meme");
        displayedImage.setAttribute("alt", e.target.alt);
        //removes all previously added text boxes
        $(".meme-txt-area").remove();
        
      };
    });
  };
}

async function captionMeme() {
  const formData = new FormData();
  let currentMeme = document.getElementsByClassName("current-meme");
  let memeID = currentMeme[0].id;
  let topText = document.getElementById("topText").value;
  let botText = document.getElementById("botText").value;
  //code for if boxes worked by post
  /* let textboxes = document.querySelectorAll('.textboxes')
  let boxes = [];
  textboxes.forEach(textbox => {
      let data = {
          "text" : textbox.value
      }
      boxes.push(data);
  }); */
  //this should be done server side
  formData.append("template_id", memeID);
  formData.append("username", "bobross96");
  formData.append("password", "Mememachine1996");
  formData.append("text0", topText);
  formData.append("text1", botText);

  //formData.append("boxes",JSON.stringify([{"text":"test"}]));
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

getMeme();

function clearSection() {
  document.querySelector(".fetched-memes").innerHTML = "";
}

function getRand() {
  return Math.floor(Math.random() * 100);
}

function createTextArea() {
  var txtAreaHTML =
    "<div id='textbox' contentEditable='true' class='meme-txt-area'></div>";
  $("#selected-meme").append(txtAreaHTML);
  $(".meme-txt-area").draggable({ containment: "parent" });
  $(".meme-txt-area").focus();
}

function deleteText() {
  $("#textbox").remove();
}

function copyToCanvas(htmlElement) {
  var canvas = document.getElementById("meme-preview");
  var ctx = canvas.getContext("2d");

  image = new Image(0, 0);
  image.onload = function () {
    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;

    ctx.drawImage(this, 0, 0);

    function drawStroked(text, left, top) {
      ctx.font = "2.5em Impact";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.strokeText(text, left, top);
      ctx.fillStyle = "white";
      ctx.fillText(text, left, top);
    }

    var top = 0;
    var left = 0;
    var cellspace = 0;
    //will draw text from current meme image to canvas
    /* let textboxes = document.querySelectorAll(".meme-txt-area");

    
    textboxes.forEach(box => {
      cellspace = parseInt($(box).css("padding"));
      left = parseInt($(box).css("left")) + cellspace;
      top = parseInt($(box).css("top")) + 5 * cellspace;
      let text = $(box).text().toUpperCase();
      drawStroked(text,left,top);
    }); */
    
    
    jQuery.each($(".meme-txt-area"),function () {
      console.log('im running');
      cellspace = parseInt($(this).css("padding"));
      left = parseInt($(this).css("left")) + cellspace;
      top = parseInt($(this).css("top")) + 5 * cellspace;
      let text = $(this).text().toUpperCase();

      drawStroked(text, left, top);
    });
  };

  image.src = $(".current-meme").attr("src");
}

$("#save-as-image").on("click", function () {
  copyToCanvas($(".current-meme"));
  /* var canvas = document.getElementById("meme-preview");
  var imageURL = canvas.toDataURL();
  $("#download-image").attr("href", imageURL); */
});
