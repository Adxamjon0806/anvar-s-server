const ws = new WebSocket("wss://script-answers.onrender.com");

document.addEventListener("click", () => {
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
});
