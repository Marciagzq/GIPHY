
var topics = ['cat', 'chameleon', 'ferret', 'turtle', 'pig', 'rabit','crocodile', 'monkey', 'bambi', 'dog', 'hamster', 'goat', 'pig', 'parrot'];
var newtopicss = "";
var currentsearch = []
var previoustopic = ""
var offset = 0;

function selectedButton(animal, limitNumber){

    var add = false;
    if(previoustopic == animal){
        offset += 10
    }
    else{
        $( ".searchresult" ).remove();
        previoustopic = animal;
        offset = 0
    } 
    
    // this function would grab the information thru the API
    // It has the parameters defined 
    var queryURL = ("http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=WmLVICCu0jxWYPKpqx7o5w3ubZu2Wbp1&limit=" + limitNumber + "&offset="+ offset);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
       console.log(response);
 
        previoustopic = animal;
        var responselist = response.data;
        currentsearch = responselist;

        for (var i = 0; i < responselist.length; i++){
            responselist[i].still = true;
            var rating = (responselist[i].rating);
            var title = responselist[i].title;
            var mp4 = (responselist[i].images.downsized_still.url);
            var gifCont = $("<div listindex='"+i+"' still='true' class='searchresult'><h5 class='rating'>"+ rating +"</h5><img width='100px' height='100px' class='mp4' src='"+mp4+"'><p class='rating' >"+ title +"</p></div>")
            $("#gif-container").append(gifCont);    
        }
    });

};

function newButton(value){
    var found = false;
    for (var i = 0; i < topics.length; i++){
        if (topics[i] === value){
            found = true;
        } 
    }

    if(found){        
        alert("Repeated Animal");
    }
    else{
        topics.push(value);
        var addedButton = $("<input type='button' class='defined-button' value='" + value +"'></input>");
        $(".col-lg-12").append(addedButton);
    }
}


//
$( document ).ready(function() {
    
    $('.col-lg-12').on('click', '.defined-button', function() {
        var button = $(this).val();
        selectedButton(button, 10);
    });
    
    $('#gif-container').on('click', '.searchresult', function() {

        var index = $(this).attr("listindex");
        var newurl = currentsearch[index].images.preview_gif.url;
        var oldurl = currentsearch[index].images.downsized_still.url;
        var still = currentsearch[index].still;
        if(still){
            $(this).children("img").attr("src", newurl)
            currentsearch[index].still = false
        }
        else{
            $(this).children("img").attr("src", oldurl)
            currentsearch[index].still = true
        }
    });


   for (var i = 0; i < topics.length; i++){
        var temp = topics[i];
        
        var button = $("<input type='button' class='defined-button' value='" + temp +"'></input>");
        $(".col-lg-12").append(button);
   }

    $("#submit-button").click(function(){
       var inputVal = $("#button-added").val();
        newButton(inputVal);
      
    });

    
});


  

