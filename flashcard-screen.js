// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement , QuestionName) {
      this.containerElement = containerElement;
      this.toR=this.toR.bind(this);
      this.toL=this.toL.bind(this);

      this.QN=QuestionName;

      this.R=0;//number of right
      this.L=0;//number of left

      this.QR=document.querySelector('.correct');   // find the span
      this.QL=document.querySelector('.incorrect');

      this.QR.innerText=''+this.R+' ';
      this.QL.innerText=''+this.L+' ';

      this.ToNext=false;

      this.Array=null;// catch the question array
      if (QuestionName != null)
      {
          for (var i of FLASHCARD_DECKS)
          {
              if(i.title === QuestionName)
              {
                  this.Array=i.words;
              }
          }
      }
      //console.log(this.Array);
  }
  show() {
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    for(var i of Object.keys(this.Array))
    {
        //console.log(i);
        //console.log(this.Array[i]);
        const card = new Flashcard(flashcardContainer, i, this.Array[i]);
        document.addEventListener('toL',this.toL);
        document.addEventListener('toR',this.toR);
    }
    //const card = new Flashcard(flashcardContainer, 'word', 'definition');
  }
  toR()
  {
      this.R++;
      this.QR.innerHTML=''+this.R+' ';
      this.ToNext=true;
  }
  toL()
  {
      this.L++;
      this.QL.innerHTML=''+this.L+' ';
      this.ToNext=true;
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
