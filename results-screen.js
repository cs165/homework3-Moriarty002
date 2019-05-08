// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement,R,L,QN) {
      this.ToFlash=this.ToFlash.bind(this);

    this.R=R;
    this.L=L;
    this.QN=QN;
    this.P=(R/(R+L))*100;

    //insert words to the screen
    let element = document.querySelector('.percent');
    element.innerHTML=''+parseFloat(this.P.toFixed(2))+' ';
    element=document.querySelectorAll('.correct');
      element[1].innerHTML=''+this.R+' ';
    element=document.querySelectorAll('.incorrect');
      element[1].innerHTML=''+this.L+' ';
    this.containerElement = containerElement;

    let elementA=document.querySelector('.continue');
    if(this.P === 100)
        elementA.innerHTML='Start over?';
    else
        elementA.innerHTML='continue';
    elementA.addEventListener('click',this.ToFlash);

    let elementB=document.querySelector('.to-menu');
    elementB.addEventListener('click',this.ToMenu);
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
  }
  hide() {
    this.containerElement.classList.add('inactive');
  }
  ToFlash()
  {
      console.log(this.QN);
      let BackFlash =new CustomEvent('BackFlash',{detail:{
          QN:this.QN
          }});
      document.dispatchEvent(BackFlash);
  }
  ToMenu()
  {
      let ToMenu =new CustomEvent('ToMenu');
      document.dispatchEvent(ToMenu);
  }
}
