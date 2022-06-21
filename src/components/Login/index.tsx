import { Button, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { spacing, ThemeProvider } from '@mui/system';
import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import type { AnySchema } from "yup";
import styles from "./style.module.css";


    // const schema = yup.object({
    //     email: yup.string().matches( emailRex, 'debe ser caracter valido').required('hola esto es requerido'),
    // }).required();


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

    interface LoginProps {
        inputs?: InputProp[];
        onSubmitForm?: (data: any) => void;
        saveUser?: boolean;
        xs?: number;
        saveUserText?: string
        btnSubmitText?: string
    }

    const Login = ({
        inputs = [],
        onSubmitForm = (data) => { console.log(data) },
        saveUser = true,
        xs=6,
        saveUserText = "Mantener seccion iniciada",
        btnSubmitText = "Registrarse"
    }: LoginProps) => {

    const inputsSchemas = inputs.reduce((acc, inputData) => {
        return {
        ...acc,
        [inputData.name]: inputData.validation,
        };
    }, {
        // si require que se acepten terminos y condiones, se deben validar mediante react hook forms 
        saveUserText: saveUser ?  yup.boolean().oneOf([true]).required() : yup.boolean()
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
                saveUser && (
                    <Grid item xs={12}>
                    <Controller
                        name="saveUser"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => {
                        return (
                            <FormControlLabel
                            control={
                                <Checkbox
                                {...field}
                                onChange={(e) => {
                                    setValue('saveUser', e.target.checked)
                                }}
                                checked={field.value}
                                />
                            }
                            label={saveUserText}
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
    )
}

export default Login