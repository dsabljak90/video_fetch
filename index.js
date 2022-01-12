/* displayButton.onclick = placeInput = document.querySelector("#place").value;
console.log(placeInput); */
const mainFetchPlace = document.querySelector(".fetch-here");
const noData = document.createElement("div");
noData.classList.add("no-data");
noData.innerHTML = `<h1> No data available, please try again or look for the another place</h1>`;

function clearBox(elementID) {
  document.getElementById(elementID).innerHTML = "";
}
const stockList = (document.getElementById("display").onclick = function () {
  clearBox("fetch");
  display(document.querySelector("#place").value);
});
function display(city) {
  async function fetchMoviesJSON() {
    url = `http://api.weatherapi.com/v1/current.json?key=23420647a7354abb83b83735212212&q=${city}&aqi=yes`;

    let response = await fetch(url);

    const wether = await response.json();

    return wether;
  }

  let wether = fetchMoviesJSON().then((wether) => {
    if (!wether.current) {
      mainFetchPlace.append(noData);
    }
    const {
      location: { name: city, country: country },
      current: {
        temp_c: temperatureInC,
        condition: { text: sky, icon: wetherPicture },
        wind_kph: windKmh,
        pressure_mb: airPressure,
        humidity: humidity,
        cloud: cloud,
      },
    } = wether;

    if (wether) {
      const displayWether = function (title, wether) {
        const wetherInfo = document.createElement("div");
        mainFetchPlace.append(wetherInfo);
        wetherInfo.classList.add(`"${title.toLowerCase()}"`);
        wetherInfo.classList.add("fetch_data");
        title !== "WetherPicture"
          ? (wetherInfo.innerHTML = `<h3>${title}:</h3><p>${wether}</p>`)
          : (wetherInfo.innerHTML = `<img src="${wether}" alt="${title}">`);
      };
      displayWether("Location", city);
      displayWether("Country", country);
      displayWether("Temperature", temperatureInC);
      displayWether("Sky", sky);
      displayWether("Wind", windKmh);
      displayWether("Air_Pressure", airPressure);
      displayWether("Humidity", humidity);
      displayWether("Clouds", cloud);
      displayWether("WetherPicture", wetherPicture);
    } else {
      console.log(`no`);
    }
  });
}
display("Prague");
