let gameSeq = [];
let userSeq = [];
let levels = [];
let t = "";
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let hscore = 0;
let h2 = document.querySelector("h2");

let cur = document.querySelectorAll(".btn");
for (b of cur) {
  b.style.cursor = "pointer";
}

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
  }
  started = true;
  levelUp();
  document.querySelector("#warn").innerText = t;
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 50);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  btnFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score is <b>${level}</b> <br> Press any key to restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 100);
    levels.push(level);
    highscore();
    reset();
  }
}

function btnPress() {
  if (started == true) {
    let btn = this;
    btnFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
  } else {
    h2.style.textDecoration = "underline purple";
    h2.style.color = "purple";
    h2.style.transform = "scale(1.5)";
    setTimeout(function () {
      h2.style.textDecoration = "none";
      h2.style.transform = "scale(1)";
      h2.style.color = "black";
    }, 400);
  }
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
  document.querySelector("#warn").innerHTML =
    "<b>Do not place your cursor over any color button while pressing!</b>";
}

function highscore() {
  for (b of levels) {
    if (b > hscore) {
      hscore = b;
    }
  }
  document.querySelector(
    "#hscore"
  ).innerHTML = `<b>Highest Score: ${hscore}</b>`;
}
