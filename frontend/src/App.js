import React, { useState, createContext } from "react";
import routes from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

export const ThemeContext = createContext();

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const palettes = {
    light: {
      primary: {
        light: "#dd3FD0",
        main: "#ffffff",
      },
      secondary: {
        light: "#ffffff",
        main: "#376FD0",
      },
      background: {
        default: "#F7F9FC",
        paper: "#ffffff",
      },
      text: {
        primary: "#d1fffff",
        secondary: "red",
      },
      divider: "#ffffff",
      icon: "#9E9E9E",
    },
    dark: {
      primary: {
        light: "#376FD0",
        main: "#1B2635",
      },
      secondary: {
        main: "#376FD0",
      },
      background: {
        default: "#1B2635",
        paper: "#233044",
      },
      text: {
        primary: "#ffffff",
        secondary: "#9E9E9E",
      },
      divider: "#424242",
      icon: "#E0E0E0",
    },
  };

  const theme = createTheme({
    palette: darkMode ? palettes.dark : palettes.light,
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputLabel-root": {
              color: darkMode ? "#b2b2b2" : "#000000", // Label color
              "&.Mui-focused": {
                color: darkMode ? "#ffffff" : "#000000", // Focused label color
              },
            },
            "& .MuiInputBase-input": {
              color: darkMode ? "#ffffff" : "#000000", // Text color
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: darkMode ? "#b2b2b2" : "#000000", // Border color
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: darkMode ? "#ffffff" : "#000000", // Focused border color
              },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: darkMode ? "#ff9800" : "#000000", // Hover border color
            },
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#233044" : "#ffffff", // Table background
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: darkMode ? "#ffffff" : "#000000", // Text color in table cells
            borderColor: darkMode ? "#424242" : "#e0e0e0", // Border color in table cells
          },
          head: {
            backgroundColor: darkMode ? "#233044" : "#ffffff", // Table header background
            color: darkMode ? "#ffffff" : "#000000", // Table header text color
          },
          body: {
            backgroundColor: darkMode ? "#233044" : "#ffffff", // Table body background
            color: darkMode ? "#ffffff" : "#000000", // Table body text color
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeContext.Provider value={theme}>
          <Router>
            <Sidebar
              check={darkMode}
              change={() => setDarkMode(!darkMode)}
              theme={theme}
            >
              <Routes>
                {routes.map((route, index) => (
                  <Route key={index} {...route} />
                ))}
              </Routes>
            </Sidebar>
          </Router>
        </ThemeContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
