// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
      this.ToFlashCard = this.ToFlashCard.bind(this);
      this.BackFlashCard = this.BackFlashCard.bind(this);
      this.ToMenuScreen = this.ToMenuScreen.bind(this);
      this.ToResultScreen = this.ToResultScreen.bind(this);

    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement,1);
    document.addEventListener('ChoiceOne', this.ToFlashCard);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);
  }
  ToFlashCard(event)
  {
      //console.info(event.detail.valueOf().type);
      let mainElement = document.querySelector('#main');
      this.flashcards=new FlashcardScreen(mainElement,event.detail.valueOf().type);
      this.menu.hide();
      this.flashcards.show();
      document.removeEventListener('ChoiceOne', this.ToFlashCard);
      document.addEventListener('ShowResult', this.ToResultScreen);
  }
  ToResultScreen(event)
  {
      let resultElement = document.querySelector('#results');
      this.results=new ResultsScreen(resultElement,event.detail.valueOf().R,event.detail.valueOf().L,event.detail.valueOf().QN);
      this.flashcards.hide();
      this.results.show();
      document.removeEventListener('ShowResult', this.ToResultScreen);
      document.addEventListener('ToMenu',this.ToMenuScreen);
      document.addEventListener('BackFlash',this.BackFlashCard);
  }
  ToMenuScreen()
  {
      location.reload();
  }
  BackFlashCard(event)
  {
      document.removeEventListener('BackFlash',this.BackFlashCard);
      let mainElement = document.querySelector('#main');
      console.log(event.detail.valueOf().QN);
      this.flashcards=new FlashcardScreen(mainElement,event.detail.valueOf().QN);
      this.results.hide();
      this.flashcards.show();
      document.addEventListener('ShowResult', this.ToResultScreen);
  }
}
