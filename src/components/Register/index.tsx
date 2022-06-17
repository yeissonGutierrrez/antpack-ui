import React from "react";
import { Button, Checkbox, Grid, MenuItem, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from '@mui/material/FormHelperText';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { AnySchema } from "yup";

import styles from "./style.module.css";

interface InputProp {
  name: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  required?: boolean;
  defaulValue?: any;
  options?: {
    label: string;
    value: string;
  }[]
  validation?: AnySchema;
}

interface RegisterProps {
  inputs?: InputProp[];
  onSubmitForm?: (data: any) => void;
  requiredTermsAndConditions?: boolean;

  xs?: number;
  termsAndConditionsText?: string
  btnSubmitText?: string
}

const Register = ({
  inputs = [],
  onSubmitForm = (data) => { console.log(data) },
  requiredTermsAndConditions = true,
  xs=6,
  termsAndConditionsText = "Acepto los terminos y condiciones",
  btnSubmitText = "Registrarse"
}: RegisterProps) => {


  const inputsSchemas = inputs.reduce((acc, inputData) => {
    return {
      ...acc,
      [inputData.name]: inputData.validation,
    };
  }, {
    // si require que se acepten terminos y condiones, se deben validar mediante react hook forms 
    termsAndConditions: requiredTermsAndConditions ?  yup.boolean().oneOf([true]).required() : yup.boolean()
  })

  const validationSchema = yup.object({
    ...inputsSchemas,
  });

  // console.log(validationSchema)

  const { handleSubmit, formState, control, setValue, getValues  } = useForm({
    resolver: yupResolver(validationSchema!),
  });

  // const { _formValues  } = control
  const { errors,  } = formState;

  const onSubmit = handleSubmit((data) => {
    onSubmitForm(data);
  });

    return (
      <div className={styles.container}>
        <form onSubmit={onSubmit}>
          <Grid container rowSpacing={2} columnSpacing={2}>
            {inputs.map((input, inputIndex) => {
              const { label, name: nameData, type, required, defaulValue, options = [] } = input;
              const isSelect = options.length > 0
              return (
                <Grid item xs={xs} key={inputIndex}>
                  <Controller
                    control={control}
                    name={nameData}
                    defaultValue={defaulValue}
                    render={({ field }) => {
                      const { name, onBlur, onChange, value } = field;
                      return (
                        <TextField
                          key={name}
                          required={required}
                          // placeholder=""
                          name={name}
                          label={label}
                          type={type}
                          onBlur={onBlur}
                          value={value}
                          select={isSelect}
                          onChange={(e) => {
                            onChange(e);
                          }}
                          fullWidth
                          error={Boolean(errors[name])}
                          helperText={errors[name]?.message}
                        >
                        {
                          isSelect && (
                            options.map(opt => {
                              return (
                                <MenuItem value={opt.value} key={value}>
                                  {opt.label}
                                </MenuItem>
                              )
                            })
                          )
                        }
                        </TextField>
                      );
                    }}
                  />
                </Grid>
              );
            })}
            {
              requiredTermsAndConditions && (
                <Grid item xs={12}>
                  <Controller
                    name="termsAndConditions"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...field}
                              onChange={(e) => {
                                setValue('termsAndConditions', e.target.checked)
                              }}
                              checked={field.value}
                              required
                            />
                          }
                          label={termsAndConditionsText}
                        />
                      );
                    }}
                  />
                </Grid>
              )
            }
          
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="outlined" type={"submit"}>
                  {btnSubmitText}
                </Button>
              </div>
            </Grid>
            {
              JSON.stringify(getValues(), null, 2)
            }
          </Grid>
        </form>
      </div>
    );
};

export default Register;
