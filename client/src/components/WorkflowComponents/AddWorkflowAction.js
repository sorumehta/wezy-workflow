import React, {useState} from 'react';
import {Button} from "@material-ui/core";

const AddWorkflowAction = (props) => {
    const [isTrigger, setIsTrigger] = useState(true)
    const [name, setName] = useState("")

    return (
        <div>
            <Button variant="contained" color="primary" id={"startworkflow"} onClick={() => props.onAdd}>Start</Button>
        </div>
    );
};

export default AddWorkflowAction;