// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    var root = containerElement.querySelector("#choices");
    for(var i of FLASHCARD_DECKS)
    {
        let child = document.createElement("div");
        child.innerHTML=i.title;
        child.setAttribute('id','SelectOne');
        root.appendChild(child);
    }
    var children = document.querySelectorAll('#SelectOne');
    for (var i in FLASHCARD_DECKS)
    {
        children[i].addEventListener('click',this.choosen);
    }
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
  choosen(){
      let ChoiceOne = new CustomEvent('ChoiceOne',{detail:{type:this.innerHTML}})
      document.dispatchEvent(ChoiceOne);
  }
}
