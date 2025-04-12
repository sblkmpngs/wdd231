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
function openModal(id) {
    const dialog = document.getElementById(id);
    if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
    }
}

function closeModal(id) {
    const dialog = document.getElementById(id);
    if (dialog && typeof dialog.close === "function") {
        dialog.close();
    }
}
const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('thankyou-first-name').textContent = urlParams.get('first-name');
    document.getElementById('thankyou-last-name').textContent = urlParams.get('last-name');
    document.getElementById('thankyou-email').textContent = urlParams.get('email');
    document.getElementById('thankyou-phone').textContent = urlParams.get('phone');
    document.getElementById('thankyou-tour').textContent = urlParams.get('tour');
    document.getElementById('thankyou-levels').textContent = urlParams.get('levels');
    document.getElementById('thankyou-timestamp').textContent = urlParams.get('timestamp');