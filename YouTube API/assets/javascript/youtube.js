var keyword ="";
var searchResults;


  function doAjaxCall() {
    
    $("#videos-view").empty();
    $("#buttons").empty();

    var params = $.param({
        part: 'snippet, id',
        maxResults: '10',
        q: keyword,
        type: 'video',    
        key: 'AIzaSyBbcLfQsPms45781ZJd_5pwv-V3sj6G9C0'
    });
    var url = "https://www.googleapis.com/youtube/v3/search?" + params;
    console.log(url);

    // var ytApiKey = "AIzaSyBbcLfQsPms45781ZJd_5pwv-V3sj6G9C0";
    // var itemId = "QwievZ1Tx-8"
    // var queryURL = 'https://www.googleapis.com/youtube/v3/videos?id=wievZ1Tx-8&key=AIzaSyBbcLfQsPms45781ZJd_5pwv-V3sj6G9C0&fields=items(snippet(channelId,title,categoryId))&part=snippet';
    // "https://www.googleapis.com/youtube/v3/search"
    
    // Creating an AJAX call for the specific GIF button being clicked

    q = $("#add-keyword").val();

    $.ajax({
      url: url,
      method: "GET"
    }).then(function(data) {

    var nextPageToken = data.nextPageToken;
    var prevPageToken = data.prevPageToken;

    
    // var ytVideos = JSON.parse(searchResults);
    
    console.log("Response length: " + data.items.length)
    
        $.each(data.items, function(i, item){ 

            var result = showVideos(item);

            $("#videos-view").append(result)
        });

        var buttons = showButtons(prevPageToken, nextPageToken);

        $("#buttons").append(buttons);

    });
  };

  function showPrevPage() {
    var token = $("#prev-button").data('token');
    var q = $('#prev-button').data('query');
    
    $("#videos-view").empty();
    $("#buttons").empty();

    var params = $.param({
        part: 'snippet, id',
        maxResults: '10',
        q: keyword,
        pageToken: token,
        type: 'video',    
        key: 'AIzaSyBbcLfQsPms45781ZJd_5pwv-V3sj6G9C0'
    });
    var url = "https://www.googleapis.com/youtube/v3/search?" + params;
    console.log(url);

    // var ytApiKey = "AIzaSyBbcLfQsPms45781ZJd_5pwv-V3sj6G9C0";
    // var itemId = "QwievZ1Tx-8"
    // var queryURL = 'https://www.googleapis.com/youtube/v3/videos?id=wievZ1Tx-8&key=AIzaSyBbcLfQsPms45781ZJd_5pwv-V3sj6G9C0&fields=items(snippet(channelId,title,categoryId))&part=snippet';
    // "https://www.googleapis.com/youtube/v3/search"
    
    // Creating an AJAX call for the specific GIF button being clicked

    q = $("#add-keyword").val();

    $.ajax({
      url: url,
      method: "GET"
    }).then(function(data) {

    var nextPageToken = data.nextPageToken;
    var prevPageToken = data.prevPageToken;

    
    // var ytVideos = JSON.parse(searchResults);
    
    console.log("Response length: " + data.items.length)
    
        $.each(data.items, function(i, item){ 

            var result = showVideos(item);

            $("#videos-view").append(result)
        });

        var buttons = showButtons(prevPageToken, nextPageToken);

        $("#buttons").append(buttons);

    });
};

function showNextPage() {
    var token = $("#next-button").data('token');
    var q = $('#next-button').data('query');
    
    $("#videos-view").empty();
    $("#buttons").empty();

    var params = $.param({
        part: 'snippet, id',
        maxResults: '10',
        q: keyword,
        pageToken: token,
        type: 'video',    
        key: 'AIzaSyBbcLfQsPms45781ZJd_5pwv-V3sj6G9C0'
    });
    var url = "https://www.googleapis.com/youtube/v3/search?" + params;
    console.log(url);

    // var ytApiKey = "AIzaSyBbcLfQsPms45781ZJd_5pwv-V3sj6G9C0";
    // var itemId = "QwievZ1Tx-8"
    // var queryURL = 'https://www.googleapis.com/youtube/v3/videos?id=wievZ1Tx-8&key=AIzaSyBbcLfQsPms45781ZJd_5pwv-V3sj6G9C0&fields=items(snippet(channelId,title,categoryId))&part=snippet';
    // "https://www.googleapis.com/youtube/v3/search"
    
    // Creating an AJAX call for the specific GIF button being clicked

    q = $("#add-keyword").val();

    $.ajax({
      url: url,
      method: "GET"
    }).then(function(data) {

    var nextPageToken = data.nextPageToken;
    var prevPageToken = data.prevPageToken;

    
    // var ytVideos = JSON.parse(searchResults);
    
    console.log("Response length: " + data.items.length)
    
        $.each(data.items, function(i, item){ 

            var result = showVideos(item);

            $("#videos-view").append(result)
        });

        var buttons = showButtons(prevPageToken, nextPageToken);

        $("#buttons").append(buttons);

    });
};

    // for (i=0; i < response.items.length; i++) {
    //     var newDiv = $("<div>");
    //     var vidTitle = $("<p>").text("Title: " + response.items[i].snippet.title);
    //     newDiv.append(vidTitle);
        
    //     var ytVideo = $("<iframe/>");
    //     ytVideo.attr({
    //         width: 560,
    //         height: 315,
    //         src: 'https://www.youtube.com/embed/' + response.items[i].id.videoId,
    //         frameborder: 0
        
    //     });
    //     newDiv.append(ytVideo);
    //     var vidDescription = $("<p>").text("Description: " + response.items[i].snippet.description);
    //     newDiv.append(vidDescription);
    //     $("#videos-view").append(newDiv)
    // }



function showVideos(item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var publishedAt = item.snippet.publishedAt;

    var result = '<li>' + 
    '<div class="list-left">' + 
    '<img src="'+thumb+'">' +
    '</div>' +
    '<div class="list-right">' +
    '<h3><a class="fancybox fancybox.iframe" href="http://wwww.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
    '<small>By <span class="cTitle">'+channelTitle+'</span> on '+publishedAt+'</small>' +
    '<p>'+description+'</p>' + 
    '</div>' +
    '</li>' + 
    '<div class="clearfix"></div>' + 
    '';

    return result;
}

function showButtons(prevPageToken, nextPageToken) {
    if (!prevPageToken) {
        var buttonOutput = '<div class="button-container">' +
        '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" onclick="showNextPage();">Next Page</button></div>';
    }

    else {
        var buttonOutput = '<div class="button-container">"' +'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'" onclick="showPrevPage();">Prev Page</button>' + '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" onclick="showNextPage();">Next Page</button></div>'
    }

    return buttonOutput;
}

    // var divVideos = $("<div>");
    // divVideos.attr({"id": "videos-div"});

    // for(i=0; i < response.items.length; i++) {
    //     var vidSource = "https://www.youtube.com/embed/" + response.items[i].id.videoId;
    //     var vidDescription = response.items[i].snippet.description;
    //     var vidTitle = response.items[i].snippet.title;
    //     console.log(vidSource)
    //     console.log(vidDescription)
    //     console.log(vidTitle)

    
        // var loadVideos = $("<iframe id='ytplayer' width='560' height='315' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>");
        // $("#ytplayer").attr({"src": vidSource})
        // $("#videos-view").append(loadVideos)
    // }

    // $("#videos-view").append(divVideos)

//     });

//   }
  // Function to create buttons that contain the categories that we'll search on the GIPHY API
//   function renderButtons() {

//     // Deletes what buttons was previously there and recreates all the buttons with any new buttons that were added
//     $("#buttons-view").empty();

//     // Looping through the array of GIFs
//     for (var i = 0; i < GIPHSarray.length; i++) {

//         var a = $("<button>");
//         // Adding a classes for buttons so it can be called with Jquery and styled with Bootstrap
//         a.addClass("GIPH-btn");
//         a.addClass("btn");
//         a.addClass("btn-default");
//         // Adding data attribute to each of the buttons based on the index of the element in the GIPHSarray
//         a.attr("data-name", GIPHSarray[i]);
//         // Providing the initial button text
//         a.text(GIPHSarray[i]);
//         // Adding buttons to the div
//         $("#buttons-view").append(a);
//         }

//     }


  // Event handlers when user clicks add GIF to add GIF.
  
  $("#add-keyword").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    keyword = $("#keyword-input").val().trim();

    // Initalizes function to immediately display the added button
    doAjaxCall();
  });