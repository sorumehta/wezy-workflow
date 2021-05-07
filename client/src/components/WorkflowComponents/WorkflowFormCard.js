import React, {useContext, useEffect, useState} from 'react';
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
import {UserContext} from "../../UserContext";

const validationSchema = yup.object({
    actionType: yup.string().required()
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

const WorkflowFormCard = ({attrs, actionTypes, prevActions, onUpdate}) => {
    const classes = useStyles();
    const [actionType, setActionType] = useState(null)
    const [reqParams, setReqParams] = useState([])
    const [isSaved, setIsSaved] = useState(false)
    const { user } = useContext(UserContext);
    //const reqParams = {email: ['to', 'subject', 'text'], http: ['url','method','params','body']}
    //
    console.log(`actionTypes : ${actionTypes}`)

    const handleActionChange = (actionTypeValue) => {
        console.log(`actionType value changed to ${actionTypeValue}`)
        setActionType(actionTypeValue)
    }

    useEffect(() => {
        //get required parameters for the current action type
        if(actionType) {
            if (user) {
                const bearer = "Bearer " + user.token;
                const headers = {
                    Authorization: bearer,
                    "Content-Type": "application/json",
                };
                console.log("making fetch request for getting required params")
                fetch(`/api/v1/actions/params/${actionType}`, {headers: headers}).then(response => {
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
        }
    }, [actionType])

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
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        actionType: actionType,
                        actionConfig: {}
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(data,{setSubmitting}) => {
                        setSubmitting(true)
                        // do stuff
                        setIsSaved(true)
                        onUpdate(attrs.name, data)
                        setSubmitting(false)
                    }}
                >
                    {({values, isSubmitting}) => (
                        <Form >
                            <InputLabel id={'select-action-type'}>Action Type</InputLabel>
                            <Field id={'select-action-type'} type={'select'} name={'actionType'} as={Select} onChange={(e) => {
                                handleActionChange(e.target.value)
                            }}>
                                {actionTypes.map(type => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                            </Field>
                            {values.actionType ?
                            <FieldArray name={'actionTypes'}>
                                {arrayHelpers => (
                                    <div>
                                        {reqParams.map((param,i) => {

                                            return (
                                                <div key={param}>

                                                    <Field type={'select'} name={`actionConfig.${param}.inputType`}  defaultValue={'manual'} as={Select} >
                                                        {prevActions.map(prevAction => (
                                                            <MenuItem key={prevAction} value={prevAction}>{prevAction}</MenuItem>
                                                        ))}
                                                    </Field>
                                                    <Field placeholder={param} name={`actionConfig.${param}.value`} as={TextField} />
                                                </div>
                                            )
                                        })}
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

export default WorkflowFormCard;