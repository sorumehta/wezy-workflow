import React from "react"

import {Formik,  Form, useField} from "formik"
import {Button, TextField, Grid} from "@material-ui/core"
import * as yup from 'yup'
import {Link} from 'react-router-dom'
import BrandTitle from "./BrandTitle"


const MyTextField = ({placeholder, type, ...props}) => {
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''
    return <TextField style={{color: 'red'}} placeholder={placeholder} type={type} {...field} helperText={errorText} error={!!errorText} />
}

const validationSchema = yup.object({
    user_name: yup.string().required().max(20),
    email: yup.string().email(),
    password: yup.string().required('Password is required').min(6),
    passwordConfirmation: yup.string().when("password", {
        is: val => (val && val.length > 0),
        then: yup.string().oneOf(
            [yup.ref("password")],
            "Both password need to be the same"
        )
    })
})

function Register({history}) {
    return (
        <div className="App">
            <Grid container justify="center" alignItems="center" direction="column">
                <Grid item>
                    <BrandTitle />
                    <br />
                </Grid>
                <Grid item>
                    <h3>Create a new account</h3>
                    <Formik
                        validateOnChange={true}
                        initialValues={{ user_name: '', email: ''}}
                        validationSchema={validationSchema}
                        onSubmit={(data, {setSubmitting}) => {
                            setSubmitting(true)
                            console.log("Values submitted:")
                            console.log(data)
                            fetch('/api/v1/auth/register',{
                                method: 'POST',
                                headers: {'Content-Type': 'application/json' },
                                body: JSON.stringify({username: data.user_name, email: data.email,
                                    password: data.password})})
                                .then(function(response) {
                                    setSubmitting(false)
                                    if(response.ok) {
                                        return response.json();
                                    }
                                    throw new Error('Network response was not ok.');
                                }).then(function(jsonResponse) {
                                console.log("Successful response:")
                                console.log(jsonResponse)
                                history.push(`/login`)
                            }).catch(function(error) {
                                console.log('There has been a problem with your fetch operation: ',
                                    error.message);
                            });

                        }}
                    >
                        {({values, errors, isSubmitting}) => (
                            <Form >
                                <MyTextField placeholder="username" name="user_name" type="input" as={TextField} />
                                <div>
                                    <MyTextField placeholder="Email" name="email" type="input" as={TextField} />
                                </div>
                                <div>
                                    <MyTextField placeholder="Password" name="password" type="password" as={TextField} />
                                </div>
                                <div>
                                    <MyTextField placeholder="Confirm Password" name="passwordConfirmation" type="password" as={TextField} />
                                </div>
                                <br />
                                <div>
                                    <Button variant="contained" color="primary" disabled={isSubmitting} type="submit">Submit</Button>
                                </div>
                                <br />
                                <div>
                                    Already have an account? <Link to="/login">Login</Link>
                                </div>

                            </Form>
                        )}</Formik>
                </Grid>
            </Grid>
        </div>
    );
}

export default Register;
