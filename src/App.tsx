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

      {
        // register nuevo usuario
      }
      {/* <>
        <Register
          onSubmitForm={(d) => {




            console.log(d);
          }}
          requiredTermsAndConditions={true}
          inputs={[
            {
              label: "Nombre",
              name: "name",
              type: "text",
              required: true,

              validation: yup.string().required("Este campo es requerido"),
            },
            {
              label: "Apellido",
              name: "lasName",
              type: "text",
              required: true,
              validation: yup.string().required(),
            },
            {
              label: "Correo",
              name: "email",
              type: "email",
              required: true,
              validation: yup.string().required().email(),
            },
            {
              label: "Contraseña",
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
            {
              label: "Tipo de persona",
              name: "personType",
              type: "text",
              required: true,
              defaulValue: "1",
              options: [
                {
                  label: "NATURAL",
                  value: "1",
                },
                {
                  label: "JURIDICA",
                  value: "2",
                },
              ],
              // validation: yup.string().required()
            },
            {
              label: "Tipo de persona",
              name: "personType",
              type: "text",
              required: true,
              defaulValue: "1",
              options: [
                {
                  label: "NATURAL",
                  value: "1",
                },
                {
                  label: "JURIDICA",
                  value: "2",
                },
              ],
              // validation: yup.string().required()
            },
          ]}
        />
      </> */}

      <>
        <Register
          xs={12}
          onSubmitForm={(d) => {
            alert(JSON.stringify(d, null, 2))
          }}
          requiredTermsAndConditions={false}
          btnSubmitText={"Cambiar contraseña"}
          inputs={[
            {
              label: "Contraseña anterior",
              name: "previusPassword",
              type: "password",
              required: true,
              validation: yup.string().required("Este campo es requerido"),
            },
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
      <ThemeProvider theme={theme}>{/* <Login/> */}</ThemeProvider>
    </div>
  );
}

export default App;
