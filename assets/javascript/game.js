//game object
var game = {
    opponentCount: 0,
    character: {
        name: "",
        hp: 0,
        ap: 0,
        bap: 0,
        cp: 0
    },
    opponent: {
        name: "",
        hp: 0,
        ap: 0,
        bap: 0,
        cp: 0
    },
    obi: {
        name: "Obi-Wan Kenobi",
        hp: 120,
        ap: 10,
        bap: 10,
        cp: 14
    }, 
    luke : {
        name: "Luke Skywalker",
        hp: 100,
        ap: 5,
        bap: 5,
        cp: 7
    },
    sid: {
        name: "Darth Sidious",
        hp: 150,
        ap: 15,
        bap: 15,
        cp: 20
    },
    maul: {
        name: "Darth Maul",
        hp: 180,
        ap: 20,
        bap: 20,
        cp: 25
    },
    //game functions
    initialize: function(){
        //only need to set the character and opponents here! :)
        this.character.hp = 0;
        this.character.ap = 0;
        this.opponent.hp = 0;

    },
    chooseCharacters: function(cid){
        //if character has not been chosen, assign character
        //to the one that was clicked on and return "character"
        if(this.character.hp == 0){
            this.character.hp = this[cid].hp;
            this.character.ap = this[cid].ap;
            this.character.cp = this[cid].cp;
            this.character.bap = this[cid].bap;
            this.character.name = this[cid].name;
            return "character";
        //if opponent has not been chosen assign the opponent to 
        //the one that was clicked and return "opponent"
        } else if(this.opponent.hp == 0){
            this.opponent.hp = this[cid].hp;
            this.opponent.ap = this[cid].ap;
            this.opponent.cp = this[cid].cp;
            this.opponent.name = this[cid].name;            
            return "opponent";
        }
        //return null if neither opponent or character hp is zero 
        //they have been assigned
        return null;
    },
    attack: function(){  
        //change hp of opponent
        this.opponent.hp = (this.opponent.hp - this.character.ap);
        this.character.hp = (this.character.hp - this.opponent.cp);
        this.character.ap += this.character.bap;
    }
};   

$(".btn-attack").on("click", function(){
    // thsi is where the write I update the html
    var enemiesLeft = $(".enemy-section .character").length;
    opponentCount = $(".opponent-section .character").length;
    // update displayed health of players
    if(game.character.hp <= 0){        
        $("#message").html("You lost!!! Try again!");
        $("button").prop("disabled", true);
        //I can't get the reset to work right! This is where I would clear
        //out all of the variables but I haven't figured out how to get back
        //my "removed" html elements :(
        //reset();
    }else if(enemiesLeft == 0 && opponentCount == 0){
        $("#message").html("You won!");
    }else if(enemiesLeft != 0 && opponentCount == 0){
        $("#message").html("Choose an enemy to battle");
    }
    else if(game.opponent.hp <= 0 && opponentCount > 0){
        //alert("You defeated " + game.opponent.name);
        $("#opponent .character").remove();
        game.opponent.hp = 0;
        $("#message").html("You defeated " + game.opponent.name + ". Select another opponent");
        console.log("Enemies left " + enemiesLeft);

    }else{
        //this game.attack() is not in the right place. You can go into negative. I
        //couln't figure out where else to put it
        game.attack();
        $("#selected-character .hp").html(game.character.hp);
        $("#opponent .hp").html(game.opponent.hp);
        $("#message").html("   You attacked " + game.opponent.name + " for " + game.character.ap + " damage. " +
            "<br>   " + game.opponent.name + " attacked you back for " + game.opponent.cp);
    }
    
    console.log("char hp " + game.character.hp);
    console.log("opponent hp " + game.opponent.hp);     

});

$(".character").on("click", function(){
    // update display after character has been chosen
    //pass the ID to the character funciton and return character or opponent or null
    var set = game.chooseCharacters(this.id);
    console.log("set " + set);
    // then update your display
    if (set == "character") {
        $("#selected-character").append($(this));
        $(".enemy-section").append($("#characters"))

        console.log("selected character " + this.id);        
    } else if(set == "opponent"){
        $("#opponent").append($(this));
        $("button").prop("disabled", false);
        // $("button").show();
        console.log("selected opponent " + this.id);
    }
});


$(document).ready(function(){
//call reset funciton when the dom elements are loaded
reset();

});

function reset(){
    //initialize the variables when the program starts
    game.initialize();
    $("button").prop("disabled", true);
    $("#luke").data("hp",game.luke.hp).find(".hp").html(game.luke.hp);
    $("#obi").data("hp",game.obi.hp).find(".hp").html(game.obi.hp);
    $("#sid").data("hp",game.sid.hp).find(".hp").html(game.sid.hp);
    $("#maul").data("hp",game.maul.hp).find(".hp").html(game.maul.hp);
    // $("button").hide();
}
