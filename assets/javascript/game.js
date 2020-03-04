$(document).ready(function(){
    var myQuestions = [{     
                question: "What does Michael Scott’s mug say?",
                answers: ["Toby is the worst!" ,"Worlds Best Boss","The Office","I love Toby!"],
                correctAnswer: "Worlds Best Boss",
                photo: "assets/images/michael.gif"
            },{
                question: "What is the name of Jim and Pams child?",
                answers: ["Michael","Astrid","Phoebe","Cici"],
                correctAnswer: "Cici",
                photo: "assets/images/cici.gif"
            },{
                question: "Name Ryan’s online social networking site?",
                answers: ["He never made one","MrEntreprenuer.com","WUPHF.com","Isuck.com"],
                correctAnswer: "WUPHF.com",
                photo: "assets/images/wuphf.jpg"
            },{
                question: "Who attended anger management in season 3?",
                answers: ["Dwight","Andy","Kevin","Kelly"],
                correctAnswer: "Andy",
                photo: "assets/images/giphy.gif"
            },{
                question: "What is Toby the Thief of?",
                answers: ["Happiness","Joy","Life","Everything"],
                correctAnswer: "Joy",
                photo: "assets/images/joy.gif"
            },{
                question: "Where did Jim propose to Pam?",
                answers: ["The Office","Poor Richards","Outside of a Gas Station","In front of their home."],
                correctAnswer: "Outside of a Gas Station",
                photo: "assets/images/JPropose.gif"
            },{
                question: "Where did Holly & Michael move to?",
                answers: ["Colorado","California","Neither, They stayed in Scranton.", "Vegas"],
                correctAnswer: "Colorado",
                photo: "assets/images/HollyandMike.gif"
            },{
                question: "Who does Jim impersonate one day at the office for 11 dollars?",
                answers: ["Ryan","Michael","Stanley","Dwight"],
                correctAnswer: "Dwight",
                photo: "assets/images/jimdwight.gif"
            },{
                question: "What is Micheal proud of in his new condo?",
                answers: ["Jan","A very small Plasma screen TV","The Windows","The Webcam"],
                correctAnswer: "A very small Plasma screen TV",
                photo: "assets/images/michaelEmbarassed.gif"
            },{
                question: "What gift did Michael give Toby as a gift on his last day of work?",
                answers: ["A Rock","A slap in the face","A stick of broccoli","nothing"],
                correctAnswer: "A Rock",
                photo: "assets/images/pvvjk943p1g21.png"
            }];
    
    let time = 10;
    let currentQuestion = 0;
    let score = 0;
    let lost = 0;
    let timer;
    
    
    $("#game").hide();
    $("#timeLeft").hide();
    
    
    $('#start-btn').on('click', function(){
        $('#start-btn').hide();
        $('#game').show();
        $("#timeLeft").show();
    });
    
    function getNextQuestion () {
        var questionRunout = (myQuestions.length -1) === currentQuestion;
        if (questionRunout) {
            $("#game").text(messages[3]);
            $("#timeLeft").hide();
            getresults();
        } else {
            currentQuestion++;
            loadQuestion();
            $("#timeLeft").html("You Have " + time + " seconds remaining");
        }
    }
    
    function timeRunout () {
        clearInterval(timer);
        lost++;
        getNextQuestion();
    }
    
    function countDown () {
        time--;
        $("#timeLeft").html("You have " + time + " seconds remaining");
        if (time === 0)  {
            timeRunout ();
        }
    
    }
    function loadQuestion() {
        time = 10;
        $("#timeLeft").html("You have " + time + " seconds remaining");
        timer = setInterval(countDown, 1000);
        const question = myQuestions[currentQuestion].question;
        const answers = myQuestions[currentQuestion].answers;
        $("#game").html(`
            <h3>${question}</h3>
        ${loadAnswers(answers)}
        `);
    }
    
    function loadAnswers(answers) {
        let result = '';
        for (let i = 0; i < answers.length; i++) {
            result += `<button class="answers" data-answer="${answers[i]}">${answers[i]}</button>`
        }
        return result;
    }
    
    $(document).on('click', '.answers', function(){
        clearInterval(timer);
        var userChoice = $(this).attr("data-answer");
        var correctChoice = myQuestions[currentQuestion].correctAnswer;
        if (correctChoice === userChoice){
            score++;  
            getNextQuestion();
        } else {
            lost++;
            getNextQuestion();
            
        }
    });
    
    
    loadQuestion();
    
    
    function getresults () {
        var results = `
        <h3>You got ${score} questions right</h3>
        <h3>You got ${lost}  questions wrong</h3>
        <h3>Total questions ${myQuestions.length} answered</h3>
        <button class="reset">Reset Game</button>
        `;
        $('#game').html(results);
        $('.reset').on('click', function(){
            resetGame()
        })
    }
    
    function resetGame () {
        currentQuestion = 0;
        score = 0;
        lost = 0;
        loadQuestion();
        $("#timeLeft").show();
    }
    
    });