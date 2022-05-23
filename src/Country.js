import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Country(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  async function fetchData() {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${query}`
    );
    const data = await response.json();
    let realResult = [];
    data.map((country) => {
      let { capital, latlng, population, flags } = country;
      realResult = [...realResult, { capital, latlng, population, flags }];
    });
    const results = realResult;
    console.log("result =>", results);
    setData(results);
    navigate("/Weather", { state: { data: data } });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;

    fetchData();
  };

  return (
    <div
      style={{
        margin: 20,
      }}
    >
      <form onSubmit={handleSubmit}>
        <br />
        <label>
          <input
            type="text"
            placeholder="Enter Country"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </label>

        <button disabled={!query} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
