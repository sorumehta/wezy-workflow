import React, {useEffect, useState} from 'react';
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import TriggerFormCard from "./TriggerFormCard";
import WorkflowFormCard from "./WorkflowFormCard";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import ActionDetailsCard from "./ActionDetailsCard";
import {useParams} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));


const WorkflowDetails = ({name, config}) => {
    const {workflow_id} = useParams()
    console.log(`workflow_id from useParams = ${workflow_id}`)
    const [workflow, setWorkflow] = useState(null)
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();
    const { account_id } = useParams();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        fetch(`/api/v1/accounts/${account_id}/workflows/${workflow_id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(function (jsonResponse) {
                console.log("Successful trigger types response:");
                console.log(jsonResponse);
                if (jsonResponse.data) {
                    setWorkflow(jsonResponse.data);
                } else {
                    console.error("ERROR no workflows returned from server");
                }
            })
            .catch(function (error) {
                console.log(
                    "There has been a problem with your fetch trigger operation: ",
                    error.message
                );
            });
    },[])

    let workflowActions = []
    if(workflow){
        console.log('workflow detail:')
        console.log(workflow)
        workflowActions = [...workflow.workflow.triggers, ...workflow.workflow.actions]
        console.log("workflow detail actions:")
        console.log(workflowActions)
    }


    return (
        <div>
            <Typography >
                {workflow ? workflow.workflow.name : ""}
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
                {workflowActions.map((action, index) => (
                    <Step key={action.name}>
                        <StepLabel>{action.name}</StepLabel>
                        <StepContent>

                            <ActionDetailsCard name={action.name} type={action.type} config={action.config}/>

                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        disabled={activeStep === workflowActions.length - 1}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default WorkflowDetails;