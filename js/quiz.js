var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
  {
    q : "На какой отметке от уровня моря находится Хнов ?",
    o : [
      "1800 метров",
      "1950 метров",
      "2200 метров",
      "2350 метров"
    ],
    a : 1 // arrays start with 0, so answer is 70 meters
  },
  {
    q : "Что означает в переводе на русский ~Дясмял~?",
    o : [
      "Тарелка",
      "Плита",
      "Перчатка",
      "Полотенце"
    ],
    a : 3
  },
  {
    q : "В каком году ополченцы из Хнова, Борча и других рутульских селений захватили г.Шеки",
    o : [
      "1810г",
      "1862г",
      "1838г",
      "1902г"
    ],
    a : 2
  },
  {
    q : "Что означает в переводе на русский ~къарг~ ?",
    o : [
      "Лощадь",
      "Баран",
      "Бычок",
      "Теленок"
    ],
    a : 1
  },
  {
    q : "В каком году русскими войсками был пробит тоннель на пути Ахтынской военной дороги?",
    o : [
      "1846г",
      "1853г",
      "1834",
      "1838г"
    ],
    a : 0
  },
  {
    q : "Что означает в переводе на русский ~Неке~?",
    o : [
      "Боярышник",
      "Шиповник",
      "Ромашка",
      "Мать и мачеха"
    ],
    a : 1
  },
  {
    q : "Предводитель Хновского востания против русских?",
    o : [
      "Курбан ал-Хинави",
      "Исмаил ал-Хинави",
      "Челеби ал-Хинави",
      "Рустам ал-Хинави"
    ],
    a : 2
  },
  {
    q : "Что означает в переводе на русский ~Качбы~?",
    o : [
      "Брови",
      "Хвост",
      "Ушки",
      "Рога"
    ],
    a : 3
  },
  {
    q : "В каком году произошло землятресение в Хнове, унесшее 602 жизни?",
    o : [
      "1000г",
      "1068г",
      "1080г",
      "1101г"
    ],
    a : 2
  },
  {
    q : "Что означает в переводе на русский ~забын~?",
    o : [
      "Шампунь",
      "Мыло",
      "Щетка",
      "Память"
    ],
    a : 1
  },
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: () => {
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: () => {
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => quiz.select(label));
      quiz.hAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: (option) => {
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `Вы набрали ${quiz.score} из ${quiz.data.length} баллов.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset : () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
window.addEventListener("load", quiz.init);
