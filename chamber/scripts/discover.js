const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");


const date = new Date();
year.innerHTML = date.getFullYear();


let lastMod = document.lastModified;
lastModified.innerHTML = `Last Modified: ${lastMod}`;


const hamButton = document.querySelector(".ham-button");
const menu = document.querySelector("nav");

hamButton.addEventListener("click", () =>
{
    hamButton.classList.toggle("active");
    menu.classList.toggle("active");
});
fetch("data/places.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("card-container");
    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h2>${item.title}</h2>
        <figure>
          <img src="${item.imageUrl}" alt="${item.title}" loading="lazy" />
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;
      container.appendChild(card);
    });
  });
  const messageArea = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  messageArea.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const diffTime = now - Number(lastVisit);
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (days < 1) {
    messageArea.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    messageArea.textContent = "You last visited 1 day ago.";
  } else {
    messageArea.textContent = `You last visited ${days} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);
