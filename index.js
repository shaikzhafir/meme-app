

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
                this.imageUrl = imageUrl;
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
    /* makeList(memes);
    console.log(memelist); */
}

getMeme();

function clearSection(){
    document.querySelector('section').innerHTML = "";
}

function getRand(){
    return Math.floor(Math.random()*100);

}

function createTextArea(){
    
        var txtAreaHTML = "<div contentEditable='true' class='meme-txt-area'></div>";
        $("#selected-meme").append(txtAreaHTML);
        $(".meme-txt-area").draggable();
        $(".meme-txt-area").focus();
    
}