

var displayedImage = document.querySelector('.image-fluid');
var searchBar = document.querySelector('input');
var searchBtn = document.querySelector('#searchBtn');
var main = document.querySelector('main');
var section = document.createElement('section');
var draggable = document.querySelector('.container');
var addText = document.querySelector('#addText');

main.appendChild(section);

const MEME_API = "https://api.imgflip.com/get_memes";

//dragndrop 

/* $( function() {
    $( ".meme-txt-area" ).draggable( );
  } );
 */


let memelist = [];

function makeList(memes){

for (i = 0; i < 100 ; i++){
    memelist.push(memes[i].name);
}
}


async function getMeme(){
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    const memes = data.data.memes;
    /* displayedImage.onclick = (e => {
        
        var imgSrc = memes[getRand()].url ;
        displayedImage.setAttribute('src', imgSrc);
    }) */



    
    searchBtn.onclick = (e => {
        //make sure the memelist is not duplicated
        if (memelist.length == 0){
            makeList(memes);
        }
        clearSection();
        //image.setAttribute('src', null);
        //memelist is array of meme names
        let input = searchBar.value.toLowerCase();
        for ( i = 0 ; i < 100 ; i ++){
            let memeLower = memelist[i].toLowerCase();
            if (memeLower.includes(input)){
                console.log(memes[i].url);
                var imageUrl = memes[i].url;
                var image = document.createElement('img');
                image.setAttribute('src',imageUrl);
                image.setAttribute('id', memes[i].id);
                image.setAttribute('class','img-fluid');
                section.appendChild(image);
                document.getElementById(memes[i].id).onclick = (e =>{
                    displayedImage.setAttribute('src', e.target.src);
                })
                
            }
        }
        
                 if (image == undefined){
                var noImage = document.createElement('h1');
                noImage.textContent = "how did u manage to yield zero results?";
                section.appendChild(noImage);
            }
        
    })
    return memes;
  
}

getMeme();

function clearSection(){
    document.querySelector('section').innerHTML = "";
}

function getRand(){
    return Math.floor(Math.random()*100);

}

function createTextArea(){
    
        var txtAreaHTML = "<div id='test' contentEditable='true' class='meme-txt-area'></div>";
        $("#selected-meme").append(txtAreaHTML);
        $(".meme-txt-area").draggable({containment : "parent"});
        $(".meme-txt-area").focus();
    
}

function deleteText(){
    $("#test").remove();

}


function copyToCanvas(htmlElement)
{
	var canvas = document.getElementById("meme-preview");
    var ctx = canvas.getContext("2d");

 	image = new Image(0, 0);
    	image.onload = function () {
    		canvas.width = this.naturalWidth;
    	    canvas.height = this.naturalHeight;
        
              ctx.drawImage(this, 0, 0);
              
              function drawStroked(text, left, top){
                ctx.font = '2.5em Impact';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 4;
                ctx.strokeText(text, left, top);
                ctx.fillStyle = 'white';
                ctx.fillText(text, left, top);
              }
              
              var top = 0;
              var left = 0;
              var cellspace = 0; 
    	      $(".meme-txt-area").each(function(){
               cellspace = parseInt($(this).css("padding"));
               left = parseInt($(this).css("left")) + cellspace;
               top = parseInt($(this).css("top")) + 5 * cellspace;
              let text = $(this).text().toUpperCase();
              
              drawStroked(text,left,top);
              
    	      });
        };
        
        image.src = $(".image-fluid").attr("src");
    }


    $("#save-as-image").on('click', function () {
        copyToCanvas($('.image-fluid'));
   });

   $("#save-file-btn").on('click', function () {
    var canvas = document.getElementById("meme-preview");
    var imageURL = canvas.toDataURL();
    $("#download-image").attr("href", imageURL);
});