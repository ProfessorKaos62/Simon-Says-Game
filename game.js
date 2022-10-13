const buttonColors = ["red", "blue", "green", "yellow"];
let started = false;
let level = 0;

let gamePattern = [];
let userClickedPattern = [];

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    playSound(randomChosenColor);
    level++;
    $('#level-title').text(`Level ${level}`)
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
}

$('.btn').on('click', function() {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    console.log(userClickedPattern);

    let activeButton = document.querySelector("#" + userChosenColor);
    activeButton.classList.add("pressed");

    setTimeout(function() {
        activeButton.classList.remove("pressed");
       }, 100);

    checkAnswer(userClickedPattern.length - 1);

});

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

$('.btn').on('click', function() {
    if (started === false) {
        $('#level-title').text('The Game Hasn\'t Started Yet, Click Restart');
    }
});

$(document).keydown(function() {
    if (started === false) {
    nextSequence();
    started = true;
    }
});

$('#restart-button').on('click', function() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $('#restart-button').removeClass('restart-button');
    $('#level-title').text('Press A Key To Start');
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000);

            userClickedPattern = [];
        }
    }
    else {
        let wrongAudio = new Audio(`sounds/wrong.mp3`);
        wrongAudio.play();

        $('body').addClass('game-over');

        setTimeout(function() {
            $('body').removeClass('game-over');
           }, 200);

        $('h1').text('Game Over, Press Restart to play');
            
        $('#restart-button').addClass('restart-button');
        
    }
};

$('#restart-button').on('click', function() {
    $('#restart-button').addClass('pressed');

    setTimeout(function() {
        $('#restart-button').removeClass('pressed');
    }, 100);
});
