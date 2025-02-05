#!/usr/bin/env node

import inquirer from "inquirer";

class Game {
  static PLAY_COUNT = 5;
  constructor() {
    this.failCount = 0;
    this.correctCount = 0;
    this.isTimeover = false;
  }

  async execute() {
    while (this.failCount < Game.PLAY_COUNT) {
      const number = Math.floor(Math.random() * 100) + 1;
      console.log(
        `この数はどっち?: ${number}（あと${Game.PLAY_COUNT - this.failCount}回失敗で終了）`,
      );
      const answer = await this.fetchAnswer("あなたの回答: ");

      if (this.isTimeover) {
        this.failCount++;
        if (this.failCount >= Game.PLAY_COUNT) {
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
        const correctAnswer = this.isThreeRelated(number);
        this.evaluateAnswer(answer, correctAnswer);
      }
    }
    this.finish();
  }

  async fetchAnswer(prompt) {
    let timeout;
    const promptInstance = inquirer.prompt([
      {
        type: "list",
        name: "answer",
        message: prompt,
        choices: [
          { name: "3の倍数または3を含む数字", value: true },
          { name: "それ以外の数字", value: false },
        ],
      },
    ]);

    const timeoutPromise = new Promise((resolve) => {
      timeout = setTimeout(() => {
        this.isTimeover = true;
        promptInstance.ui.close();
        resolve(null);
      }, 5000);
    });

    const promptPromise = promptInstance.then((answers) => {
      clearTimeout(timeout);
      this.isTimeover = false;
      return answers.answer;
    });

    return Promise.race([timeoutPromise, promptPromise]);
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
