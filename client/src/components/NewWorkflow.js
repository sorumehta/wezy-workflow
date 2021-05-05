import React, {useEffect, useState} from 'react';
import WorkflowFormCard from "./WorkflowComponents/WorkflowFormCard";
import AddWorkflowAction from "./WorkflowComponents/AddWorkflowAction";

const NewWorkflow = () => {
    const triggers = [{name: 'new_workflow', type: 'webhook'}]
    const actions = [{name: 'add_new_User', type: 'add_user', config: {'username': 'Subodh'}},{name: 'send_email_User', type:'send_email', config: {from:'soru.mehta', to: 'subodh.mehra'}}]
    const links = {start: {next: 'add_new_User'}, add_new_User: {next: 'send_email_User'}, send_email_User: {next: 'nil'}}

    // const onAddChild = (count) => {
    //     console.log("**************onAddChild***********")
    //     console.log(`count = ${count}`)
    //     let thisActionName = "action_"+String(count)
    //     if(count === 0){
    //         console.log("setting trigger...")
    //         setTriggers([...triggers, {type: "webhook", name:thisActionName, is_async: false}])
    //         console.log("actions:")
    //         console.log(actions)
    //     } else{
    //         console.log("setting action...")
    //         let prevLink = ""
    //         if(prevAction === null){
    //             prevLink = "start"
    //         } else{
    //             prevLink = prevAction
    //         }
    //         setPrevAction(thisActionName)
    //         console.log(`prevLink: ${prevLink}`)
    //         setLinks(old_links => {
    //             console.log("prevLinks")
    //             console.log(old_links)
    //             old_links[prevLink] = {next: thisActionName}
    //             old_links[thisActionName] = {next: 'nil'}
    //             console.log("newLinks:")
    //             console.log(old_links)
    //             return old_links
    //         })
    //         setActions([...actions, {name: thisActionName, type: "http", config: {}}])
    //         console.log("actions:")
    //         console.log(actions)
    //     }
    //
    // }

    const onAddAction = () => {

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
        workflowActions.push(<WorkflowFormCard type={'trigger'} attrs={triggers[0]} />)
        let nextAction = links.start.next
        while (nextAction !== 'nil') {
            console.log(`nextAction = ${nextAction}`)
            let actionAttrs = getActionAttrs(nextAction)
            workflowActions.push(<WorkflowFormCard type={'action'} attrs={ actionAttrs} key={actionAttrs.name} />);
            nextAction = links[nextAction].next
        };
        console.log('workflowActions: ')
        console.log(workflowActions)
    }
    

    return (
        <div>
            <AddWorkflowAction onAdd={onAddAction}/>
                {workflowActions}

        </div>
    );
};

export default NewWorkflow;