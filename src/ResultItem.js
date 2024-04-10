import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

function ResultItem({ number, input }) {
  const [result, setResult] = useState([]);
  const numbers = number.split("");
  useEffect(() => {
    setResult(
      input.split("").map((digit, index) => {
        if (digit === numbers[index]) {
          return { digit, color: "rgba(68, 206, 27, 0.75)" };
        } else if (numbers.includes(digit)) {
          return { digit, color: "rgba(247, 227, 121, 0.75)" };
        } else {
          return { digit, color: "rgba(229, 31, 31, 0.75)" };
        }
      })
    );
  }, []);

  return (
    <Stack
      container
      spacing={2}
      direction="row"
      sx={{ gap: 2, justifyContent: "center", alignContent: "center" }}
    >
      {result.map(({ digit, color }, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: color,
            border: "1px solid black",
            borderRadius: "5px",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant="outlined"
        >
          {digit}
        </Box>
      ))}
    </Stack>
  );
}
export { ResultItem };
