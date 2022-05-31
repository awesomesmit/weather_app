import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      // margin: "50px",
      width: 200,
    },
  },
}));

export default function Country(props) {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const classes = useStyles();

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
        color:"black"
      }}
    >
      <form className={classes.root} onSubmit={handleSubmit}>
        <br />
        <label >
          <TextField
            id="outlined-basic" label="Required" variant="outlined" size="small"
            type="text"
            placeholder="Enter Country"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </label>
        <br /><br />
        <Button  variant="contained" color="primary" disabled={!query} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
