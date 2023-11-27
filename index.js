console.log("Starting");

const weatherURL =
  "https://sugaryboilingtypes--mayurrajan.repl.co/getWeatherReport";
const geocodeURL = "https://geocode.maps.co/reverse";

// Function to get and store the user's location
function fetchWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Get latitude and longitude
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // Store in local storage
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        // Fetch location details from geocodeURL
        fetch(`${geocodeURL}?lat=${latitude}&lon=${longitude}`)
          .then((response) => response.json())
          .then((locationData) => {
            // Update the HTML elements with city and country details
            updateLocationDetails(locationData);
          })
          .catch((error) => {
            console.error("Error fetching location data:", error);
          });

        // Fetch weather data from the weatherURL
        fetch(`${weatherURL}?lat=${latitude}&lon=${longitude}`)
          .then((response) => response.json())
          .then((data) => {
            // Update the HTML elements with weather details
            updateWeatherTable(data);
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          });
      },
      function (error) {
        console.error("Error getting location:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

// Function to update the HTML elements with location details
function updateLocationDetails(locationData) {
  var city = locationData.address.county;
  var country = locationData.address.country;

  // Update HTML elements with city and country details
  document.getElementById("city").textContent = city;
  document.getElementById("country").textContent = country;
}

// Function to update the HTML elements with weather details
function updateWeatherTable(weatherData) {
  // Update temperature
  document.getElementById("temperature").textContent = weatherData.temperature;

  // Update other details
  document.getElementById("condition").textContent = weatherData.condition;
  document.getElementById("location").textContent = weatherData.location;
  document.getElementById("pressure").textContent = weatherData.pressure;
  document.getElementById("humidity").textContent = weatherData.humidity;
  document.getElementById("sunrise").textContent = new Date(
    weatherData.sunrise * 1000
  ).toLocaleTimeString();
  document.getElementById("sunset").textContent = new Date(
    weatherData.sunset * 1000
  ).toLocaleTimeString();
  document.getElementById("gpt").textContent = weatherData.gpt;
}

// Attach the function to the button click event
document.getElementById("fetchWeather").addEventListener("click", fetchWeather);
