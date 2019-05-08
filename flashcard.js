// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText) {
    this.containerElement = containerElement;

    this._flipCard = this._flipCard.bind(this);
      this.onDragEnd=this.onDragEnd.bind(this);
      this.onDragStart=this.onDragStart.bind(this);
      this.onDragMove=this.onDragMove.bind(this);

      this.originX = null;
      this.originY = null;
      this.offsetX = 0;
      this.offsetY = 0;
      this.translateX=0;
      this.translateY=0;
      this.dragStarted = false;
      this.changeColor = true;

      this.tmpR=-1;
      this.tmpL=-1;

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);
      this.flashcardElement.addEventListener('pointerdown', this.onDragStart);
      this.flashcardElement.addEventListener('pointerup', this.onDragEnd);
      this.flashcardElement.addEventListener('pointermove', this.onDragMove);

      this.flashcardElement.style.display='none';
  }
  onDragStart(event) {
        this.originX = event.clientX;
        this.originY = event.clientY;
        this.dragStarted = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        let elementR = document.querySelector('.correct');
        let elementL = document.querySelector('.incorrect');
        this.tmpR=parseFloat(elementR.innerHTML);
        this.tmpL=parseFloat(elementL.innerHTML);
  }
  onDragMove(event) {
        if (! this.dragStarted) {
            return;
        }
        event.preventDefault();
        event.currentTarget.style.transition='';//prevent previous transition
        const deltaX = event.clientX - this.originX;
        const deltaY = event.clientY - this.originY;
        this.translateX = this.offsetX + deltaX;
        this.translateY = this.offsetY + deltaY;
        event.currentTarget.style.transform = 'translate(' +
            this.translateX + 'px, ' + this.translateY + 'px) rotate( ' + this.translateX*0.2 + 'deg )';
        if(this.translateX >= 150)
        {
            document.body.style.backgroundColor='#97b7b7';
            let element = document.querySelector('.correct');
            element.innerHTML=''+(this.tmpR+1)+' ';
        }
        else if(this.translateX <= -150)
        {
            document.body.style.backgroundColor='#97b7b7';
            let element = document.querySelector('.incorrect');
            element.innerHTML=''+(this.tmpL+1)+' ';
        }
        else
        {
            document.body.style.backgroundColor='#d0e6df';
            let ER=document.querySelector('.correct');
            let EL=document.querySelector('.incorrect');
            ER.innerHTML=''+this.tmpR+' ';
            EL.innerHTML=''+this.tmpL+' ';
        }
      this.changeColor = false;

  }
  onDragEnd(event) {
        this.dragStarted = false;
        this.offsetX += event.clientX - this.originX;
        this.offsetY += event.clientY - this.originY;
      this.changeColor = true;
      document.body.style.backgroundColor='#d0e6df';
      if(this.translateX >= 150)
      {
            let toR = new CustomEvent('toR');
            document.dispatchEvent(toR);
      }
      else if(this.translateX <= -150)
      {
          let toL = new CustomEvent('toL');
          document.dispatchEvent(toL);
      }
      else
      {
          event.currentTarget.style.transform ='translate(0,0)';
          event.currentTarget.style.transitionDuration = "0.6s";
          this.originX = null;
          this.originY = null;
          this.offsetX = 0;
          this.offsetY = 0;
          this.translateX=0;
          this.translateY=0;
          let ER=document.querySelector('.correct');
          let EL=document.querySelector('.incorrect');
          ER.innerHTML=''+this.tmpR+' ';
          EL.innerHTML=''+this.tmpL+' ';
      }
  }


    // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">

  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    if(!this.changeColor)
        return;
    this.flashcardElement.classList.toggle('show-word');
  }

}
