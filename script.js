const form = document.getElementById("fortune-form");
const resultSection = document.getElementById("result");
const resultMeta = document.getElementById("result-meta");
const resultText = document.getElementById("result-text");

const errorEls = {
  name: document.getElementById("name-error"),
  birthdate: document.getElementById("birthdate-error"),
  genre: document.getElementById("genre-error")
};

const fortuneData = {
  "片思い・進展": {
    titles: ["この恋の可能性", "恋が動くタイミング", "あなたに必要な行動"],
    freeText:
      "この恋の可能性は高く、相手の中であなたの存在はすでに日常の一部になりつつあります。はっきりした言葉がまだ無いのは、気持ちが無いからではなく、相手が慎重に関係を育てたいと思っているためです。特に、あなたとの会話を覚えている、返信が短くても途切れない、あなたの近況に小さく反応する、こうしたサインがあるなら十分に前進可能です。今の運気は一気に告白して決める流れより、信頼を積み上げて恋愛へ移行する流れです。あなたが自然体で関わるほど、相手は安心して距離を縮めます。焦って結論を求めるより、相手が心を開きやすい時間帯に短く温度のある言葉を重ねること。これが未来の決定打になり、友達以上の関係へ進む確率をさらに引き上げます。"
  },
  "相手の気持ち": {
    titles: ["今の本音", "あなたへの印象", "今後の関係の変化"],
    freeText:
      "今の本音として、相手はあなたを特別な存在として意識し始めています。ただし、その気持ちをすぐに言葉に出す段階には至っておらず、関係を壊さないよう慎重に距離を測っている状態です。相手が見ているのは派手なアピールより、あなたの安定感と人柄の一貫性です。やり取りの中で安心できると感じるほど、相手の本音は少しずつ表に出てきます。今は反応の速さより、会話の内容が深まっているかを基準にしてください。あなたの言葉に対して質問が返ってくる、次の話題に繋がる、前に話したことを覚えている。これらはすべて好意のサインです。結論を急がず、相手が安心して気持ちを表現できる空気を作ることで、関係は想像以上に早く進展していきます。"
  },
  "復縁・やり直し": {
    titles: ["復縁の可能性", "相手の未練", "やり直すために必要なこと"],
    freeText:
      "復縁の可能性は十分に残っています。相手の心には過去の痛みと同時に、あなたとの良い記憶もはっきり残っており、完全に終わった関係として整理しきれていません。今の鍵は、過去の正しさを主張することではなく、以前と違う安定した関わり方を示すことです。相手は『また同じことになるのでは』という不安を持つ一方で、『今ならやり直せるかもしれない』という感覚も持っています。連絡の再開は短く穏やかに、感情をぶつけずに近況を共有する形が最も効果的です。復縁運は一気に戻すより、信頼を再構築するほど強くなります。あなたが生活と感情を整えた姿勢を見せることで、相手の警戒は和らぎ、再スタートの現実味が高まっていく流れです。"
  }
};

function clearErrors() {
  errorEls.name.textContent = "";
  errorEls.birthdate.textContent = "";
  errorEls.genre.textContent = "";
}

function extendToLength(text, target) {
  const addons = [
    "今の流れを丁寧に扱うほど、恋の運気は安定して味方します。",
    "焦らず、誠実に、言葉と行動をそろえることが最善です。",
    "相手の気持ちを尊重しながら進めることで、関係は自然に深まっていきます。"
  ];
  let output = text;
  let i = 0;
  while (output.length < target) {
    output += addons[i % addons.length];
    i += 1;
  }
  return output;
}

function breakLineByLength(text, maxChars) {
  return text
    .split("\n")
    .map((line) => {
      const chars = [...line];
      const chunks = [];
      for (let i = 0; i < chars.length; i += maxChars) {
        chunks.push(chars.slice(i, i + maxChars).join(""));
      }
      return chunks.join("\n");
    })
    .join("\n");
}

function getLineLimit() {
  return window.matchMedia("(max-width: 720px)").matches ? 20 : 50;
}

function createLockedBody(maxChars) {
  return breakLineByLength("■".repeat(260), maxChars);
}

function buildResultHtml(genre) {
  const data = fortuneData[genre] || fortuneData["片思い・進展"];
  const lineLimit = getLineLimit();
  const freeText = breakLineByLength(extendToLength(data.freeText, 500), lineLimit);

  return `
    <section class="result-block">
      <h3>鑑定項目</h3>
      <p>
        1. ${data.titles[0]}<br>
        2. ${data.titles[1]}<br>
        3. ${data.titles[2]}
      </p>
    </section>

    <section class="result-block">
      <h3>無料公開: ${data.titles[0]}</h3>
      <p>${freeText}</p>
    </section>

    <section class="result-block locked">
      <h3>${data.titles[1]}</h3>
      <p class="locked-body">${createLockedBody(lineLimit)}</p>
      <div class="locked-badge">ここから先は個人鑑定を依頼した方のみにお伝えします</div>
    </section>

    <section class="result-block locked">
      <h3>${data.titles[2]}</h3>
      <p class="locked-body">${createLockedBody(lineLimit)}</p>
      <div class="locked-badge">ここから先は個人鑑定を依頼した方のみにお伝えします</div>
    </section>
  `;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  const name = document.getElementById("name").value.trim();
  const birthdate = document.getElementById("birthdate").value;
  const genreInput = document.querySelector("input[name='genre']:checked");

  let valid = true;

  if (!name) {
    errorEls.name.textContent = "名前を入力してください。";
    valid = false;
  }

  if (!birthdate) {
    errorEls.birthdate.textContent = "生年月日を入力してください。";
    valid = false;
  }

  if (!genreInput) {
    errorEls.genre.textContent = "ジャンルを選択してください。";
    valid = false;
  }

  if (!valid) return;

  const genre = genreInput.value;
  resultMeta.textContent = `${name}さんの鑑定テーマ: ${genre}（無料公開は1項目目のみ）`;
  resultText.innerHTML = buildResultHtml(genre);

  resultSection.classList.remove("hidden");
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
