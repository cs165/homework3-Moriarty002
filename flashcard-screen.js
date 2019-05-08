// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement , QuestionName , Question , Condition) {
      this.containerElement = containerElement;
      this.toR=this.toR.bind(this);
      this.toL=this.toL.bind(this);

      this.QN=QuestionName;
      this.Q=Question;

      this.R=0;//number of right
      this.L=0;//number of left

      this.QR=document.querySelector('.correct');   // find the span
      this.QL=document.querySelector('.incorrect');

      this.QR.innerText=''+this.R+' ';
      this.QL.innerText=''+this.L+' ';

      this.ToNext=false;
      this.Array=null;// catch the question array,Condition==0 Array=null
      if (Condition===1 || Condition===3)
      {
          for (var i of FLASHCARD_DECKS)
          {
              if(i.title === QuestionName)
              {
                  //console.log(i.words);
                  this.Array = Object.assign({}, i.words); // To prevent "Shallow Copy"
              }
          }
      }
      else if(Condition===2)
      {
          this.Array=Question;
      }
      //console.log(Condition);
      //console.log(this.Array);
  }
  show() {
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    for(var i of Object.keys(this.Array))
    {
        const card = new Flashcard(flashcardContainer, i, this.Array[i]);
    }


    var card = document.querySelector('.flashcard-box');
    card.style.display='block';
    document.addEventListener('toL',this.toL);
    document.addEventListener('toR',this.toR);

    //const card = new Flashcard(flashcardContainer, 'word', 'definition');
  }
  toR()
  {
      this.R++;
      this.QR.innerHTML=''+this.R+' ';
      this.ToNext=true;

      //remove right element in both DOM & Array
      var card = document.querySelector('.flashcard-box');
      var Index = card.querySelector('.flashcard');
      delete this.Array[Index.innerHTML];
      card.parentNode.removeChild(card);

      var card = document.querySelector('.flashcard-box');
      if(card===null)  //time to result
      {
          if(this.L != 0)
          {
              this.Q=this.Array;
          }
          document.removeEventListener('toL',this.toL);
          document.removeEventListener('toR',this.toR);
          let ShowResult = new CustomEvent('ShowResult',{detail:{
              R:this.R,
              L:this.L,
              QN:this.QN,
              Q:this.Q
          }});
          document.dispatchEvent(ShowResult);
          return;
      }
      card.style.display='block';
  }
  toL()
  {
      this.L++;
      this.QL.innerHTML=''+this.L+' ';
      this.ToNext=true;

      //remove right element in DOM , but not in Array
      var card = document.querySelector('.flashcard-box');
      card.parentNode.removeChild(card);

      var card = document.querySelector('.flashcard-box');
      if(card===null) //time to result
      {
          if(this.L != 0)
          {
              this.Q=this.Array;
          }
          document.removeEventListener('toL',this.toL);
          document.removeEventListener('toR',this.toR);
          let ShowResult = new CustomEvent('ShowResult',{detail:{
                  R:this.R,
                  L:this.L,
                  QN:this.QN,
                  Q:this.Q
              }});
          document.dispatchEvent(ShowResult);
          return;
      }
      card.style.display='block';
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
