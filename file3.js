$(document).ready(function () {
  const apiKey = "61b0d79558fff9830dcb9edb6bf9a57b"; 
  const geminiApiKey = "AIzaSyAyLAsKH0CUbO_nJmtAT1r-KMM-Ws4oVmE";
  let useCelsius = true; 
  let forecastData = []; 

  const initialBackground = "url('bg2.jpeg')"; 

  $(".search-bar").hide();
  $(".additional-options").hide();
  $("#weatherWidget").hide();
  $(".forecast-table").hide();
  $(".chatbot").hide();
  $(".welcome-section").hide(); 
  $(".weather-container").hide();
  $(
    ".chart-container .temp-chart, .chart-container .condition-chart, .chart-container .line-chart"
  ).hide();

  
  $(".welcome-section").show();

  $("#homeLink").click(function () {
   
    $(".search-bar").hide();
    $(".additional-options").hide();
    $("#weatherWidget").hide();
    $(".forecast-table").hide();
    $(".chatbot").hide();

    $(".weather-container").hide(); 
    $(
      ".chart-container .temp-chart, .chart-container .condition-chart, .chart-container .line-chart"
    ).hide(); 

  
    $(".welcome-section").show();

    
    $(".main-content").css("background-image", initialBackground);
  });

  
  $("#dashboardBtn").click(function () {
    $(".search-bar").show();
    $(".additional-options").show();
    $("#weatherWidget").hide(); 
    $(".forecast-table").hide(); 
    $(".chatbot").hide(); 
    $(".welcome-section").hide(); 
  });

  $("#tablesBtn").click(function () {
    $(".search-bar").hide();
    $(".additional-options").hide();
    $("#weatherWidget").hide(); 
    $(".forecast-table").show(); 
    $(".chatbot").show(); 
    $(".welcome-section").hide(); 
    $(".weather-container").hide();
    $(
      ".chart-container .temp-chart, .chart-container .condition-chart, .chart-container .line-chart"
    ).hide();
  });

  $("#getWeatherBtn").click(function () {
    const city = $("#cityInput").val();
    getWeatherData(city);
  });

  $("#unitToggle").click(function () {
    useCelsius = !useCelsius; 
    const city = $("#cityInput").val();
    if (city) getWeatherData(city); 
  });

  $("#geolocationBtn").click(function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherDataByCoords(lat, lon);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });

  $("#askChatbot").click(function () {
    const userInput = $("#chatInput").val().toLowerCase();

    if (userInput.includes("weather")) {
      const city = extractCityFromMessage(userInput);
      if (city) {
        getWeatherData(city, true); 
        
      } else {
        displayChatbotResponse("Please provide a city for the weather.");
      }
    } else {
      getGeminiResponse(userInput); 
    }
  });


  function extractCityFromMessage(message) {
    const cityMatch = message.match(/in\s+(\w+)/); 
    return cityMatch ? cityMatch[1] : null;
  }

  function getGeminiResponse(query) {
    const geminiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAyLAsKH0CUbO_nJmtAT1r-KMM-Ws4oVmE"; 

    $.ajax({
      url: geminiUrl,
      type: "POST",
      headers: {
        Authorization: `Bearer ${geminiApiKey}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ message: query }),
      success: function (response) {
        displayChatbotResponse(response.answer); 
      },
      error: function () {
        displayChatbotResponse("Sorry, I couldn't process that request.");
      },
    });
  }

 
  function displayChatbotResponse(responseText) {
    $(".weather-container").hide();
    $(
      ".chart-container .temp-chart, .chart-container .condition-chart, .chart-container .line-chart"
    ).hide();
    $("#chatResponse").append(`<p>${responseText}</p>`);
    $("#chatInput").val(""); 
  }

  function getWeatherData(city, fromChatbot = false) {
    $("#loadingSpinner").removeClass("hidden"); 
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${
      useCelsius ? "metric" : "imperial"
    }`;

    $.get(currentWeatherUrl, function (data) {
      $("#cityName").text(data.name);

      const weatherInfo = `
                Temperature: ${data.main.temp} °${useCelsius ? "C" : "F"},
                Weather: ${data.weather[0].description},
                Humidity: ${data.main.humidity}%,
                Wind Speed: ${data.wind.speed} m/s
            `;

      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      $("#weatherIcon").attr("src", iconUrl);

     
      const newBackgroundUrl = getBackgroundImage(data.weather[0].main);
      $(".main-content").css("background-image", newBackgroundUrl); 

      if (fromChatbot) {
        $("#answerArea").html(weatherInfo).removeClass("hidden"); 
        $(".weather-container").hide(); 
      } else {
        
        $("#currentWeather").html(weatherInfo);
        $(".weather-container").show();
        $(".chart-container").show();
        $(".temp-chart").show(); 
        $(".condition-chart").show(); 
        $(".line-chart").show(); 

        $("#weatherWidget").show(); 
        getForecastData(city); 
      }
    })
      .fail(function () {
        if (fromChatbot) {
          $("#answerArea")
            .html("City not found or API limit reached")
            .removeClass("hidden"); 
        } else {
          alert("City not found or API limit reached");
        }
      })
      .always(function () {
        $("#loadingSpinner").addClass("hidden"); 
      });
  }

  function getWeatherDataByCoords(lat, lon) {
    $("#loadingSpinner").removeClass("hidden"); 
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${
      useCelsius ? "metric" : "imperial"
    }`;

    $.get(currentWeatherUrl, function (data) {
      
      $("#cityName").text(data.name);
      $("#currentWeather").html(
        `Temperature: ${data.main.temp} °${useCelsius ? "C" : "F"}, Weather: ${
          data.weather[0].description
        }`
      );

      const newBackgroundUrl = getBackgroundImage(data.weather[0].main); 
      $(".main-content").css("background-image", newBackgroundUrl);

      $("#weatherWidget").show();

      getForecastDataByCoords(lat, lon);
    })
      .fail(function () {
        alert("Could not retrieve weather data for your location");
      })
      .always(function () {
     
        $("#loadingSpinner").addClass("hidden");
      });
  }

  function getForecastData(city) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${
      useCelsius ? "metric" : "imperial"
    }`;

    $.get(forecastUrl, function (data) {
      forecastData = data.list; 
      displayForecast(forecastData); 
      createCharts(forecastData); 
    });
  }

  function getForecastDataByCoords(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${
      useCelsius ? "metric" : "imperial"
    }`;

    $.get(forecastUrl, function (data) {
      forecastData = data.list; 
      displayForecast(forecastData); 
      createCharts(forecastData); 
    });
  }

  function displayForecast(forecastData) {
    $("#forecastTable").empty(); 
    forecastData.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString();
      const temp = entry.main.temp;
      const condition = entry.weather[0].description;

      $("#forecastTable").append(
        `<tr><td>${date}</td><td>${temp} °${
          useCelsius ? "C" : "F"
        }</td><td>${condition}</td></tr>`
      );
    });
    
    implementPagination(forecastData);
  }

  function implementPagination(forecastData) {
    const pageSize = 10;
    const pageCount = Math.ceil(forecastData.length / pageSize);
    let currentPage = 1;

    function renderPage(page) {
      $("#forecastTable").empty(); 
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const pageData = forecastData.slice(start, end);
      pageData.forEach((entry) => {
        const date = new Date(entry.dt * 1000).toLocaleDateString();
        const temp = entry.main.temp;
        const condition = entry.weather[0].description;
        $("#forecastTable").append(
          `<tr><td>${date}</td><td>${temp} °${
            useCelsius ? "C" : "F"
          }</td><td>${condition}</td></tr>`
        );
      });
    }

    $("#pagination").empty();

    
    for (let i = 1; i <= pageCount; i++) {
      $("#pagination").append(
        `<button class="pageBtn border border-white font-bold text-[#3a2e28] bg-[#D9CBA0] p-2 rounded hover:bg-[#D0C49D] transition-colors">${i}</button>`
      );
    }

    $(".pageBtn").click(function () {
      currentPage = parseInt($(this).text());
      renderPage(currentPage);
    });

    renderPage(currentPage); 
  }

  function createCharts(forecastData) {
    const labels = [];
    const temps = [];
    const conditions = {};
    forecastData.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString();
      labels.push(date);
      temps.push(entry.main.temp);
      conditions[entry.weather[0].main] =
        (conditions[entry.weather[0].main] || 0) + 1;
    });
    drawCharts(labels, temps, conditions);
  }

  function drawCharts(labels, temps, conditions) {
    const ctxTemp = document.getElementById("tempChart").getContext("2d");
    const ctxCondition = document
      .getElementById("conditionChart")
      .getContext("2d");
    const ctxLine = document.getElementById("lineChart").getContext("2d");
    
    const chartWidth = window.innerWidth < 768 ? 150 : 300; 
    const chartHeight = window.innerWidth < 768 ? 150 : 250; 

    $("#tempChart").attr("width", chartWidth).attr("height", chartHeight);
    $("#conditionChart").attr("width", chartWidth).attr("height", chartHeight);
    $("#lineChart").attr("width", chartWidth).attr("height", chartHeight);

    new Chart(ctxTemp, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temps,
            backgroundColor: "rgba(106, 90, 205, 0.7)", 
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: "black", 
            },
            grid: {
              color: "black", 
            },
          },
          y: {
            ticks: {
              color: "black", 
            },
            grid: {
              color: "black", 
            },
          },
        },
        animation: {
          delay: 100,
        },
        plugins: {
          legend: {
            labels: {
              color: "black", 
            },
          },
        },
      },
    });

    new Chart(ctxCondition, {
      type: "doughnut",
      data: {
        labels: Object.keys(conditions),
        datasets: [
          {
            data: Object.values(conditions),
            backgroundColor: [
              "rgba(100, 149, 237, 0.7)", 
              "rgba(255, 228, 196, 0.7)", 
              "rgba(255, 99, 71, 0.7)", 
            ],
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        animation: {
          delay: 100,
        },
        plugins: {
          legend: {
            labels: {
              color: "black", 
            },
          },
        },
        elements: {
          arc: {
            borderColor: "black", 
          },
        },
      },
    });

  
    new Chart(ctxLine, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temps,
            borderColor: "rgba(255, 159, 64, 1)", 
            fill: false,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: "black", 
            },
            grid: {
              color: "black", 
            },
          },
          y: {
            ticks: {
              color: "black", 
            },
            grid: {
              color: "black", 
            },
          },
        },
        animation: {
          onComplete: function () {},
        },
        plugins: {
          legend: {
            labels: {
              color: "black",
            },
          },
        },
      },
    });
  }

  function getBackgroundImage(weatherCondition) {
    switch (weatherCondition) {
      case "Clear":
        return 'url("clearSky.jpg")';
      case "Clouds":
        return 'url("cloudy.jpg")';
      case "Rain":
        return 'url("rainy.jpg")';
      default:
        return 'url("default.png")';
    }
  }

  $("#sortAscBtn").click(function () {
    forecastData.sort((a, b) => a.main.temp - b.main.temp); 
    implementPagination(forecastData); 
  });

  $("#sortDescBtn").click(function () {
    forecastData.sort((a, b) => b.main.temp - a.main.temp); 
    implementPagination(forecastData); 
  });

  $("#filterRainBtn").click(function () {
    const rainyDays = forecastData.filter(
      (entry) => entry.weather[0].main.toLowerCase() === "rain"
    );
    displayForecast(rainyDays);
  });

  function showHighestTemperature() {
    const highest = forecastData.reduce((prev, current) =>
      prev.main.temp > current.main.temp ? prev : current
    );
    const date = new Date(highest.dt * 1000).toLocaleDateString();
    $("#chatResponse").text(
      `The highest temperature is ${highest.main.temp} °${
        useCelsius ? "C" : "F"
      } on ${date}.`
    );
  }

  
  $("#showHighestTempBtn").click(showHighestTemperature);
});
