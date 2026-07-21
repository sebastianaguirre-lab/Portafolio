const CONTACT = {
  email: "sebastian.aguirre@ug.uchile.cl",
  whatsapp: "",
};

const projects = [
  {
    name: "Cuppon",
    url: "https://sebastianaguirre-lab.github.io/cuppon/",
    description:
      "Sitio responsive de ofertas y cupones, construido con Bootstrap.",
    tags: ["HTML", "CSS", "Bootstrap"],
  },
  {
    name: "Ricomida",
    url: "https://sebastianaguirre-lab.github.io/ricomida/",
    description:
      "Experiencia gastronómica con recetas, componentes interactivos y diseño adaptable.",
    tags: ["HTML", "CSS", "jQuery"],
  },
  {
    name: "Viajes Chile",
    url: "https://sebastianaguirre-lab.github.io/viajes_chile/",
    description:
      "Landing turística con navegación fluida y una identidad visual inspirada en Chile.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    name: "Full Stack Python",
    url: "https://sebastianaguirre-lab.github.io/fullstack-python-interactivo/",
    description:
      "Recorrido interactivo por conceptos y herramientas del desarrollo con Python.",
    tags: ["JavaScript", "Python", "UI"],
  },
  {
    name: "Librerías Web",
    url: "https://sebastianaguirre-lab.github.io/librerias-web/",
    description:
      "Exploración práctica de librerías que agilizan y enriquecen el desarrollo frontend.",
    tags: ["HTML", "CSS", "Librerías"],
  },
  {
    name: "Rocky",
    url: "https://sebastianaguirre-lab.github.io/rocky/",
    description:
      "Interfaz web con atención al detalle, estructura semántica y diseño responsive.",
    tags: ["HTML", "CSS", "Responsive"],
  },
];

const projectGrid = document.querySelector("#project-grid");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
const emailLink = document.querySelector("#email-link");
const whatsappLink = document.querySelector("#whatsapp-link");
const form = document.querySelector("#contact-form");
const note = document.querySelector("#form-note");

function createProjectCard(project, index) {
  const article = document.createElement("article");
  const number = String(index + 1).padStart(2, "0");
  const visibleUrl = project.url.replace("https://", "");
  const tags = project.tags.map((tag) => "<span>" + tag + "</span>").join("");

  article.className = "project-card";
  article.innerHTML =
    '<div class="project-preview">' +
    '<iframe src="' +
    project.url +
    '" title="Vista previa de ' +
    project.name +
    '" loading="lazy" tabindex="-1"></iframe>' +
    '<a href="' +
    project.url +
    '" target="_blank" rel="noopener noreferrer" ' +
    'aria-label="Abrir ' +
    project.name +
    '"></a>' +
    "</div>" +
    '<div class="project-info">' +
    "<div>" +
    '<p class="project-index">' +
    number +
    " / 06</p>" +
    "<h3>" +
    project.name +
    "</h3>" +
    "</div>" +
    "<p>" +
    project.description +
    "</p>" +
    '<div class="tags">' +
    tags +
    "</div>" +
    '<a class="project-link" href="' +
    project.url +
    '" target="_blank" rel="noopener noreferrer">' +
    visibleUrl +
    " <b>↗</b>" +
    "</a>" +
    "</div>";

  return article;
}

projects.forEach((project, index) => {
  projectGrid.appendChild(createProjectCard(project, index));
});

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

function showMissingContact(event) {
  event.preventDefault();
  note.textContent =
    "Añade tu número de WhatsApp al inicio de assets/js/script.js.";
  note.style.color = "#b7f36b";
}

function configureContact() {
  emailLink.href = "mailto:" + CONTACT.email;
  document.querySelector("#email-text").textContent = CONTACT.email;

  if (CONTACT.whatsapp) {
    whatsappLink.href = "https://wa.me/" + CONTACT.whatsapp;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
    document.querySelector("#whatsapp-text").textContent =
      "+" + CONTACT.whatsapp;
  } else {
    whatsappLink.addEventListener("click", showMissingContact);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const subject = encodeURIComponent(data.get("subject"));
  const body = encodeURIComponent(
    "Hola Sebastián,\n\n" +
      data.get("message") +
      "\n\n— " +
      data.get("name") +
      "\n" +
      data.get("email"),
  );

  window.location.href =
    "mailto:" + CONTACT.email + "?subject=" + subject + "&body=" + body;
});

configureContact();
document.querySelector("#year").textContent = new Date().getFullYear();
