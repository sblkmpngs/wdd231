const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");


document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelector(".ham-button").addEventListener("click", () => {
        document.querySelector(".nav-menu").classList.toggle("active");
    });

    document.querySelector("form").addEventListener("submit", () => {
        document.getElementById("timestamp").value = new Date().toISOString();
    });

    
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last modified: " + document.lastModified;
});


   
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 300);
    });
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById('thankyou-first-name').textContent = urlParams.get('first-name');
    document.getElementById('thankyou-last-name').textContent = urlParams.get('last-name');
    document.getElementById('thankyou-email').textContent = urlParams.get('email');
    document.getElementById('thankyou-phone').textContent = urlParams.get('phone');
    document.getElementById('thankyou-organization').textContent = urlParams.get('organization');
    document.getElementById('thankyou-membership-level').textContent = urlParams.get('membership-level');
    document.getElementById('thankyou-timestamp').textContent = urlParams.get('timestamp');
