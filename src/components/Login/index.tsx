import { Box, Card, Grid, Input, Select, TextField } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import { spacing, ThemeProvider } from '@mui/system';
import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const schema = yup.object({
    firstName: yup.string().matches(/^[A-Za-z]+$/i, 'debe ser caracter valido').required('hola esto es requerido'),
    age: yup.number().positive().integer().required(),
  }).required();

const Login = (data: any) => {
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
      const onSubmit = (data: any )=> console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
                <Grid xs={12} sm={6}>
                    <TextField
                        label='hola mjndo'
                        fullWidth
                        {...register("firstName")}
                        />
                        <p>{errors.firstName?.message}</p>
                </Grid>
                <Grid xs={12} sm={6}>
                    <TextField
                        label='hola mjndo'
                        fullWidth
                        {...register("firstName")}
                        />
                        <p>{errors.firstName?.message}</p>
                </Grid>
            </Grid>
            <TextField type="submit" />
        </form>
      
    )
}

export default Login