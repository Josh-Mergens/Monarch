function recipeAPI () {

    var searchInput = $(this).attr("data-name");
    var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=lasagna" + searchInput;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response){
        console.log(response);
    }
)};