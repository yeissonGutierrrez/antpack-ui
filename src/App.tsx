import React from "react";
import { createTheme, ThemeProvider } from "@mui/system";
import Login from "./components/Login";
import Register from "./components/Register";
import { unstable_createMuiStrictModeTheme } from "@mui/material";
import * as yup from "yup";

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    primary: {
      light: "#00ff00",
      main: "#00ff00",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});


const emailRex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function App() {
  return (
    <div className="App">
      <>
        <Login
          xs={12}
          onSubmitForm={(d) => {
            alert(JSON.stringify(d, null, 2))
          }}
          btnSubmitText={"Cambiar contraseña"}
          inputs={[
            {
              label: "Email",
              name: "email",
              type: "email",
              required: true,
              validation: yup.string().matches(emailRex, 'Email no valido').required("Email requerido"),
            },
            {
              label: "Contraseña",
              name: "Password",
              type: "password",
              required: true,
              validation: yup.string().required("Contraseña requerida"),
            },
          ]}
        />
      </>

    </div>
  );
}

export default App;
