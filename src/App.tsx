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

function App() {
  return (
    <div className="App">
      <>
        <Register
          containerProps={{
            rowSpacing: 4,
            columnSpacing: 4
          }}
          xs={6}
          onSubmitForm={(d) => {
            alert(JSON.stringify(d, null, 2))
          }}
          requiredTermsAndConditions={false}
          btnSubmitText={"Cambiar"}
          inputs={[
            {
              label: "Nueva Contraseña",
              name: "password",
              type: "password",
              required: true,
              validation: yup.string().required(),
            },
            {
              label: "Confirmar contraseña",
              name: "confirmPassword",
              type: "password",
              required: true,
              validation: yup
                .string()
                .required()
                .oneOf(
                  [yup.ref("password"), null],
                  "Las contraseñas deben coincidir"
                ),
            },
          ]}
        />
      </>

    </div>
  );
}

export default App;
