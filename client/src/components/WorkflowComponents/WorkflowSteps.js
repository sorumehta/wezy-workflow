import React, { useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import WorkflowFormCard from "./WorkflowFormCard";
import TriggerFormCard from "./TriggerFormCard";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
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

export default function WorkflowSteps({
    pathName,
    workflowActions,
    triggerTypes,
    onUpdateTrigger,
    actionTypes,
    onUpdateAction,
    prevActionList,
}) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div>
            <Stepper activeStep={activeStep} orientation="vertical">
                {workflowActions[pathName].map((action) => (
                    <Step key={action.attrs.name}>
                        <StepLabel>{action.attrs.name}</StepLabel>
                        <StepContent>
                            {action.type === "trigger" ? (
                                <TriggerFormCard
                                    attrs={action.attrs}
                                    triggerTypes={triggerTypes}
                                    onUpdate={onUpdateTrigger}
                                />
                            ) : (
                                <WorkflowFormCard
                                    attrs={action.attrs}
                                    actionTypes={actionTypes}
                                    prevActions={prevActionList.slice(
                                        0,
                                        prevActionList.length - 1
                                    )}
                                    onUpdate={onUpdateAction}
                                    pathName={pathName}
                                />
                            )}
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
                                        disabled={
                                            activeStep ===
                                            workflowActions.length - 1
                                        }
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
}
