const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let failCount = 0;
let correctCount = 0;
let timeout;
let number;

async function beginGame() {
  const remainingLives = 5 - failCount;
  number = Math.floor(Math.random() * 100) + 1;

  console.log(
    `この数はどっち?: ${number}（あと${remainingLives}回失敗で終了）`,
  );
  console.log(
    "「3の倍数」または「3を含む数字」のときは1、そうでない場合は2、終了する場合はexitを入力",
  );

  startTimer();

  const answer = await loadUserInput("あなたの回答: ");

  clearTimeout(timeout);

  if (answer === "exit") {
    endGame();
    return;
  }

  const correctAnswer = checkThreeRelated(number) ? "1" : "2";
  checkAnswer(answer, correctAnswer);

  if (failCount < 5) {
    beginGame();
  } else {
    endGame();
  }
}

function startTimer() {
  timeout = setTimeout(() => {
    console.log("⏰ 時間切れ！");
    failCount++;
    if (failCount < 5) {
      beginGame();
    } else {
      endGame();
    }
  }, 5000);
}

function loadUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => resolve(answer.trim().toLowerCase()));
  });
}

function checkThreeRelated(number) {
  return number % 3 === 0 || number.toString().includes("3");
}

function checkAnswer(answer, correctAnswer) {
  if (answer !== "1" && answer !== "2") {
    console.log("🙅 無効な入力です 1または2を入力してください");
    failCount++;
  } else {
    if (answer === correctAnswer) {
      console.log("🙆 正解");
      correctCount++;
    } else {
      console.log("🙅 不正解");
      failCount++;
    }
  }
}

function endGame() {
  console.log("-------------------終了-------------------");
  console.log(`正解した問題数 ${correctCount}`);
  rl.close();
}

beginGame();
