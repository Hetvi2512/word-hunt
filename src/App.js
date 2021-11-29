import { Container, Switch, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Definition from "./components/Definition";
import Header from "./components/Header";

function App() {
  const [word, setWord] = useState("");
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState(false);
  useEffect(() => {
    dictionary();
    // eslint-disable-next-line
  }, [word, category]);
  const dictionary = () => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`)
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };
  const DarkMode = withStyles({
    switchBase: {
      color: grey[50],
      "&$checked": {
        color: grey[900],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: lightMode ? "#fff" : "#282c34",
        color: lightMode ? "black" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <span>{lightMode ? "Dark" : "Light"} Mode</span>
          {
            <DarkMode
              checked={lightMode}
              onChange={() => setLightMode(!lightMode)}
            />
          }
        </div>
        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          lightMode={lightMode}
        />
        {data && (
          <Definition
            data={data}
            word={word}
            category={category}
            lightMode={lightMode}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
