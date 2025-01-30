import inquirer from "inquirer";

class Game {
  constructor() {
    this.failCount = 0;
    this.correctCount = 0;
    this.timeout = null;
    this.number = null;
    this.isTimeover = false;
  }

  async beginGame() {
    while (this.failCount < 5) {
      this.number = Math.floor(Math.random() * 100) + 1;
      this.startTime();
      console.log(
        `この数はどっち?: ${this.number}（あと${5 - this.failCount}回失敗で終了）`,
      );
      const answer = await this.loadUserInput("あなたの回答: ");

      if (this.isTimeover === true) {
        this.failCount++;
        if (this.failCount >= 5) {
          this.endGame();
        } else {
          const choice = await this.pauseGame(
            "⏰ 時間切れです！ゲームを続行しますか？",
          );
          if (choice === "終了") {
            this.endGame();
          }
        }
      } else {
        const correctAnswer = this.checkThreeRelated(this.number)
          ? "3の倍数または3を含む数字"
          : "それ以外の数字";
        this.checkAnswer(answer, correctAnswer);
      }
      this.stopTime();
    }
    this.endGame();
  }

  startTime() {
    this.timeout = setTimeout(() => {
      this.isTimeover = true;
    }, 5000);
  }

  stopTime() {
    this.isTimeover = false;
    clearTimeout(this.timeout);
  }

  loadUserInput(prompt) {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "answer",
          message: prompt,
          choices: [
            { name: "3の倍数または3を含む数字" },
            { name: "それ以外の数字" },
          ],
        },
      ])
      .then((answers) => answers.answer);
  }

  pauseGame(prompt) {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: prompt,
          choices: [{ name: "続行" }, { name: "終了" }],
        },
      ])
      .then((choices) => choices.choice);
  }

  checkThreeRelated(number) {
    return number % 3 === 0 || number.toString().includes("3");
  }

  checkAnswer(answer, correctAnswer) {
    if (answer === correctAnswer) {
      console.log("🙆 正解");
      this.correctCount++;
    } else {
      console.log("🙅 不正解");
      this.failCount++;
    }
  }

  endGame() {
    console.log("-------------------終了-------------------");
    console.log(`正解した問題数: ${this.correctCount}`);
    process.exit();
  }
}

const game = new Game();
game.beginGame();
