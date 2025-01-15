# three-or-multiples

表示された数字が、「3の倍数」または「3を含む」かどうか判定するゲームです。

## インストール

```
npm install three-or-multiples
```

## 使い方

### 起動

以下のコマンドを実行すると、ゲームが起動します。

```
npx three-or-multiples
```

### 遊び方

- 起動すると、1～100までの数字がランダムで1つ表示されます。
- プレイヤーはその表示された数字が「3の倍数」または「３を含む数字」であるかを判定して数字を入力してENTERキーを押すことで回答できます。
  - 「3の倍数」または「３を含む数字」の場合は **1** を、そうではない場合は **2** を入力する
- そしてその回答が正解の場合は「🙆 正解」と表示され、不正解の場合は「🙅 不正解」と表示されます。
  - なお、無効な入力を行った場合は「🙅 無効な入力です 1または2を入力してください」、5秒以内に回答しなければ「⏰ 時間切れ！」と表示され、不正解として処理されます。
- プレイヤーは5回まで回答ミスが許されており、5回不正解になるとゲームは終了しこれまでに正解した問題数がスコアとして表示されます。
- 多くの問題数を正解するほど良い評価ということになるため、いかに多くの問題を正解できるか挑戦してください。

### 終了方法

- 5回不正解になるか、入力欄に **exit** と入力することでゲームを終了します。
