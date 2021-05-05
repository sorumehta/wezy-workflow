import React, {useEffect, useState} from 'react';
import WorkflowFormCard from "./WorkflowComponents/WorkflowFormCard";
import AddWorkflowAction from "./WorkflowComponents/AddWorkflowAction";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';


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


const NewWorkflow = () => {
    // const triggers = [{name: 'new_workflow', type: 'webhook'}]
    // const actions = [{name: 'add_new_User', type: 'add_user', config: {'username': 'Subodh'}},
    //     {name: 'send_email_User', type:'send_email', config: {from:'soru.mehta', to: 'subodh.mehra'}},
    //     {name: 'post_to_CRM', type:'post_to_CRM', config: {url: 'localhost:7890/users'}}]
    // const links = {start: {next: 'add_new_User'}, add_new_User: {next: 'send_email_User'}, send_email_User: {next: 'post_to_CRM'}, post_to_CRM: {next: 'nil'} }
    const [triggers, setTriggers] = useState([])
    const [actions, setActions] = useState([])
    const [links, setLinks] = useState({start: {}})
    const [workflowName, setWorkflowName] = useState("")
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [prevAction, setPrevAction] = React.useState(null);


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const onAddAction = (thisActionName, isTrigger) => {
        console.log("**************onAddChild***********")
        console.log(`thisActionName = ${thisActionName}, isTrigger = ${isTrigger}`)
        if(isTrigger){
            console.log("setting trigger...")
            setTriggers([...triggers, {type: null, name:thisActionName, is_async: false}])

        } else{
            console.log("setting action...")
            let prevLink = ""
            if(prevAction === null){
                prevLink = "start"
            } else{
                prevLink = prevAction
            }
            setPrevAction(thisActionName)
            console.log(`prevLink: ${prevLink}`)
            setLinks(old_links => {
                console.log("prevLinks")
                console.log(old_links)
                old_links[prevLink] = {next: thisActionName}
                old_links[thisActionName] = {next: 'nil'}
                console.log("newLinks:")
                console.log(old_links)
                return old_links
            })
            setActions([...actions, {name: thisActionName, type: null, config: {}}])

        }
        console.log("triggers:")
        console.log(triggers)
        console.log("actions:")
        console.log(actions)

    }

    const onUpdateAction = (actionName, params) => {

    }
    
    const getActionAttrs = (actionName) => {
        for(let j=0; j < actions.length; j++){
            if(actions[j].name === actionName){
                return actions[j]
            }
        }
        console.error(`ERROR: action ${actionName} not found in actions list`)
    }
    
    const workflowActions = [];
    if(triggers.length > 0){
        workflowActions.push({type:'trigger', attrs: triggers[0] })
        let nextAction = links.start.next
        console.log(`nextAction = ${nextAction}`)
        if(nextAction){
            while (nextAction !== 'nil') {
                console.log(`nextAction = ${nextAction}`)
                let actionAttrs = getActionAttrs(nextAction)
                workflowActions.push({type: 'action', attrs: actionAttrs});
                nextAction = links[nextAction].next
            };
        }

        console.log('workflowActions: ')
        console.log(workflowActions)
    }
    

    return (
        <div>
            <Stepper activeStep={activeStep} orientation="vertical">
                {workflowActions.map((action, index) => (
                    <Step key={action.attrs.name}>
                        <StepLabel>{action.attrs.name}</StepLabel>
                        <StepContent>
                            <WorkflowFormCard type={action.type} attrs={action.attrs} />
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
            <AddWorkflowAction onAdd={onAddAction} onUpdate={onUpdateAction}/>
            <Divider />
            <br />
            <Button variant="contained" size="large" color="primary" id={"submitworkflow"} onClick={() => console.log("submitted")}>Submit</Button>

        </div>
    );
};

export default NewWorkflow;
