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

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('businesses-container');
  
    document.getElementById('grid-view').addEventListener('click', () => {
      container.classList.add('grid-view');
      container.classList.remove('list-view');
    });
  
    document.getElementById('list-view').addEventListener('click', () => {
      container.classList.add('list-view');
      container.classList.remove('grid-view');
    });
  
  
    fetch('data/tours.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch JSON');
        return response.json();
      })
      .then(data => {
        container.innerHTML = '';
  
        data.forEach(biz => {
          const card = document.createElement('div');
          card.classList.add('business');
  
      
          const title = document.createElement('h2');
          title.textContent = biz.name;
  
      
          const img = document.createElement('img');
          img.src = biz.imageURL;
          img.alt = biz.name;
          img.loading = 'lazy';
          img.width = 400;
          img.height = 200;
  
         
          img.onerror = () => {
            img.src = 'images/placeholder.jpg'; 
          };
  
        
          const address = document.createElement('p');
          address.innerHTML = `<strong>Address:</strong> ${biz.address}`;
  
          const phone = document.createElement('p');
          phone.innerHTML = `<strong>Phone:</strong> ${
            biz.phone ? `<a href="tel:${biz.phone}">${biz.phone}</a>` : 'N/A'
          }`;
  
          const rating = document.createElement('p');
          rating.innerHTML = `<strong>Rating:</strong> ${biz.rating} ⭐`;
  
          const link = document.createElement('p');
          link.innerHTML = `<a href="${biz.link}" target="_blank">Visit Website</a>`;
  
          // Append to card
          card.append(title, img, address, phone, rating, link);
          container.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error loading JSON:', error);
        container.textContent = 'Error loading data.';
      });
  });
  
  
  