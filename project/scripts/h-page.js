const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const date = new Date();
year.textContent = date.getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

const hamButton = document.querySelector(".ham-button");
const menu = document.querySelector(".nav-links");

hamButton.addEventListener("click", () => {
  hamButton.classList.toggle("active");
  menu.classList.toggle("active");
});

const apiKey = '3d08dadb960b52d7a9058cfa29116e33';
const city = 'Newcastle';

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("Weather fetch failed");

    const data = await response.json();
    const { temp } = data.main;
    const description = data.weather[0].description;

    document.getElementById('weather').textContent =
      `Current weather in ${city}: ${temp}°C, ${description}`;
    getWeatherForecast();
  } catch (error) {
    console.error('Weather error:', error);
  }
}

async function getWeatherForecast() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) throw new Error("Forecast fetch failed");

    const data = await res.json();
    const daysMap = new Map();

    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toISOString().split('T')[0];
      if (!daysMap.has(dateStr)) daysMap.set(dateStr, item);
    });

    const forecastHtml = Array.from(daysMap.values()).slice(0, 3).map(day => {
      const date = new Date(day.dt * 1000);
      const dateStr = date.toLocaleDateString();
      return `<li><strong>${dateStr}</strong>: ${day.main.temp}°C, ${day.weather[0].description}</li>`;
    }).join("");

    document.getElementById('forecast').innerHTML = `<ul>${forecastHtml}</ul>`;
  } catch (err) {
    console.error('Forecast error:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('businesses-container');
  getWeather();
  getWeatherForecast();

  fetch('data/tours.json')
      .then(response => {
          if (!response.ok) throw new Error('Failed to fetch JSON');
          return response.json();
      })
      .then(data => {
          container.innerHTML = '';

          
          const randomItems = getRandomItems(data, 3);

          randomItems.forEach(biz => {
              const card = document.createElement('div');
              card.className = 'business';

              card.innerHTML = `
                  <h2>${biz.name}</h2>
                  <img src="${biz.imageURL}" alt="${biz.name}" loading="lazy" width="400" height="200">
                  <p><strong>Address:</strong> ${biz.address}</p>
                  <p><strong>Phone:</strong> ${biz.phone ? `<a href="tel:${biz.phone}">${biz.phone}</a>` : 'N/A'}</p>
                  <p><strong>Rating:</strong> ${biz.rating} ⭐</p>
                  <p><a href="${biz.link}" target="_blank">Visit Website</a></p>
              `;
              container.appendChild(card);
          });
      })
      .catch(error => {
          console.error('Error loading JSON:', error);
          container.textContent = 'Error loading data.';
      });
});


function getRandomItems(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

  