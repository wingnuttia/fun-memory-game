// scritps.js

  const cards = document.querySelectorAll('.memory-card');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  function flipCard() {
   if (lockBoard) return;
   if (this === firstCard) return;
   
    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
   //hasFlippedCard = false;

    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
	resetBoard();
  }

  function unflipCards() {
     lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

     //lockBoard = false;
	 resetBoard();
    }, 1500);
  }
  
  function resetBoard() {
   [hasFlippedCard, lockBoard] = [false, false];
   [firstCard, secondCard] = [null, null];
 }

(function shuffle() {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 12);
     card.style.order = ramdomPos;
   });
 })();

  cards.forEach(card => card.addEventListener('click', flipCard));

  function resetGame() {
    // Reset variables
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  
    // Reset moves
    moves = 0;
    counter.innerHTML = moves;
  
    // Reset stars
    stars.forEach(star => {
      star.style.visibility = "visible";
    });
  
    // Stop and reset timer
    clearInterval(interval);
    second = 0; minute = 0; hour = 0;
    timer.innerHTML = "0 mins 0 secs";
  
    // Unflip all cards
    cards.forEach(card => {
      card.classList.remove('flip');
      card.addEventListener('click', flipCard);
    });
  
    // Shuffle cards
    setTimeout(() => {
      cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
      });
    }, 500); // give it a moment to unflip before shuffling
  }