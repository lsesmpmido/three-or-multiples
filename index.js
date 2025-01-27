const readline = require("readline");

class Game {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.failCount = 0;
    this.correctCount = 0;
    this.timeout = null;
    this.number = null;
  }

  async beginGame() {
    const remainingLives = 5 - this.failCount;
    this.number = Math.floor(Math.random() * 100) + 1;

    console.log(
      `この数はどっち?: ${this.number}（あと${remainingLives}回失敗で終了）`,
    );
    console.log(
      "「3の倍数」または「3を含む数字」のときは1、そうでない場合は2、終了する場合はexitを入力",
    );

    this.startTimer();

    const answer = await this.loadUserInput("あなたの回答: ");

    clearTimeout(this.timeout);

    if (answer === "exit") {
      this.endGame();
      return;
    }

    const correctAnswer = this.checkThreeRelated(this.number) ? "1" : "2";
    this.checkAnswer(answer, correctAnswer);

    if (this.failCount < 5) {
      this.beginGame();
    } else {
      this.endGame();
    }
  }

  startTimer() {
    this.timeout = setTimeout(() => {
      console.log("⏰ 時間切れ！");
      this.failCount++;
      if (this.failCount < 5) {
        this.beginGame();
      } else {
        this.endGame();
      }
    }, 5000);
  }

  loadUserInput(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, (answer) =>
        resolve(answer.trim().toLowerCase()),
      );
    });
  }

  checkThreeRelated(number) {
    return number % 3 === 0 || number.toString().includes("3");
  }

  checkAnswer(answer, correctAnswer) {
    if (answer !== "1" && answer !== "2") {
      console.log("🙅 無効な入力です 1または2を入力してください");
      this.failCount++;
    } else {
      if (answer === correctAnswer) {
        console.log("🙆 正解");
        this.correctCount++;
      } else {
        console.log("🙅 不正解");
        this.failCount++;
      }
    }
  }

  endGame() {
    console.log("-------------------終了-------------------");
    console.log(`正解した問題数 ${this.correctCount}`);
    this.rl.close();
  }
}

const game = new Game();
game.beginGame();
