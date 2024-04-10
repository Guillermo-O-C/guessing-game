import "./App.css";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ResultItem } from "./ResultItem";
import { useState } from "react";

var rn = require("random-number");
var gen = rn.generator({
  min: 10000,
  max: 99999,
  integer: true,
});

function App() {
  const [state, setState] = useState({
    attempts: [],
    error: false,
    value: "",
    win: false,
    objective: gen(),
  });
  const onSubmitAttempt = (e) => {
    e.preventDefault();
    const { value, attempts } = state;
    if (value.length !== 5) {
      setState({ ...state, error: true });
      return;
    }
    setState({
      ...state,
      attempts: [...attempts, value],
      error: false,
      value: "",
    });
  };
  const onRestart = () => {
    setState({
      attempts: [],
      error: false,
      value: "",
      win: false,
      objective: gen(),
    });
  };
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,700;1,700&display=swap"
        rel="stylesheet"
      />
      <title>Guess the number</title>
      <div className="title-bar">
        <h1>Guess the number</h1>
      </div>
      <Container
        maxWidth="md"
        component="form"
        onSubmit={(e) => onSubmitAttempt(e)}
      >
        <Stack
          container
          spacing={2}
          sx={{
            justifyContent: "center",
            alignContent: "center",
            marginTop: "20px",
          }}
        >
          <TextField
            variant="outlined"
            sx={{
              alignSelf: "center",
              fontSizeAdjust: true,
              md: { width: "25%" },
              xs: { width: "50%" },
            }}
            label="Enter a number"
            value={state.value}
            error={state.error}
            disabled={state.win}
            helperText={state.error ? "Please enter a 5 digit number" : ""}
            onChange={(e) => setState({ ...state, value: e.target.value })}
            inputProps={{ maxLength: 5, inputMode: "numeric" }}
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            disabled={state.win}
            sx={{
              width: {
                xs: "100%",
                md: "50%",
              },
              alignSelf: "center",
            }}
          >
            Submitt attempt
          </Button>
          <Stack container spacing={1}>
            {state.attempts.map((attempt, index) => {
              if (attempt === state.objective.toString()) state.win = true;
              return (
                <ResultItem
                  number={`${state.objective}`}
                  input={`${attempt}`}
                  key={index}
                />
              );
            })}
          </Stack>
          {state.win && <p className="win-notice">Congratulations, you won!</p>}
          <Button
            variant="outlined"
            onClick={() => onRestart()}
            sx={{
              width: {
                xs: "100%",
                md: "50%",
              },
              alignSelf: "center",
            }}
          >
            Restart
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default App;
