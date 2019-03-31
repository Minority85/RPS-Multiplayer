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
var player1 = false;
var player2 = false;
var choice1;
var choice2;
var p1w = 0;
var p1l = 0;
var p2w = 0;
var p2l = 0;

database.ref().on("value", function (snapshot) {

    if (snapshot.child("player1").exists()) {
        // console.log(snapshot.child("player1").val().player1)
        $(".oneButton").attr("disabled", true);
    }
    else {
        $(".oneButton").attr("disabled", false);

        p1w = 0;
        p1l = 0;
        p2w = 0;
        p2l = 0;

        $(".win1").text("Win: " + p1w);
        $(".lose1").text("Lose: " + p1l);
        $(".win2").text("Win: " + p2w);
        $(".lose2").text("Lose: " + p2l);
    }

    if (snapshot.child("player2").exists()) {
        // console.log(snapshot.child("player2").val().player2)
        $(".twoButton").attr("disabled", true);
    }
    else {
        $(".twoButton").attr("disabled", false);

        p1w = 0;
        p1l = 0;
        p2w = 0;
        p2l = 0;

        $(".win1").text("Win: " + p1w);
        $(".lose1").text("Lose: " + p1l);
        $(".win2").text("Win: " + p2w);
        $(".lose2").text("Lose: " + p2l);
    }

    if (snapshot.child("choice1").exists() && snapshot.child("choice2").exists()) {

        choice1 = snapshot.child("choice1").val().player1;
        choice2 = snapshot.child("choice2").val().player2;

        database.ref('choice1/').remove();
        database.ref('choice2/').remove();

        resultQuery()
    }

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

function onStart() {

    var p1 = $("<button>").addClass("oneButton").addClass("playButton").addClass("btn").addClass("btn-primary").addClass("btn-lg")
        .text("Player 1").attr("value", "p1").attr("disabled", false);
    var p2 = $("<button>").addClass("twoButton").addClass("playButton").addClass("btn").addClass("btn-primary").addClass("btn-lg")
        .text("Player 2").attr("value", "p2").attr("disabled", false);
    var divWord = $("<div>").addClass("word");
    var word = $("<p>");
    var size = $("<h1>").text("OR");

    word.append(size);
    divWord.append(word);
    $("#playerOne").append(p1);
    $("#middle").append(divWord);
    $("#playerTwo").append(p2);
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

    if (playerCheck === "p1") {

        player1 = true;

        database.ref('player1/').set({
            player1: player1,
        });
    }
    else if (playerCheck === "p2") {

        player2 = true;

        database.ref('player2/').set({
            player2: player2,
        });
    }

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
        // console.log("rock");
        $(".rock").css("opacity", "1");
        $(".paper").css("opacity", "0.5");
        $(".scissors").css("opacity", "0.5");
        $(".submit").attr("value", "rock")
    }
    else if ($(this).hasClass("paper")) {
        // console.log("paper");
        $(".rock").css("opacity", "0.5");
        $(".paper").css("opacity", "1");
        $(".scissors").css("opacity", "0.5");
        $(".submit").attr("value", "paper")
    }
    else if ($(this).hasClass("scissors")) {
        // console.log("scissors")
        $(".rock").css("opacity", "0.5");
        $(".paper").css("opacity", "0.5");
        $(".scissors").css("opacity", "1");
        $(".submit").attr("value", "scissors")
    }
}

function choiceQuery() {

    var choice = $(this).val();

    if (player1) {
        database.ref('choice1/').set({
            player1: choice,
        });
    }
    else if (player2) {
        database.ref('choice2/').set({
            player2: choice,
        });
    }
    else {

    }
}

function resultQuery() {
    // console.log(choice1);
    // console.log(choice2);

    $(".score1").show();
    $(".score2").show();

    $("#middle").css('backgroundImage', "none");

    if (choice1 === "rock") {
        if (choice2 === "paper") {
            p1l++
            p2w++
            $(".win1").text("Win: " + p1w);
            $(".lose1").text("Lose: " + p1l);
            $(".win2").text("Win: " + p2w);
            $(".lose2").text("Lose: " + p2l);
            $("#bottom").text("Player 1 chose " + choice1 + " and Player 2 chose " + choice2);
        }
        else if (choice2 === "rock") {
            $("#bottom").text("Its a tie!");
        }
        else if (choice2 === "scissors") {
            p1w++
            p2l++
            $(".win1").text("Win: " + p1w);
            $(".lose1").text("Lose: " + p1l);
            $(".win2").text("Win: " + p2w);
            $(".lose2").text("Lose: " + p2l);
            $("#bottom").text("Player 1 chose " + choice1 + " and Player 2 chose " + choice2);
        }
    }
    else if (choice1 === "paper") {
        if (choice2 === "paper") {
            $("#bottom").text("Its a tie!");
        }
        else if (choice2 === "rock") {
            p1w++
            p2l++
            $(".win1").text("Win: " + p1w);
            $(".lose1").text("Lose: " + p1l);
            $(".win2").text("Win: " + p2w);
            $(".lose2").text("Lose: " + p2l);
            $("#bottom").text("Player 1 chose " + choice1 + " and Player 2 chose " + choice2);
        }
        else if (choice2 === "scissors") {
            p1l++
            p2w++
            $(".win1").text("Win: " + p1w);
            $(".lose1").text("Lose: " + p1l);
            $(".win2").text("Win: " + p2w);
            $(".lose2").text("Lose: " + p2l);
            $("#bottom").text("Player 1 chose " + choice1 + " and Player 2 chose " + choice2);
        }
    }
    else if (choice1 === "scissors") {
        if (choice2 === "paper") {
            p1w++
            p2l++
            $(".win1").text("Win: " + p1w);
            $(".lose1").text("Lose: " + p1l);
            $(".win2").text("Win: " + p2w);
            $(".lose2").text("Lose: " + p2l);
            $("#bottom").text("Player 1 chose " + choice1 + " and Player 2 chose " + choice2);
        }
        else if (choice2 === "rock") {
            p1l++
            p2w++
            $(".win1").text("Win: " + p1w);
            $(".lose1").text("Lose: " + p1l);
            $(".win2").text("Win: " + p2w);
            $(".lose2").text("Lose: " + p2l);
            $("#bottom").text("Player 1 chose " + choice1 + " and Player 2 chose " + choice2);
        }
        else if (choice2 === "scissors") {
            $("#bottom").text("Its a tie!");
        }
    }
}

function closeWindow() {

    if (player1) {
        database.ref('player1/').remove();
    }
    else if (player2) {
        database.ref('player2/').remove();
    }

}

$(document).on("click", ".submit", choiceQuery);
$(document).on("click", "#chosenOne", rpsQuery);
$(document).on("click", ".playButton", playerQuery);

onStart()
