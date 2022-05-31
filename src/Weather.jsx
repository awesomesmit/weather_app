import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-ui/core";

const Weather = () => {
  const [data, setData] = useState([]);
  const [clickedCountry, setClicketCountry] = useState("");
  const location = useLocation();
  let events_data = location.state.data;
  const handleSelectCountry = async (country) => {
    setClicketCountry(country);
    console.log("click thau.......");
    let response = await axios.get(
      `http://api.weatherstack.com/current?access_key=5b9621f35a6486b1f53e5954e3df897f&query=${country.capital[0]}`
    );
    setData(response.data.current);
  };

  return (
    <div>
      {events_data &&
        events_data.map((country, index) => (
          <div className="country-data">
            <p>Country: {country.name.official}</p>
            <p>Capital City: {country.capital}</p>
            <p>Population: {country.population}</p>
            <p>Latlang:{country.latlng}</p>
            <img
              height="auto"
              width="320px"
              alt="country flag"
              src={`${country.flags.svg}`}
            />
            <br />

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSelectCountry(country, index)}
            >
              Capital Weather
            </Button>
            {console.log("data", data)}
            {/* {data === {} ? (
              <div>
                <p>temperature: {data} Celcius</p>
                <p>Wind Speed: {data.wind_speed} mph</p>
                <p>precip: {data.precip}</p>
                </div>
                ) : (
                  console.log("reached here.............................")
                )} */}
            { country === clickedCountry && data.length !== 0 ? (
              <div>
                <p>temperature: {data.temperature} Celcius</p>
                <img src={data.weather_icons} alt="Temp Icon" />
                <p>Wind Speed: {data.wind_speed} mph</p>
                <p>precip: {data.precip}</p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Weather;
