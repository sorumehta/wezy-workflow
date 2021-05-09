import React, { useContext, useEffect, useState } from "react";
import WorkflowFormCard from "./WorkflowComponents/WorkflowFormCard";
import TriggerFormCard from "./WorkflowComponents/TriggerFormCard";
import AddWorkflowAction from "./WorkflowComponents/AddWorkflowAction";
import WorkflowSteps from "./WorkflowComponents/WorkflowSteps";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

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

const NewWorkflow = () => {
    const [triggers, setTriggers] = useState([]);
    const [actions, setActions] = useState([]);
    const [links, setLinks] = useState({ start: {} });
    const [activeStep, setActiveStep] = useState(0);
    const [prevActionList, setPrevActionList] = useState(["manual", "start"]);
    const [actionTypes, setActionTypes] = useState([]);
    const [triggerTypes, setTriggerTypes] = useState([]);
    const { account_id } = useParams();
    const { user } = useContext(UserContext);

    const classes = useStyles();

    useEffect(() => {
        if (user) {
            const bearer = "Bearer " + user.token;
            const headers = {
                Authorization: bearer,
                "Content-Type": "application/json",
            };
            fetch("/api/v1/actions", { headers: headers })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Network response was not ok.");
                })
                .then(function (jsonResponse) {
                    console.log("Successful response:");
                    console.log(jsonResponse);
                    if (jsonResponse.data) {
                        setActionTypes(jsonResponse.data);
                    } else {
                        console.error(
                            "ERROR no action types returned from server"
                        );
                    }
                })
                .catch(function (error) {
                    console.log(
                        "There has been a problem with your fetch operation: ",
                        error.message
                    );
                });

            fetch("/api/v1/triggers", { headers: headers })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Network response was not ok.");
                })
                .then(function (jsonResponse) {
                    console.log("Successful trigger types response:");
                    console.log(jsonResponse);
                    if (jsonResponse.data) {
                        setTriggerTypes(jsonResponse.data);
                    } else {
                        console.error(
                            "ERROR no action types returned from server"
                        );
                    }
                })
                .catch(function (error) {
                    console.log(
                        "There has been a problem with your fetch trigger operation: ",
                        error.message
                    );
                });
        }
    }, []);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onAddAction = (thisActionName, isTrigger) => {
        console.log("**************onAddChild***********");
        console.log(
            `thisActionName = ${thisActionName}, isTrigger = ${isTrigger}`
        );
        if (isTrigger) {
            console.log("setting trigger...");
            setTriggers([
                ...triggers,
                { type: null, name: thisActionName, is_async: false },
            ]);
        } else {
            console.log("setting action...");
            let prevLink = "";
            if (prevActionList.length === 2) {
                prevLink = "start";
            } else {
                prevLink = prevActionList[prevActionList.length - 1];
            }
            setPrevActionList([...prevActionList, thisActionName]);
            console.log(`prevLink: ${prevLink}`);
            setLinks((old_links) => {
                console.log("prevLinks");
                console.log(old_links);
                old_links[prevLink] = { next: thisActionName };
                old_links[thisActionName] = { next: "nil" };
                console.log("newLinks:");
                console.log(old_links);
                return old_links;
            });
            setActions([
                ...actions,
                { name: thisActionName, type: null, config: {} },
            ]);
        }
        console.log("triggers:");
        console.log(triggers);
        console.log("actions:");
        console.log(actions);
    };

    const onUpdateAction = (actionName, data) => {
        console.log(
            `called onUpdateAction for action name: ${actionName} and data:`
        );
        console.log(data);
        setActions((actn) => {
            const actionIdx = actn.findIndex((act) => act.name === actionName);
            console.log(`action index = ${actionIdx}`);
            actn[actionIdx].type = data.actionType;
            actn[actionIdx].config = data.actionConfig;
            return actn;
        });
        console.log("current action data:");
        console.log(actions);
    };

    const onUpdateTrigger = (triggerName, data) => {
        console.log(`called onUpdateTrigger with data`);
        console.log(data);
        setTriggers((trig) => {
            trig[0].type = data.triggerType;
            trig[0].config = data.triggerConfig;
            return trig;
        });
        console.log("current trigger data:");
        console.log(triggers);
    };

    const saveWorkflow = () => {
        const workflow = {};
        workflow.triggers = triggers;
        const name = triggers[0].name;
        workflow.actions = [];
        actions.forEach((actn) => {
            let thisAction = {};
            thisAction.name = actn.name;
            thisAction.type = actn.type;
            thisAction.config = {};
            Object.keys(actn.config).forEach((paramKey) => {
                let configObj = actn.config[paramKey];
                if (
                    configObj.hasOwnProperty("inputType") &&
                    configObj.inputType !== "manual"
                ) {
                    thisAction.config[
                        paramKey
                    ] = `__${configObj.inputType}.${configObj.value}`;
                } else {
                    thisAction.config[paramKey] = configObj.value;
                }
            });
            workflow.actions.push(thisAction);
        });
        workflow.links = links;
        console.log("submitting workflow:");
        console.log(workflow);
        if (user) {
            const bearer = "Bearer " + user.token;
            const headers = {
                Authorization: bearer,
                "Content-Type": "application/json",
            };
            fetch(`/api/v1/accounts/${account_id}/workflows`, {
                method: "POST",
                body: JSON.stringify({ workflow, name }),
                headers: headers,
            }).then((response) => {
                if (response.ok) {
                    console.log("workflow submitted successfully");
                } else {
                    console.error(
                        `ERROR while posting workflow: ${response.status}`
                    );
                }
            });
        }
    };

    const getActionAttrs = (actionName) => {
        for (let j = 0; j < actions.length; j++) {
            if (actions[j].name === actionName) {
                return actions[j];
            }
        }
        console.error(`ERROR: action ${actionName} not found in actions list`);
    };

    const createWorkflowPaths = (workflowActions, path, startAction) => {
        if (triggers.length > 0) {
            let nextAction = startAction;
            //if its the start of the workflow chain, push the trigger and go to next action
            if (startAction === "start") {
                nextAction = links.start.next;
                workflowActions[path].push({
                    type: "trigger",
                    attrs: triggers[0],
                });
            }
            console.log("STARTING PATH CREATION");
            console.log(`with action = ${nextAction}`);
            if (nextAction) {
                while (nextAction && nextAction !== "nil") {
                    console.log(`nextAction = ${nextAction}`);
                    let actionAttrs = getActionAttrs(nextAction);
                    if (actionAttrs.type !== "condition") {
                        workflowActions[path].push({
                            type: "action",
                            attrs: actionAttrs,
                        });

                        // if the next action is a condition, then call the function recursively with the new paths (for true and false each)
                    } else {
                        if (!workflowActions.hasOwnProperty("path_t")) {
                            workflowActions.path_t = [];
                        }
                        if (!workflowActions.hasOwnProperty("path_f")) {
                            workflowActions.path_f = [];
                        }
                        console.log(
                            "calling path creation function for " +
                                String(links[nextAction].next_t)
                        );
                        createWorkflowPaths(
                            workflowActions,
                            "path_t",
                            links[nextAction].next_t
                        );
                        console.log(
                            "calling path creation function for " +
                                String(links[nextAction].next_f)
                        );
                        createWorkflowPaths(
                            workflowActions,
                            "path_f",
                            links[nextAction].next_f
                        );
                    }
                    nextAction = links[nextAction].next;
                }
            }

            console.log("workflowActions: ");
            console.log(workflowActions);
        }
    };
    const workflowActions = { main: [] };
    createWorkflowPaths(workflowActions, "main", "start");

    return (
        <div>
            <WorkflowSteps 
            pathName="main"
            workflowActions={workflowActions}
            triggerTypes={triggerTypes}
            onUpdateTrigger={onUpdateTrigger}
            actionTypes={actionTypes}
            onUpdateAction={onUpdateAction}
            prevActionList={prevActionList}
            />
            <AddWorkflowAction onAdd={onAddAction} />
            <Divider />
            <br />
            <Button
                variant="contained"
                size="large"
                color="primary"
                id={"submitworkflow"}
                onClick={() => saveWorkflow()}
            >
                Submit
            </Button>
        </div>
    );
};

export default NewWorkflow;
