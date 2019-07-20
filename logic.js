// Global arrays and variables defined to call them later;
// Array of strings we will define as buttons later.
var topics = ['cat', 'chameleon', 'dolphin', 'ferret', 'turtle', 'pig', 'rabit', 'crocodile', 'monkey', 'dog', 'hamster', 'goat', 'chicken', 'parrot', 'fish', 'gorila', 'cow'];
var newtopicss = "";
var currentsearch = []
var previoustopic = ""
var offset = 0;

function selectedButton(animal, limitNumber) {

    //This code asures the user to grab 10 items more on each click to the same,
    var add = false;
    if (previoustopic == animal) {
        offset += 10
    }
    else {
        $(".searchresult").remove();
        previoustopic = animal;
        offset = 0
    }

    // this function would grab the information from an existing API
    // It has the parameters defined to search for an specific information.
    var queryURL = ("https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=WmLVICCu0jxWYPKpqx7o5w3ubZu2Wbp1&limit=" + limitNumber + "&offset=" + offset);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        previoustopic = animal;
        var responselist = response.data;
        currentsearch = responselist;

        for (var i = 0; i < responselist.length; i++) {
            responselist[i].still = true;
            var rating = (responselist[i].rating);
            var title = responselist[i].title;
            var mp4 = (responselist[i].images.downsized_still.url);
            var gifCont = $("<div listindex='" + i + "' still='true' class='searchresult'><h5 class='rating'>" + rating + "</h5><img width='200px' height='200px' class='mp4' src='" + mp4 + "'><p class='rating' >" + title + "</p></div>")
            $("#gif-container").append(gifCont);
        }

    });
};

// This function will create a new button append to our original array of buttons
// also will avoid the user to repeat the animal
function newButton(value) {
    var found = false;
    for (var i = 0; i < topics.length; i++) {
        if (topics[i] === value) {
            found = true;
        }
    }
    if (found) {
        alert("Repeated Animal");
    }
    else if (value == false) {
        alert("Oops! you should add an Animal");
    }
    else {
        topics.push(value);
        var addedButton = $("<input type='button'class='defined-button' value='" + value + "'></input>");
        $(".col-sm-12").append(addedButton);
    }
}

//This function will show up the first 10 gifs *but only the previews, I defined the click function to show the actual gif.
$(document).ready(function () {

    $('.col-sm-12').on('click', '.defined-button', function () {
        var button = $(this).val();
        selectedButton(button, 10);
    });

    $('#gif-container').on('click', '.searchresult', function () {

        var index = $(this).attr("listindex");
        var newurl = currentsearch[index].images.preview_gif.url;
        var oldurl = currentsearch[index].images.downsized_still.url;
        var still = currentsearch[index].still;
        if (still) {
            $(this).children("img").attr("src", newurl)
            currentsearch[index].still = false
        }
        else {
            $(this).children("img").attr("src", oldurl)
            currentsearch[index].still = true
        }
    });

    //I created this function to add and append the new buttons on the principal div with the other buttons
    for (var i = 0; i < topics.length; i++) {
        var temp = topics[i];

        var button = $("<input type='button' class='defined-button' value='" + temp + "'></input>");
        $(".col-sm-12").append(button).addClass('defined-button-new');
    }

    $("#submit-button").click(function () {
        var inputVal = $("#button-added").val();
        newButton(inputVal);
    });
});




