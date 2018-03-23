var keyword ="";
var searchResults;
var topics=[];

//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyC_HsCc08nxb6JP0CyGZq3CxIJrhKsbplU",
//     authDomain: "project-monarch-e3503.firebaseapp.com",
//     databaseURL: "https://project-monarch-e3503.firebaseio.com",
//     projectId: "project-monarch-e3503",
//     storageBucket: "project-monarch-e3503.appspot.com",
//     messagingSenderId: "181317180117"
//   };
//   firebase.initializeApp(config);

// var database = firebase.database();
// var userRef = database.ref();
// var newDataPoint = "";
// var user = "";
// var password = "";

// // Import Admin SDK
// // var admin = require("firebase-admin");

// // Get a databse reference to our blog
// // var db = admin.database();
// // var ref = db.ref("server/saving-data-fireblog");

// //   Get elements

// const txtEmail = document.getElementById('txtEmail');
// const txtPassword = document.getElementById('txtPassword');
// const btnLogin = document.getElementById('btnLogin');
// const btnSignUp = document.getElementById('btnSignUp');
// const btnLogout = document.getElementById('btnLogout');

// // Add login event
// btnLogin.addEventListener('click', e => {
//     // Get email and pass
//     const email = txtEmail.value;
//     const pass = txtPassword.value;
//     const auth = firebase.auth();

//     // Sign in
//     const promise = auth.signInWithEmailAndPassword(email, pass);
//     promise.catch(e => console.log(e.message));
// });

// // Add signup event
// btnSignUp,addEventListener('click', e => {
//     // Get email and pass
//     const email = txtEmail.value;
//     const pass = txtPassword.value;
//     const auth = firebase.auth();

//     // Sign in
//     const promise = auth.createUserWithEmailAndPassword(email, pass);
//     promise.catch(e => console.log(e.message));
// });

// btnLogout.addEventListener('click', e => {
//     firebase.auth().signOut();
// });

// function writeUserData(user, email) {
//     user = $("#txtEmail").val();
//     var userSep = user.split("@");
//     firebase.database().ref('users/' + userSep[0]).set({
//         password: password
//     })
// }

// // Add a realtime listener
// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if (firebaseUser) {
//         console.log(firebaseUser);
//         btnLogout.classList.remove('hide');
//         user = $("#txtEmail").val();
//         password = $("#txtPassword").val();

//         // newDataPoint = userRef.push({
//         //     name: user,
//         //     password: password,
//         // });
//         writeUserData();
//         // userRef.set({
//         //     user: user {
//         //         password: password}
//         //     }
//         // );

//         // var postId = userRef.getKey();
//         // console.log(postId)


//     }

//     else {
//         console.log('not logged in')
//         btnLogout.classList.add('hide');
//     }
// });

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_HsCc08nxb6JP0CyGZq3CxIJrhKsbplU",
    authDomain: "project-monarch-e3503.firebaseapp.com",
    databaseURL: "https://project-monarch-e3503.firebaseio.com",
    projectId: "project-monarch-e3503",
    storageBucket: "project-monarch-e3503.appspot.com",
    messagingSenderId: "181317180117"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var userRef = database.ref();
var newDataPoint = "";
var user = "";
var password = "";

// Import Admin SDK

// Get a database reference to our blog
// var db = admin.database();
// var ref = db.ref("server/saving-data-fireblog");

//   Get elements

const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

// Add login event
btnLogin.addEventListener('click', e => {
    // Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

// Add signup event
btnSignUp,addEventListener('click', e => {
    // Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
});

function writeUserData(user, email) {
    user = $("#txtEmail").val();
    var userSep = user.split("@");
    firebase.database().ref('users/' + userSep[0]).set({
        password: password
    })
}

// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
        user = $("#txtEmail").val();
        password = $("#txtPassword").val();

         newDataPoint = userRef.push({
             name: user,
             password: password,
         });
        writeUserData();
        userRef.set({
            user: user,
            password: password
            }
        );

        var postId = userRef.getKey();
        console.log(postId)


    }

    else {
        console.log('not logged in')
        btnLogout.classList.add('hide');
    }
});


  function doAjaxCall() {

    $("#videos-view").empty();
    $("#buttons").empty();

    var params = $.param({
        part: 'snippet, id',
        maxResults: '1',
        q: keyword,
        type: 'video',
        key: 'AIzaSyBbcLfQsPms45781ZJd_5pwv-V3sj6G9C0'
    });
    var url = "https://www.googleapis.com/youtube/v3/search?" + params;
    console.log(url);

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
        maxResults: '1',
        q: keyword,
        pageToken: token,
        type: 'video',
        key: 'AIzaSyBbcLfQsPms45781ZJd_5pwv-V3sj6G9C0'
    });
    var url = "https://www.googleapis.com/youtube/v3/search?" + params;
    console.log(url);

    q = $("#add-keyword").val();

    $.ajax({
      url: url,
      method: "GET"
    }).then(function(data) {

    var nextPageToken = data.nextPageToken;
    var prevPageToken = data.prevPageToken;


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
        maxResults: '1',
        q: keyword,
        pageToken: token,
        type: 'video',
        key: 'AIzaSyBbcLfQsPms45781ZJd_5pwv-V3sj6G9C0'
    });
    var url = "https://www.googleapis.com/youtube/v3/search?" + params;
    console.log(url);

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
    '<h3><a data-fancybox href="http://wwww.youtube.com/watch?v='+videoId+'">'+title+'</a></h3>' +
    // '<h3><a class="various fancybox fancybox.iframe" src="http://wwww.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
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
        '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" onclick="showNextPage();">Next Video</button></div>';
    }

    else {
        var buttonOutput = '<div class="button-container">"' +'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'" onclick="showPrevPage();">Prev Video</button>' + '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" onclick="showNextPage();">Next Video</button></div>'
    }

    return buttonOutput;
}

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



  // Event handlers when user clicks add GIF to add GIF.

  $(".input").keypress(function(event) {
    if (event.which == 13) {
    event.preventDefault();
    // This line grabs the input from the textbox
    keyword = $("#keyword-input").val().trim();
    topics.push(keyword)
    console.log(topics);


    // Initalizes function to immediately display the added button
    doAjaxCall();
    makeButtons();
    }
  });

  $(document).on("click", ".image-button", doAjaxCall);
