var config = {
    apiKey: "AIzaSyAhp7-_uxEZG2GA0G5vqsz_AJuAl_CXEyw",
    authDomain: "rps-game-4259b.firebaseapp.com",
    databaseURL: "https://rps-game-4259b.firebaseio.com",
    projectId: "rps-game-4259b",
    storageBucket: "rps-game-4259b.appspot.com",
    messagingSenderId: "783121925183"
};

firebase.initializeApp(config);

var database = firebase.database();
var game = ["rock", "paper", "scissors"];
var check1 = false;

function onStart() {

    var p1 = $("<button>").addClass("oneButton").addClass("playButton").addClass("btn").addClass("btn-primary").addClass("btn-lg")
        .text("Player 1").attr("value", "p1");
    var p2 = $("<button>").addClass("twoButton").addClass("playButton").addClass("btn").addClass("btn-primary").addClass("btn-lg")
        .text("Player 2").attr("value", "p2");
    var divWord = $("<div>").addClass("word");
    var word = $("<p>");
    var size = $("<h1>").text("OR");

    word.append(size);
    divWord.append(word);
    $("#playerOne").append(p1);
    $("#middle").append(divWord);
    $("#playerTwo").append(p2);

    console.log("test")
}

function playerQuery() {

    var playerCheck = $(this).val();

    $(".oneButton").hide();
    $(".twoButton").hide();
    $(".word").hide();

    $("#middle").css('backgroundImage', "url(assets/images/bg.png)");

    var text1 = $("<p>").text("Player 1");
    var text2 = $("<p>").text("Player 2");
    $("#playerOne").append(text1);
    $("#playerTwo").append(text2);

    for (i = 0; i < game.length; i++) {

        var card = $("<div>").addClass("card").css("width", "18rem").addClass("mt-5").addClass("mb-5").attr("id", "chosenOne").addClass(game[i]);
        var card2 = $("<div>").addClass("card").css("width", "18rem").addClass("mt-5").addClass("mb-5").css("opacity", ".5");
        var image = $("<img>").addClass("card-img-top").addClass("color").attr("src", "assets/images/" + game[i] + ".png");
        var image2 = $("<img>").addClass("card-img-top").addClass("color").attr("src", "assets/images/" + game[i] + ".png");

        card.append(image);
        card2.append(image2);

        if (playerCheck === "p1") {

            $("#playerOne").append(card);

            $("#playerTwo").append(card2);
        }
        else if (playerCheck === "p2") {

            $("#playerTwo").append(card);

            $("#playerOne").append(card2);
        }
    }
}

function rpsQuery() {

    if (check1) {

    }
    else {
        var button = $("<button>").addClass("submit").addClass("btn").addClass("btn-primary").addClass("btn-lg").text("Submit");

        $("#middle").append(button);

        check1 = true;
    }

    if ($(this).hasClass("rock")) {
        console.log("rock");
        $(".rock").css("opacity", "1");
        $(".paper").css("opacity", "0.5");
        $(".scissors").css("opacity", "0.5");
        $(".color").addClass("test");
    }
    else if ($(this).hasClass("paper")) {
        console.log("paper");
        $(".rock").css("opacity", "0.5");
        $(".paper").css("opacity", "1");
        $(".scissors").css("opacity", "0.5");
    }
    else if ($(this).hasClass("scissors")) {
        console.log("scissors")
        $(".rock").css("opacity", "0.5");
        $(".paper").css("opacity", "0.5");
        $(".scissors").css("opacity", "1");
    }
}

$(document).on("click", "#chosenOne", rpsQuery);
$(document).on("click", ".playButton", playerQuery);

onStart()
