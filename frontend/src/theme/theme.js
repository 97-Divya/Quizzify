import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#245F73" },     // 🌊 deep teal
    secondary: { main: "#733E24" },   // 🪵 rich brown
    background: { default: "#d6b6a6ff", paper: "#e3e3e3ff" }, // 🌫 & 🪞
  },
});

export default theme;
