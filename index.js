#!/usr/bin/env node

import inquirer from "inquirer";

class Game {
  constructor() {
    this.failCount = 0;
    this.correctCount = 0;
    this.timeout = null;
    this.number = null;
    this.isTimeover = false;
  }

  async execute() {
    while (this.failCount < 5) {
      this.number = Math.floor(Math.random() * 100) + 1;
      this.startTime();
      console.log(
        `この数はどっち?: ${this.number}（あと${5 - this.failCount}回失敗で終了）`,
      );
      const answer = await this.fetchAnswer("あなたの回答: ");

      if (this.isTimeover === true) {
        this.failCount++;
        if (this.failCount >= 5) {
          this.finish();
        } else {
          const choice = await this.askToContinue(
            "⏰ 時間切れです！ゲームを続行しますか？",
          );
          if (choice === "終了") {
            this.finish();
          }
        }
      } else {
        const correctAnswer = this.isThreeRelated(this.number);
        this.evaluateAnswer(answer, correctAnswer);
      }
      this.stopTime();
    }
    this.finish();
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

  fetchAnswer(prompt) {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "answer",
          message: prompt,
          choices: [
            { name: "3の倍数または3を含む数字", value: true },
            { name: "それ以外の数字", value: false },
          ],
        },
      ])
      .then((answers) => answers.answer);
  }

  askToContinue(prompt) {
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

  isThreeRelated(number) {
    return number % 3 === 0 || number.toString().includes("3");
  }

  evaluateAnswer(answer, correctAnswer) {
    if (answer === correctAnswer) {
      console.log("🙆 正解");
      this.correctCount++;
    } else {
      console.log("🙅 不正解");
      this.failCount++;
    }
  }

  finish() {
    console.log("-------------------終了-------------------");
    console.log(`正解した問題数: ${this.correctCount}`);
    process.exit();
  }
}

const game = new Game();
game.execute();
