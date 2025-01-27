import inquirer from "inquirer";

class Game {
  constructor() {
    this.failCount = 0;
    this.correctCount = 0;
    this.timeout = null;
    this.number = null;
  }

  async beginGame() {
    this.number = Math.floor(Math.random() * 100) + 1;
    this.startTimer();

    const answer = await this.loadUserInput();

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

  loadUserInput() {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "answer",
          message: `この数はどっち?: ${this.number}（あと${5 - this.failCount}回失敗で終了）`,
          choices: [
            { name: "3の倍数または3を含む数字", value: "1" },
            { name: "それ以外の数字", value: "2" },
            { name: "終了", value: "exit" },
          ],
        },
      ])
      .then((answers) => answers.answer);
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
    inquirer.prompt([]);
  }
}

const game = new Game();
game.beginGame();
