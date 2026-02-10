
//======== Global Variables ========//

let deck  = [];    // Full deck of cards
let playerHand = [];  // Player's hand of cards
let computerHand1 = []; // Computer 1's hand of cards   
let computerHand2 = []; // Computer 2's hand of cards
let computerHand3 = []; // Computer 3's hand of cards
let currentHand = null; // Current hand playing
let cards = []; // Cards played in the current round
let chances = [];  // Order of hands playing in the current round
let usedCards = []; // Cards that have been played
let round = 1;  // Current round number
let winnerHand = null; // Hand that won the current round
let playerScore = 0;    // Player's score
let computer1Score = 0; // Computer 1's score
let computer2Score = 0; // Computer 2's score
let computer3Score = 0; // Computer 3's score
let tricks = [];        // Tricks played in the game

// ======= Frontend Variables =======//
const computerHand1Card = document.getElementById('computerHand1Card');
const computerHand2Card = document.getElementById('computerHand2Card');
const computerHand3Card = document.getElementById('computerHand3Card');
const playerHandStyle = document.getElementById('playerHand');
const decisionBox = document.getElementById('decisionBox');
const decisionText = document.getElementById('decisionText');
//======== Helper Functions ========//

//======== Deck Creation ========//

let createDeck = function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = [
        '2', '3', '4', '5', '6', '7', '8', '9', '10',
        'Jack', 'Queen', 'King', 'Ace'
    ];
    deck = []; 
    for(let i = 0; i < suits.length ; i++) {
        for(let j = 0; j < values.length; j++) {
            deck.push({suit: suits[i], value: values[j]});
        }
    }
    return deck;
}
createDeck();


//======== Shuffle Deck ========//

let shuffleDeck = function shuffleDeck(deck) {
    for(let i = deck.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j] ] = [deck[j], deck[i]];
    }
}
shuffleDeck(deck);

//======== Deal Cards ========//

let dealCard = function dealCard(deck) {
    return deck.pop();
}
let dealHands = function dealHands() {
    playerHand = [];
    computerHand1 = [];
    computerHand2 = [];
    computerHand3 = [];

    for(let i = 0; i < 13; i++) {
        playerHand.push(dealCard(deck));
        computerHand1.push(dealCard(deck));
        computerHand2.push(dealCard(deck));
        computerHand3.push(dealCard(deck));
    }
}
dealHands();
let deck1 = createDeck();


//======== Select Trump Suit ========//

let selectTrump = function selectTrump() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const randomIndex = Math.floor(Math.random() * suits.length);
    return suits[randomIndex];
}   
let trumpSuit = selectTrump();

console.log("Trump Suit: ", trumpSuit);

//======== Set Trump Card Info ========//

let setTrumpCard = function setTrumpCard(trumpSuit, playerHand, computerHand1, computerHand2, computerHand3 ) {
    for (let i = 0; i < 13; i++) {
        if (playerHand[i].suit === trumpSuit) {
            playerHand[i].isTrump = true;
        }
        else {
            playerHand[i].isTrump = false;
        }   
        if (computerHand1[i].suit === trumpSuit) {
            computerHand1[i].isTrump = true;
        }
        else {
            computerHand1[i].isTrump = false;
        }
        if (computerHand2[i].suit === trumpSuit) {
            computerHand2[i].isTrump = true;
        }
        else {
            computerHand2[i].isTrump = false;
        }
        if (computerHand3[i].suit === trumpSuit) {
            computerHand3[i].isTrump = true;
        }   
        else {
            computerHand3[i].isTrump = false;
        }
    }
     
}
setTrumpCard(trumpSuit, playerHand, computerHand1, computerHand2, computerHand3);
console.log("Player Hand with Trump Info: ", playerHand);
console.log("Computer Hand 1 with Trump Info: ", computerHand1);
console.log("Computer Hand 2 with Trump Info: ", computerHand2);
console.log("Computer Hand 3 with Trump Info: ", computerHand3);


//======== Ranking Cards ========//

let rankValues = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'Jack': 11,
    'Queen': 12,
    'King': 13,
    'Ace': 14
};

//======== Rotating Chances ========//

let firstchance = function firstchance(gameStart) {
    if (gameStart){
    let c = [computerHand1, computerHand2, computerHand3 , playerHand];
    let ran = Math.floor(Math.random() * 4);
    currentHand = c[ran];
    console.log("First Chance goes to: ", currentHand === playerHand ? "Player Hand" :
                currentHand === computerHand1 ? "Computer Hand 1" :
                currentHand === computerHand2 ? "Computer Hand 2" :
                "Computer Hand 3");
    return currentHand; 
    }
    else {
        return -1;
    }
}
let nextChance = function(currentHand) {
    if (currentHand === computerHand1) return computerHand2;
    if (currentHand === computerHand2) return computerHand3;
    if (currentHand === computerHand3) return playerHand;
    return computerHand1;
}


//======== Check Winner of the Round ========//

let checkWinner = function checkWinner(cards) {
    let winningCard = cards[0]; 
    for (let i = 1; i < cards.length; i++) {
        if (cards[i].isTrump && !winningCard.isTrump) {
            winningCard = cards[i]; 
        } else if (cards[i].isTrump === winningCard.isTrump) {
            if (cards[i].suit === winningCard.suit){
                if (rankValues[cards[i].value] > rankValues[winningCard.value]) {
                    winningCard = cards[i]; 
                }    
            }
   
        }
    }
    return winningCard;
}

//======== Check Trump Used in This Round ========//

let isTrumpCardUsed = function isTrumpCardUsed() {
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].suit === trumpSuit) {
            return true;
        }
    }
    return false;
}

//======== Highest Card Present in Round ========//

let highestCardPresentInRound = function highestCardPresentInRound(){
    let highestCard =  cards[0];
    if (cards.length === 0){
        return null;
    }
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].isTrump && !highestCard.isTrump) {
            highestCard = cards[i];
        }
        else if (cards[i].isTrump === highestCard.isTrump){
            if (cards[i].suit === highestCard.suit){
                if (rankValues[cards[i].value] > rankValues[highestCard.value]) {
                    highestCard = cards[i];
                }
            }
        }
    }
    //console.log("Highest Card in Round: ", highestCard);
    return highestCard;
}

//======== Check Trump Left in Hand ========//

let isTrumpLeftInHand = function isTrumpLeftInHand(currentHand){
    for (let i = 0; i < currentHand.length; i++) {
        if (currentHand[i].isTrump) {
            return true;
        }
    }
    return false;
}

//======== Check Current Suit Left in Hand ========//

let isCurrentSuitInHand = function isCurrentSuitInHand(currentHand , cards){
    if (cards.length === 0){
        return false;
    }
    for (let i = 0; i < currentHand.length; i++) {
        if (currentHand[i].suit === cards[0].suit) {
            return true;
        }
    }   
    return false;
}

//======== Enter Trick Details ========//
 
let enterTrick = function enterTrick(){
    let trick =
        {
            currentSuit : cards[0].suit,
            player1suit : cards[0].suit,
            player2suit : cards[1].suit,
            player3suit : cards[2].suit,
            player4suit : cards[3].suit,
            player1 : chances[0],
            player2 : chances[1],
            player3 : chances[2],
            player4 : chances[3],
        };
    
    tricks.push(trick);
}

//======== Check if Trump Used in This Suit Before ========//

let isTrumpUsedInThisSuitBefore = function isTrumpUsedInThisSuitBefore(card){
    for (let i = 0; i < tricks.length; i++) {
        if (tricks[i].currentSuit === card.suit) {
            if(tricks[i].player1suit === trumpSuit ){
                return tricks[i].player1;
            }
            else if(tricks[i].player2suit === trumpSuit ){
                return tricks[i].player2;
            }   
            else if(tricks[i].player3suit === trumpSuit ){
                return tricks[i].player3;
            }
            else if(tricks[i].player4suit === trumpSuit ){
                return tricks[i].player4;   
            }
        }
    }
    console.log("Not used");
    return null;
    
} 


function isCardLegal(card, hand, cards) {

    // If player is leading → any card allowed
    if (cards.length === 0) return true;

    const leadSuit = cards[0].suit;

    // Check if player has lead suit
    const hasLeadSuit = hand.some(c => c.suit === leadSuit);

    // If player has lead suit → must follow suit
    if (hasLeadSuit) {
        return card.suit === leadSuit;
    }

    // Otherwise → any card allowed
    return true;
}


//======== Highest Card Left on Deck in the Suit ========//

function highestCardLeftOnDeckInTheSuit(card) {
    
    if (!card) {
        return null;
    }   

    const remainingCards = deck1.filter(d => d.suit === card.suit &&!usedCards.some(u => u.suit === d.suit && u.value === d.value)&&!currentHand.some(c => c.suit === d.suit && c.value === d.value));


    if (remainingCards.length === 0) {
        return null;
    }

    let maxCard = remainingCards.reduce((max, c) => rankValues[c.value] > rankValues[max.value] ? c : max);
    return maxCard;
}

//======== Calculate Scores ========//

let calculateScores = function calculateScores(){
    if (winnerHand === playerHand){
        playerScore ++;
    }   
    else if (winnerHand === computerHand1){
        computer1Score ++ ;
    }
    else if (winnerHand === computerHand2){
        computer2Score ++ ;
    }
    else if (winnerHand === computerHand3){
        computer3Score ++;
    }
    console.log("Scores:");
    console.log("Player Score: ", playerScore);
    console.log("Computer 1 Score: ", computer1Score);
    console.log("Computer 2 Score: ", computer2Score);
    console.log("Computer 3 Score: ", computer3Score);
}

//======== Main Game Logic ========//

//======== Play Card Logic (For Round 1) ========//

let playCard = function playCard(cards , currentHand , round){
    if (!currentHand || currentHand.length === 0) {
        return null;
    }
    let bestCard = currentHand[0];
    let highestCardInRound = highestCardPresentInRound(cards);
    let isTrumpLeft = isTrumpLeftInHand(currentHand);
    //console.log("Is Trump Left in Hand: ", isTrumpLeft);
    let isCurrentSuitLeft = isCurrentSuitInHand(currentHand , cards);
    //console.log("Is Current Suit Left in Hand: ", isCurrentSuitLeft);
    let trumpCardUsed = isTrumpCardUsed();
    let highestCardInSuit = highestCardLeftOnDeckInTheSuit(cards[0]);
    console.log("Highest Card Left on Deck in the Suit: ", highestCardInSuit); 

    if (round === 1){
        if (cards.length === 0){
            for (let i = 0; i < currentHand.length; i++){
                if(currentHand[i].isTrump && !bestCard.isTrump){
                    if (rankValues[currentHand[i].value] === 14){
                        bestCard = currentHand[i];
                        return bestCard;
                    }
                } 
                else if (currentHand[i].isTrump === bestCard.isTrump && rankValues[currentHand[i].value] === 14){
                        bestCard = currentHand[i];
                        return bestCard;
                }
                else {
                    if (currentHand[i].suit !== trumpSuit){
                        if (!bestCard || rankValues[currentHand[i].value] < rankValues[bestCard.value]) {
                            bestCard = currentHand[i];
                        }
                    }
                }
            }
            return bestCard;
        }
        else{
            for (let i = 0; i < currentHand.length; i++) {
               if(isCurrentSuitLeft){
                    if((rankValues[highestCardInRound.value] === 14 )||(highestCardInRound.isTrump && !cards[0].isTrump)){
                        if(rankValues[currentHand[i].value] < rankValues[bestCard.value] && currentHand[i].suit === cards[0].suit) {
                                bestCard = currentHand[i];
                        }
                    }
                    else if (currentHand[i].suit === cards[0].suit || bestCard.suit !== cards[0].suit) {
                        if (rankValues[currentHand[i].value] > rankValues[highestCardInRound.value]){
                            if(rankValues[currentHand[i].value] === 14){
                                bestCard = currentHand[i];      
                                return bestCard;
                            }
                            else if(rankValues[currentHand[i].value] > rankValues[highestCardInRound.value] && rankValues[currentHand[i].value] >= rankValues[highestCardInSuit.value]){
                                bestCard = currentHand[i];
                                return bestCard;
                            }
                            else if(rankValues[currentHand[i].value] > rankValues[highestCardInRound.value] && rankValues[currentHand[i].value] <= rankValues[highestCardInSuit.value]){
                                if(rankValues[highestCardInRound.value] < 5){
                                    if(rankValues[currentHand[i].value] > rankValues[highestCardInRound.value] && (rankValues[currentHand[i].value] === 12 ||rankValues[currentHand[i].value] === 11 || rankValues[currentHand[i].value] === 10 )){
                                        bestCard = currentHand[i];
                                    }
                                    else if (rankValues[currentHand[i].value] > rankValues[highestCardInRound.value] && (rankValues[currentHand[i].value] < 10 )){
                                        bestCard = currentHand[i];
                                    }
                                }
                            }
                        }
                        else{
                            if(rankValues[currentHand[i].value] < rankValues[bestCard.value] && currentHand[i].suit === cards[0].suit) {
                                bestCard = currentHand[i];
                            }
                        }
                    }
                }
                else{                    
                    if (isTrumpLeft){
                        if(highestCardInRound.suit ===  trumpSuit && currentHand[i].suit === trumpSuit ){
                            if(rankValues[currentHand[i].value] > rankValues[highestCardInRound.value]){
                                if(rankValues[currentHand[i].value] < rankValues[bestCard.value] && bestCard.suit === trumpSuit){
                                    bestCard = currentHand[i];
                                }
                                else if (rankValues[currentHand[i].value] > rankValues[bestCard.value] && bestCard.suit === trumpSuit){
                                    bestCard = bestCard;
                                }
                                else{
                                    bestCard = currentHand[i];
                                }
                            }
                            else{
                                if(rankValues[currentHand[i].value] < rankValues[bestCard.value] && bestCard.suit === trumpSuit ){
                                    bestCard = currentHand[i];  
                                }
                                else{
                                    bestCard = currentHand[i];
                                }
                            }
                        }
                        else if(highestCardInRound.suit !==  trumpSuit && currentHand[i].suit === trumpSuit){
                            if(bestCard.suit === trumpSuit && rankValues[currentHand[i].value] < rankValues[bestCard.value]){
                                bestCard = currentHand[i];
                            }
                            else{
                                bestCard = currentHand[i];
                            }
                        }      
                    }
                    else{
                        if (!bestCard || rankValues[currentHand[i].value] < rankValues[bestCard.value]) {
                            bestCard = currentHand[i];
                        }
                    }
                }
            }
        }
        return bestCard;
    }
    else{
        if (cards.length === 0){
            bestCard = playLead();
        }
        else {
            bestCard = playFollowing();
        }
        return bestCard;
    }
}

//======= Following Card Play Logic ========//

let playFollowing = function playFollowing(){
    let highestCardInRound = highestCardPresentInRound(cards);

    if (!cards || cards.length === 0) return null;

    let highestCardInSuit = highestCardLeftOnDeckInTheSuit(cards[0]);
    let bestCard = null;

    const usefulCards = currentHand.filter( c => c.suit === cards[0].suit );
    const trumpCards = currentHand.filter( c => c.suit === trumpSuit );
    const cardsLeft = currentHand.filter(c => c.suit !== cards[0].suit && c.suit !== trumpSuit);
    if(usefulCards.length > 0){
        bestCard = usefulCards[0];
        for (let i = 0 ; i < usefulCards.length ; i++){
            if (rankValues[usefulCards[i].value] > rankValues[highestCardInRound.value] && rankValues[usefulCards[i].value] > rankValues[highestCardInSuit.value]&& rankValues[usefulCards[i].value] >= rankValues[highestCardInSuit.value]){
                bestCard = usefulCards[i];
            }
            else if (rankValues[usefulCards[i].value] > rankValues[highestCardInRound.value] && rankValues[usefulCards[i].value] < rankValues[highestCardInSuit.value]){
                if(rankValues[highestCardInRound.value] < 5){
                    if(rankValues[usefulCards[i].value] > rankValues[highestCardInRound.value] && (rankValues[usefulCards[i].value] === 12 ||rankValues[usefulCards[i].value] === 11 || rankValues[usefulCards[i].value] === 10 )){
                        bestCard = usefulCards[i];
                    }
                    else if (rankValues[usefulCards[i].value] > rankValues[highestCardInRound.value] && (rankValues[usefulCards[i].value] < 10 )){
                        bestCard = usefulCards[i];
                    }
                }
            }
            else if(highestCardInSuit &&rankValues[bestCard.value] < rankValues[highestCardInRound.value] && rankValues[bestCard.value] < rankValues[highestCardInSuit.value] && rankValues[bestCard.value] < rankValues[usefulCards[i].value]){
                bestCard = usefulCards[i];
            }

        }
        return bestCard;
    }
    else {
        if(trumpCards.length > 0){
            bestCard = trumpCards[0];
            for(let i = 0 ; i < trumpCards.length ; i++){
                if (highestCardInRound.suit !== trumpSuit){
                    if(rankValues[trumpCards[i].value] < rankValues[bestCard.value]){
                        bestCard = trumpCards[i];
                    }
                }
                else if(highestCardInRound.suit === trumpSuit){
                    if(rankValues[trumpCards[i].value] > rankValues[highestCardInRound.value]){
                        bestCard = trumpCards[i];
                    }
                    else{
                        if(rankValues[trumpCards[i].value] < rankValues[bestCard.value]){
                            bestCard = trumpCards[i];
                        }
                    } 
                }
            }
        }
        else{
            bestCard = cardsLeft[0];
            for(let i = 0 ; i < cardsLeft.length ; i++){
                if(rankValues[cardsLeft[i].value] < rankValues[bestCard.value]){
                    bestCard = cardsLeft[i] ;
                }
            }
        }
    }
    return bestCard;
}

//======= Leading Card Play Logic ========//

let playLead = function playLead(){
    if (!currentHand || currentHand.length === 0) return null;
    let bestCard = currentHand[0];  
    const nonTrumpCards = currentHand.filter( c => c.suit !== trumpSuit );
    const trumpCards = currentHand.filter( c => c.suit === trumpSuit );
    for (let i = 0 ; i < currentHand.length ; i++){
        let highestCardInSuit = highestCardLeftOnDeckInTheSuit(currentHand[i]);
        if (highestCardInSuit &&rankValues[currentHand[i].value] < rankValues[highestCardInSuit.value]){
            bestCard = currentHand[i];
        }
    else {
        if (!bestCard || rankValues[currentHand[i].value] < rankValues[bestCard.value]) {
            bestCard = currentHand[i];
        }
    }

    } 
    return bestCard;
}

//===========Frontend Functions===========//

let getImageURL = function getImageURL(hand) {

    return `cardsPic/${hand.suit}${rankValues[hand.value]}.jpeg`;

}
console.log("Image URL for a card: ", getImageURL(playerHand[0]));

let setPlayerHandImage = function () {

    for (let i = 0; i < 13; i++) {

        let cardElement = document.getElementById(`card${i+1}`);

        if (playerHand[i]) {

            cardElement.style.display = "block";
            cardElement.style.backgroundImage =
                `url(${getImageURL(playerHand[i])})`;

            cardElement.dataset.index = i;

            // reset styles
            cardElement.style.position = "";
            cardElement.style.left = "";
            cardElement.style.top = "";
            cardElement.style.zIndex = "";
            cardElement.style.animation = "";
            cardElement.style.transform = "";
            cardElement.style.opacity = "1";
        }
        else {

            cardElement.style.display = "none";

        }
    }
}

async function loadUserData(){

    try{

        const res = await fetch("/get-user");

        if(!res.ok){
            window.location.href = "/";
            return;
        }

        const data = await res.json();

        // username
        document.getElementById("playerName").innerText = data.username;

        // avatar
        const avatar = document.getElementById("playerAvatar");

        if(data.avatar){
            avatar.src = "avatars/" + data.avatar;
            playerHandStyle.style.backgroundImage = `url(avatars/${data.avatar})`;
        }
        else{
            avatar.src = "avatars/default.png";
            playerHandStyle.style.backgroundImage = `url(avatars/default.png)`;
        }

    }
    catch(error){
        console.error("Failed to load user data", error);
    }
}

// run when page loads
loadUserData();

async function showDecisionMessage(message, duration = 2000) {

    decisionBox.style.display = "block";
    decisionText.innerText = message;

    return new Promise(resolve => {
        setTimeout(() => {
            decisionBox.style.display = "none";
            resolve();
        }, duration);
    });
}

function showFinalDecision(message){

    decisionBox.style.display = "block";
    decisionText.innerHTML = `
        <h2>${message}</h2>
        <br>
        <button id="backLobbyBtn">Back To Lobby</button>
    `;

    document.getElementById("backLobbyBtn")
        .addEventListener("click", () => {
            window.location.href = "/lobby";
        });
}

//==========

let playerPlayedElement = null;
function playerHandMove() {
    return new Promise(resolve => {

        const playerCards = document.querySelectorAll('.crd');

        function handleClick(e) {

            const clickedCard = e.currentTarget;
            playerPlayedElement = clickedCard;


            const index = parseInt(clickedCard.dataset.index);

            if (isNaN(index) || !playerHand[index]) return;

            // ⭐ store played slot
      

            const playedCard = playerHand[index];

            // disable all cards
            playerCards.forEach(card => {

                const index = parseInt(card.dataset.index);

                if (isNaN(index) || !playerHand[index]) return;

                const cardData = playerHand[index];

                if (isCardLegal(cardData, playerHand, cards)) {

                    card.style.pointerEvents = 'auto';
                    card.style.opacity = "1";
                    card.addEventListener('click', handleClick);

                } else {

                    card.style.pointerEvents = 'none';
                    card.style.opacity = "0.4";   // visual illegal move indicator
                }
            });


            

            resolve(playedCard);
        }

        playerCards.forEach(card => {
            card.style.pointerEvents = 'auto';
            card.addEventListener('click', handleClick);
        });

    });
}


async function saveGameResult(){

    const res = await fetch("/save-game-result", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
            playerScore: playerScore,
            computerScores:[
                computer1Score,
                computer2Score,
                computer3Score
            ]
        })
    });

    const data = await res.json();
    console.log(data);
}





//=========

let handleFrontendPlayCard = function handleFrontendPlayCard(playedCard) {
    return new Promise(resolve => {

        if (currentHand === computerHand1) {
            computerHand1Card.style.display = "block";
            computerHand1Card.style.backgroundImage = `url(${getImageURL(playedCard)})`;
            computerHand1Card.style.animation = "none";
            computerHand1Card.offsetHeight;
            computerHand1Card.style.animation =`dealCard1 1.9s cubic-bezier(.25,.8,.25,1) forwards`;
            computerHand1Card.addEventListener("animationend", function handler() {
            computerHand1Card.removeEventListener("animationend", handler);
            resolve();
            });
        }
        else if (currentHand === computerHand2) {
            computerHand2Card.style.display = "block";
            computerHand2Card.style.backgroundImage = `url(${getImageURL(playedCard)})`;
            computerHand2Card.style.animation = "none";
            computerHand2Card.offsetHeight;
            computerHand2Card.style.animation =`dealCard2 1.9s cubic-bezier(.25,.8,.25,1) forwards`;
            computerHand2Card.addEventListener("animationend", function handler() {
            computerHand2Card.removeEventListener("animationend", handler);
            resolve();
            });
        }
        else if (currentHand === computerHand3) {
            computerHand3Card.style.display = "block";
            computerHand3Card.style.backgroundImage = `url(${getImageURL(playedCard)})`;
            computerHand3Card.style.animation = "none";
            computerHand3Card.offsetHeight;
            computerHand3Card.style.animation =`dealCard3 1.9s cubic-bezier(.25,.8,.25,1) forwards`;
            computerHand3Card.addEventListener("animationend", function handler() {
            computerHand3Card.removeEventListener("animationend", handler);
            resolve();
            });
        }
    else if(currentHand === playerHand){

        const clickedCard = playerPlayedElement;

        const table = document.getElementById("table");

        const cardRect = clickedCard.getBoundingClientRect();
        const tableRect = table.getBoundingClientRect();

        clickedCard.style.position = "fixed";
        clickedCard.style.left = `${cardRect.left}px`;
        clickedCard.style.top = `${cardRect.top}px`;
        clickedCard.style.margin = "0";
        clickedCard.style.zIndex = "9999";

        const tx = tableRect.left + tableRect.width / 1.2 -
                (cardRect.left + cardRect.width / 8);

        const ty = tableRect.top + tableRect.height / 1.1 -
                (cardRect.top + cardRect.height / 4);
        
        clickedCard.style.transform = "none";
        clickedCard.style.setProperty('--tx', `${tx}px`);
        clickedCard.style.setProperty('--ty', `${ty}px`);

        clickedCard.style.animation =
            "dealCard 1.9s cubic-bezier(.25,.8,.25,1) forwards";

        clickedCard.addEventListener("animationend", function handler() {
            clickedCard.removeEventListener("animationend", handler);
            resolve();
        });
    }

        
    });

}
//======== Game Play ========//

async function game() {
    
    setPlayerHandImage();
    await showDecisionMessage("Game Starting...");
    currentHand = firstchance(true);  
    await showDecisionMessage(`Trump Suit: ${trumpSuit}`); 
    console.log(`\n--- Round  ---`);
    for (round = 1; round <= 13; round++) {
        console.log(`\n-- Turn ${round} --`);
        for (let turn = 0; turn < 4; turn++) {
            console.log("Turn:", currentHand === playerHand ? "Player Hand" :
                        currentHand === computerHand1 ? "Computer Hand 1" :
                        currentHand === computerHand2 ? "Computer Hand 2" :
                        "Computer Hand 3");
            chances.push(currentHand);
            let playedCard = null;
            if (currentHand === playerHand) {
                playedCard = await playerHandMove();
            }
            //makemove( currentHand , cards );
            else{
                playedCard = playCard(cards , currentHand , round);
                if (!playedCard) {
                    console.error("No card to play for:", currentHand);
                    return;
                }
            }
            await handleFrontendPlayCard(playedCard);
            let cardIndex = currentHand.findIndex(card => card.suit === playedCard.suit && card.value === playedCard.value);
            console.log(currentHand[cardIndex]);
            currentHand.splice(cardIndex, 1);
            //console.log("card length",cards.length);
            console.log("Played Card: ", playedCard);
            cards.push(playedCard);
            usedCards.push(playedCard);
            currentHand = nextChance(currentHand);
            
        }
        computerHand1Card.style.display = "none";
        computerHand2Card.style.display = "none";
        computerHand3Card.style.display = "none";

        if (playerPlayedElement) {
            playerPlayedElement.style.display = "none";
            playerPlayedElement = null;
        }
        setPlayerHandImage();
        let winningCard = checkWinner(cards);

        console.log("Winning Card of the Round: ", winningCard);
        enterTrick();
        let winnerIndex = cards.findIndex(card => card.suit === winningCard.suit && card.value === winningCard.value);
        winnerHand = chances[winnerIndex];  
        let winner = console.log("Winner Hand of the Round: ", winnerHand === playerHand ? "Player Hand" :
                    winnerHand === computerHand1 ? "Computer Hand 1" :
                    winnerHand === computerHand2 ? "Computer Hand 2" :  
                    "Computer Hand 3");
        await showDecisionMessage(`Round ${round} Winner: ${winnerHand === playerHand ? "Player" :
                    winnerHand === computerHand1 ? "Computer 1" :
                    winnerHand === computerHand2 ? "Computer 2" :  
                    "Computer 3"}`);
        currentHand = winnerHand;
        cards = [];
        chances = [];
        calculateScores();
        
    }
    
    let scores = [
    {name:"Player", score:playerScore},
    {name:"Computer 1", score:computer1Score},
    {name:"Computer 2", score:computer2Score},
    {name:"Computer 3", score:computer3Score}
    ];
    await saveGameResult();

    scores.sort((a,b)=>b.score-a.score);

    showFinalDecision(`🏆 Game Winner: ${scores[0].name}`);

    
}
game();





