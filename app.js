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
    this.menu = new MenuScreen(menuElement);
    document.addEventListener('ChoiceOne', this.ToFlashCard);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    // Uncomment this pair of lines to see the "flashcard" screen:
    // this.menu.hide();
    // this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    // this.menu.hide();
    // this.results.show();
  }
  ToFlashCard(event)
  {
      //console.info(event.detail.valueOf().type);
      let mainElement = document.querySelector('#main');
      this.flashcards=new FlashcardScreen(mainElement,event.detail.valueOf().type);
      this.menu.hide();
      this.flashcards.show();
      document.addEventListener('ShowResult', this.ToResultScreen);
  }
  ToResultScreen(event)
  {
      this.results=new ResultsScreen(resultElement);
      this.flashcards.hide();
      this.results.show();
      document.addEventListener('ToMenu',this.ToMenuScreen);
      document.addEventListener('BackFlash',this.BackFlashCard);
  }
  ToMenuScreen(event)
  {
      this.menu = new MenuScreen(this.menuElement);
      this.results.hide();
      this.menu.show();
  }
  BackFlashCard(event)
  {
      this.flashcards=new FlashcardScreen(this.mainElement);
      this.results.hide();
      this.flashcards.show();
  }
}
