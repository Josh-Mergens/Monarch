var keyword ="";
var ingredientArray = [];
var topics =[];

function displayApi() {

$("#displayRecipe").empty();

var recipeInput = keyword;
var corsProxy = "https://cors-anywhere.herokuapp.com/";
var baseURL = "http://api.yummly.com/v1/api/recipes?_app_id=87b4ae84&_app_key=1c317fe13d2c932506f2c1aab86f67b6&q=";
var queryURL =  corsProxy + baseURL + recipeInput;
var corsProxy = "https://cors-anywhere.herokuapp.com/";
console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
  console.log(response);

  var newDiv = $("<div>");
  newDiv.addClass("addedDiv");
  $("#displayRecipe").append(newDiv);
  

var recipeTitle = response.matches[0].recipeName;
console.log(recipeTitle);
newDiv.append("<h1>" + recipeTitle + "</h1>");

var ingredientArray = response.matches[0].ingredients;
console.log(ingredientArray);

var ingredientTitleString = "Ingredients";
newDiv.append("<h3>" + ingredientTitleString + "</h3>");

for (i = 0; i < ingredientArray.length; i++){
    var recipeIngredients = JSON.stringify(response.matches[0].ingredients[i]);
    recipeIngredients = recipeIngredients.replace('[',' ');
    recipeIngredients = recipeIngredients.replace(']',' ');
    recipeIngredients = recipeIngredients.replace(/["]+/g,' ');
    newDiv.append(recipeIngredients + "<br>");
    

}
console.log(recipeIngredients);
$("#displayRecipe").append(newDiv); 


});
};

function makeButtons() {
    $("#searchButtons").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $('<button>');
            a.addClass("image-button");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#searchButtons").append(a);
    }
}




$(".input").keypress(function(event) {
    if (event.which == 13) {
    event.preventDefault();
    // This line grabs the input from the textbox
    keyword = $("#keyword-input").val().trim();
    topics.push(keyword)
    // Initalizes function to immediately display the added button
    displayApi();
    makeButtons();
    }
  });

  $(document).on("click", ".image-button", displayApi);