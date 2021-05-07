import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Formik, Field, Form, FieldArray} from 'formik'
import {Avatar, CardHeader, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import { red, green } from '@material-ui/core/colors';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import DoneIcon from '@material-ui/icons/Done';

import * as yup from 'yup';

const validationSchema = yup.object({
    triggerType: yup.string().required()
})

const useStyles = makeStyles((theme) =>({
    root: {
        minWidth: 275,
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    link: { textDecoration: "none"},
    red: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        width: theme.spacing(3),
        height: theme.spacing(3)
    },
    green: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        width: theme.spacing(3),
        height: theme.spacing(3)
    }
}));

const TriggerFormCard = ({attrs, triggerTypes,onUpdate}) => {
    const classes = useStyles();
    const [triggerType, setTriggerType] = useState(null)
    const [reqParams, setReqParams] = useState([])
    const [isSaved, setIsSaved] = useState(false)
    //const reqParams = {email: ['to', 'subject', 'text'], http: ['url','method','params','body']}
    //
    const handleClick = () => {
        console.log(`You just clicked on action name: ${attrs.name}`)
    }

    const handleActionChange = (triggerTypeValue) => {
        console.log(`triggerType value changed to ${triggerTypeValue}`)
        setTriggerType(triggerTypeValue)
    }

    useEffect(() => {
        //get required parameters for the current action type
        if(triggerType) {
            console.log("making fetch request for getting required params")
            fetch(`/api/v1/triggers/params/${triggerType}`).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
                .then(function (jsonResponse) {
                    console.log("Successful req_params response:");
                    console.log(jsonResponse);
                    if (jsonResponse.data) {
                        setReqParams(jsonResponse.data);
                    } else {
                        console.error("No required params returned");
                    }
                })
                .catch(function (error) {
                    console.log(
                        "There has been a problem with your fetch operation: ",
                        error.message
                    );
                });
        }
    }, [triggerType])

    return (
        <Card className={classes.root}>
            <CardHeader

                avatar={ isSaved ?
                    <Avatar className={classes.green}>
                        <DoneIcon />
                    </Avatar>
                    :
                    <Avatar className={classes.red}>
                        <ErrorOutlineIcon />
                    </Avatar>

                }
            />
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    Trigger
                </Typography>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        triggerType: triggerType,
                        triggerConfig: {}
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(data,{setSubmitting}) => {
                        setSubmitting(true)
                        console.log("submitting data:")
                        console.log(data)
                        setIsSaved(true)
                        onUpdate(attrs.name, data)
                        setSubmitting(false)
                    }}
                >
                    {({values, isSubmitting}) => (
                        <Form >
                            <InputLabel id={'select-action-type'}>Trigger Type</InputLabel>
                            <Field id={'select-action-type'} type={'select'} name={'triggerType'} as={Select} onChange={(e) => {
                                handleActionChange(e.target.value)
                            }}>
                                {triggerTypes.map(type => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                            </Field>
                            {values.triggerType ?
                                <FieldArray name={'triggerTypes'}>
                                    {arrayHelpers => (
                                        <div>
                                            {typeof reqParams === 'string' ?
                                                <div>
                                                    <Field value={reqParams} helperText="use this path to trigger the workflow" InputProps={{
                                                        readOnly: true,
                                                    }} as={TextField}/>

                                                </div>
                                                :

                                                    reqParams.map((param, i) => {

                                                        return (
                                                            <div key={param}>
                                                                <Field placeholder={param}
                                                                       name={`triggerConfig.${param}.value`}
                                                                       as={TextField}/>

                                                            </div>
                                                        )
                                                    })
                                                }

                                        </div>
                                    )}
                                </FieldArray>
                                : <div></div> }

                            <div>
                                <Button variant="outlined" color="secondary" type={'submit'} disabled={isSubmitting}>Save</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </CardContent>
            <CardActions>

            </CardActions>
        </Card>
    );
};

export default TriggerFormCard;