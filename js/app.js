export default class App {
  constructor(element, quiz) {
    this.element = element;
    this.quiz = quiz;
    this.totalQuestions = quiz.questions.length;

    this.init();
  }

  /**
   * Инициализируем объект.
   *
   * Получаем доступ к DOM-элементам, устанавливаем заголовок и подписываемся на событие при выборе ответа.
   */
  init() {
    this.element.querySelector("#title").textContent = this.quiz.title;
    this.displayProgress();
  }

  /**
   * Обрабатываем событие при выборе ответа.
   */
  handleAnswerButtonClick(event) {
    this.quiz.checkAnswer(+event.target.id);
    this.displayNext();
  }

  /**
   * Отображаем следующий вопрос или отображаем результат если тест заверешен.
   */
  displayNext() {
    if (!this.quiz.hasEnded) {
      this.element.querySelector("#answers").innerHTML = "";
      this.displayQuestion();
      this.displayAnswers();
      this.displayProgress();
    } else {
      this.displayScore();
    }
  }

  /**
   * Отображаем вопрос.
   */
  displayQuestion() {
    this.element.querySelector(
      "#question"
    ).innerHTML = this.quiz.currentQuestion.text;
  }

  /**
   * Отображаем ответы.
   */
  displayAnswers() {
    let answers = this.quiz.currentQuestion.answers.map((answer, i) => {
      let el = document.createElement("li");
      el.classList.add("list-group-item");
      el.id = i;
      let elText = document.createTextNode(answer);
      el.addEventListener("click", this.handleAnswerButtonClick.bind(this));
      el.appendChild(elText);
      return el;
    });
    answers.forEach(answer =>
      this.element.querySelector("#answers").appendChild(answer)
    );
  }

  /**
   * Отображаем прогресс ('Вопрос 1 из 5').
   */
  displayProgress() {
    this.element.querySelector("#progress").textContent = `Вопрос ${this.quiz
      .questionIndex + 1} из ${this.totalQuestions}`;
  }

  /**
   * Отображаем результат теста.
   */
  displayScore() {
    this.element.querySelector("#answers").innerHTML = "";
    this.element.querySelector("#question").innerHTML = "Тест завершен!";
    let el = document.createElement("li");
    el.classList.add("list-group-item");
    let elText = document.createTextNode(
      `Правильных ответов: ${this.quiz.correctAnswers} из ${
        this.totalQuestions
      }`
    );
    el.appendChild(elText);
    this.element.querySelector("#answers").appendChild(el);
  }
}
