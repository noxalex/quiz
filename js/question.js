export default class Question {
  constructor(text, answers, correctAnswer) {
    this.text = text;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  isCorrectAnswer(answer) {
    return this.correctAnswer === answer;
  }
}
