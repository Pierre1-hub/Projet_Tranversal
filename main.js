document.addEventListener("DOMContentLoaded", () => {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const swiperEl = document.querySelector(".mySwiper");
  if (swiperEl && typeof Swiper !== "undefined") {
    new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 10,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
        coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: false },
      },
      pagination: { el: ".swiper-pagination" },
    });
  }
});
const QUESTIONS = [
  {
    q: "Quel est le diamètre maximal enregistré d'une Acanthaster planci ?",
    options: ["40 cm", "60 cm", "80 cm", "1 mètre"],
    answer: 2,
    feedback:
      "Exact ! L'Acanthaster peut atteindre jusqu'à 80 cm de diamètre, bien que la moyenne se situe entre 25 et 40 cm.",
  },
  {
    q: "Combien de m² de coraux un seul individu peut-il détruire par an ?",
    options: ["1 m²", "6 m²", "15 m²", "30 m²"],
    answer: 1,
    feedback:
      "Oui ! Un seul individu peut détruire jusqu'à 6 m² de coraux par an. En cas d'explosion de population, les dégâts sont catastrophiques.",
  },
  {
    q: "Quelle est la principale cause humaine de la prolifération de l'Acanthaster ?",
    options: [
      "La pollution plastique",
      "La surpêche de ses prédateurs",
      "Les marées noires",
      "Le tourisme sous-marin",
    ],
    answer: 1,
    feedback:
      "La surpêche élimine les prédateurs naturels de l'Acanthaster (triton géant, napoléon, mérou), ce qui lui permet de proliférer sans contrôle.",
  },
  {
    q: "Quel type de coraux l'Acanthaster préfère-t-elle ?",
    options: [
      "Coraux cerveau",
      "Coraux Acropora",
      "Coraux éventail",
      "Coraux pilier",
    ],
    answer: 1,
    feedback:
      "L'Acanthaster préfère les Acropora, qui sont les coraux les plus importants pour la santé et la biodiversité des récifs.",
  },
  {
    q: "En cas d'invasion, quel pourcentage de coraux peut être tué dans une zone ?",
    options: ["30%", "50%", "70%", "90%"],
    answer: 3,
    feedback:
      "En cas d'explosion de population, l'Acanthaster peut anéantir 90 % des coraux d'une zone entière, avec des conséquences en cascade sur tout l'écosystème.",
  },
  {
    q: "Quelle est actuellement la méthode de gestion la plus efficace contre l'Acanthaster ?",
    options: [
      "Produits chimiques",
      "Robots sous-marins",
      "Retrait manuel par des plongeurs",
      "Prédateurs introduits",
    ],
    answer: 2,
    feedback:
      "Le retrait manuel par des plongeurs reste la méthode la plus efficace à ce jour, bien que coûteuse et difficile à déployer à grande échelle.",
  },
];

let current = 0,
  score = 0,
  answered = false;

function startQuiz() {
  current = 0;
  score = 0;
  answered = false;
  const main = document.getElementById("quiz-main");
  const results = document.getElementById("results");
  if (!main || !results) return;
  main.style.display = "block";
  results.classList.remove("show");
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[current];
  document.getElementById("q-counter").textContent =
    `Question ${current + 1} / ${QUESTIONS.length}`;
  document.getElementById("q-score-live").textContent = `Score : ${score}`;
  document.getElementById("progress-fill").style.width =
    `${(current / QUESTIONS.length) * 100}%`;
  document.getElementById("q-number").textContent = `Question ${current + 1}`;
  document.getElementById("q-text").textContent = q.q;
  document.getElementById("feedback").className = "feedback";
  document.getElementById("feedback").textContent = "";
  document.getElementById("btn-next").className = "btn-next";
  answered = false;

  const opts = document.getElementById("options");
  opts.innerHTML = "";
  q.options.forEach((o, i) => {
    const b = document.createElement("button");
    b.className = "option";
    b.textContent = o;
    b.onclick = () => selectAnswer(i);
    opts.appendChild(b);
  });
}

function selectAnswer(i) {
  if (answered) return;
  answered = true;
  const q = QUESTIONS[current];
  const opts = document.querySelectorAll(".option");
  opts.forEach((o) => (o.disabled = true));
  opts[i].classList.add(i === q.answer ? "correct" : "wrong");
  if (i !== q.answer) opts[q.answer].classList.add("correct");
  if (i === q.answer) score++;

  const fb = document.getElementById("feedback");
  fb.textContent = q.feedback;
  fb.className = `feedback show ${i === q.answer ? "good" : "bad"}`;

  const btn = document.getElementById("btn-next");
  btn.className = "btn-next show";
  btn.textContent =
    current < QUESTIONS.length - 1
      ? "Question suivante →"
      : "Voir les résultats →";
}

function showResults() {
  document.getElementById("quiz-main").style.display = "none";
  document.getElementById("results").classList.add("show");
  document.getElementById("final-score").textContent = score;

  const pct = score / QUESTIONS.length;
  let title, msg;
  if (pct === 1) {
    title = "Parfait ! ";
    msg =
      "Vous êtes un(e) expert(e) des récifs coralliens ! L'Acanthaster n'a plus de secrets pour vous.";
  } else if (pct >= 0.66) {
    title = "Très bien ! ";
    msg =
      "Vous connaissez bien le sujet. Quelques détails vous ont échappé — retentez votre chance !";
  } else if (pct >= 0.33) {
    title = "Pas mal ";
    msg =
      "Vous avez des bases, mais il reste des choses à apprendre sur cette menace sous-marine.";
  } else {
    title = "À revoir ";
    msg =
      "La menace Acanthaster mérite d'être mieux connue. Explorez le site pour en apprendre plus !";
  }

  document.getElementById("result-title").textContent = title;
  document.getElementById("result-msg").textContent = msg;
}
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("quiz-main")) {
    startQuiz();
    document.getElementById("btn-next").addEventListener("click", () => {
      current++;
      if (current < QUESTIONS.length) renderQuestion();
      else showResults();
    });
  }
});
window.startQuiz = startQuiz;
