const ws = new WebSocket("wss://script-answers.onrender.com");

let user = { role: "client", authenfication: false };

ws.onopen = () => {
  // Регистрация как юзер и получение id
  ws.send(JSON.stringify(user));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.registered) {
    user = data;
  }
  console.log(user);
};

ws.onclose = () => {
  ws.send(JSON.stringify({ id: user.uniqueId }));
};

document.addEventListener("click", handleEvent, true);

function sendQuestion() {
  const allQuestions = document.querySelectorAll(
    '[class*="table-test"], [class*="tab-pane"]'
  );
  const username = document.querySelector(".panel div div h1 span").textContent;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const timeOfActivation = `${year}/${month}/${day}  ${hour}:${minute}:${seconds}`;

  let visibleQuestion = null;

  allQuestions.forEach((el) => {
    const style = window.getComputedStyle(el);
    if (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      el.offsetParent !== null
    ) {
      visibleQuestion = el;
    }
  });

  if (visibleQuestion) {
    const html = visibleQuestion.outerHTML;
    ws.send(JSON.stringify({ html, username, timeOfActivation }));
  }
}

let timeout;
function handleEvent(event) {
  navigator.clipboard
    .writeText("")
    .then(() => console.log("Скопировано!"))
    .catch((err) => console.error("Ошибка при копировании:", err));

  // Дебаунс — чтобы не спамить запросами
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    console.log("Обнаружено пользовательское действие:", event.type);
    sendQuestion();
  }, 1000); // ждать немного перед отправкой
}
