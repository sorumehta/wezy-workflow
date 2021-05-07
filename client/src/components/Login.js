import React, {useContext} from "react"


import {Formik,  Form, useField} from "formik"
import {Button, TextField, Grid} from "@material-ui/core"
import * as yup from 'yup'
import {Link} from 'react-router-dom'
//import {UserContext} from "../UserContext"
import BrandTitle from "./BrandTitle"

const MyTextField = ({placeholder, type, ...props}) => {
    const [field, meta] = useField(props)
    const errorText = meta.error && meta.touched ? meta.error : ''
    return <TextField style={{color: 'red'}} placeholder={placeholder} type={type} {...field} helperText={errorText} error={!!errorText} />
}

const validationSchema = yup.object({
    email: yup.string().email(),
    password: yup.string().required('Password is required')
})

function Login({history}) {
    //const {user, setUser} = useContext(UserContext)
    return (
        <div className="App"
        >
            <Grid container justify="center" alignItems="center" direction="column">
                <Grid item>
                    <BrandTitle />
                    <br />
                </Grid>
                <Grid item>
                    <h3>Login:</h3>
                    <Formik
                        validateOnChange={true}
                        initialValues={{ email: '', password: ''}}
                        validationSchema={validationSchema}
                        onSubmit={(data, {setSubmitting}) => {
                            setSubmitting(true)
                            console.log("Values submitted:")
                            console.log(data)
                            fetch('/api/v1/auth/login',{
                                method: 'POST',
                                headers: {'Content-Type': 'application/json' },
                                body: JSON.stringify({ email: data.email, password: data.password })
                            }).then(function(response) {
                                setSubmitting(false)
                                if(response.ok) {
                                    return response.json();
                                }
                                throw new Error('Network response was not ok.');
                            }).then(function(jsonResponse) {
                                console.log("Successful response:")
                                console.log(jsonResponse)
                                // const {user_name, user_email, user_id, token} = jsonResponse.data
                                // setUser({user_name, user_email, user_id, token})
                                if(jsonResponse.data.id){
                                    const account_id = jsonResponse.data.id
                                    history.push(`/accounts/${account_id}`)
                                }
                                else{
                                    alert("You are no longer associated with any account")
                                }
                            }).catch(function(error) {
                                console.log('There has been a problem with your fetch operation: ',
                                    error.message);
                            });

                        }}
                    >
                        {({values, errors, isSubmitting}) => (
                            <Form >
                                <div>
                                    <MyTextField placeholder="Email" name="email" type="input" as={TextField} />
                                </div>

                                <div>
                                    <MyTextField placeholder="Password" name="password" type="password" as={TextField} />
                                </div>

                                <br />
                                <div>
                                    <Button variant="contained" color="primary" disabled={isSubmitting} type="submit">Login</Button>
                                </div>
                                <br />
                                {/*<div>*/}
                                {/*    Need to create a new account? <Link to="/register" style={{ color: '#FFF' }}>Register</Link>*/}
                                {/*</div>*/}

                            </Form>
                        )}</Formik>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;
