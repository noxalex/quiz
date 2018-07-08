export default class Quiz {
  constructor(title, questions) {
    this.title = title;
    this.questions = questions;

    this._questionIndex = 0;
    this.correctAnswers = 0;
  }

  get currentQuestion() {
    return this.questions[this._questionIndex];
  }

  get questionIndex() {
    return this._questionIndex;
  }

  get hasEnded() {
    return this._questionIndex === this.questions.length;
  }

  checkAnswer(answer) {
    if (this.currentQuestion.isCorrectAnswer(answer)) {
      this.correctAnswers += 1;
      this._questionIndex += 1;
      return true;
    } else {
      this._questionIndex += 1;
      return false;
    }
  }
}
