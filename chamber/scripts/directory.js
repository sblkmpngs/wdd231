const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const date = new Date();
year.innerHTML = date.getFullYear();

let lastMod = document.lastModified;
lastModified.innerHTML = `Last Modified: ${lastMod}`;

const hamButton = document.querySelector(".ham-button");
const menu = document.querySelector("nav");

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

    if (!response.ok) {
      throw new Error("Weather fetch failed");
    }

    const data = await response.json();
    const temp = data.main.temp;
    const description = data.weather[0].description;

    // Display current weather
    document.getElementById('weather').textContent =
      `Current weather in ${city}: ${temp}°C, ${description}`;

    // Get forecast for the next 3 days
    getWeatherForecast();
  } catch (error) {
    console.error('Weather error:', error);
  }
}

async function getWeatherForecast() {
    try {
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
  
      if (!forecastResponse.ok) {
        throw new Error("Weather forecast fetch failed");
      }
  
      const forecastData = await forecastResponse.json();
      console.log("Full Forecast Data:", forecastData);
  
      // Group forecasts by day (YYYY-MM-DD)
      const daysMap = new Map();
  
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateStr = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  
        if (!daysMap.has(dateStr)) {
          daysMap.set(dateStr, item); // Only take the first forecast of that day
        }
      });
  
      const forecastDays = Array.from(daysMap.values()).slice(0, 3); // Limit to next 3 days
  
      let forecastHtml = '<ul>';
      forecastDays.forEach(day => {
        const date = new Date(day.dt * 1000);
        const temp = day.main.temp;
        const description = day.weather[0].description;
        const dateStr = date.toLocaleDateString();
  
        forecastHtml += `
          <li>
            <strong>${dateStr}</strong>: ${temp}°C, ${description}
          </li>
        `;
      });
      forecastHtml += '</ul>';
  
      document.getElementById('forecast').innerHTML = forecastHtml;
  
    } catch (error) {
      console.error('Forecast error:', error);
      document.getElementById('forecast').textContent = 'Error loading forecast data.';
    }
  }
  

document.addEventListener('DOMContentLoaded', () => {
  getWeather();
  getWeatherForecast();

  const container = document.getElementById('businesses-container');

  document.getElementById('grid-view').addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
  });

  document.getElementById('list-view').addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
  });

  fetch('data/members.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch JSON');
      return response.json();
    })
    .then(data => {
      container.innerHTML = '';

      data.businesses.forEach(biz => {
        const card = document.createElement('div');
        card.className = 'business';

        // Determine membership level style
        let membershipClass = '';
        switch(biz.membershipLevel) {
          case 'Gold':
            membershipClass = 'gold';
            break;
          case 'Silver':
            membershipClass = 'silver';
            break;
          case 'Bronze':
            membershipClass = 'bronze';
            break;
          default:
            membershipClass = 'default';
        }

        card.innerHTML = `
          <h6>${biz.name}</h6>
          <p><strong>Address:</strong> ${biz.address}</p>
          <img src="${biz.imageURL}" alt="${biz.name} Picture" loading="lazy" width="400" height="200">
          <p><strong>Phone:</strong> <a href="tel:${biz.Phone}">${biz.Phone}</a></p>
          <p><strong>Membership Level:</strong> <span class="${membershipClass}">${biz.membership}</span></p>
          <p><a href="${biz.link}" target="_blank">Visit Website</a></p>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      container.textContent = 'Error loading data.';
    });
});




