import React, {useState} from 'react';
import {Button} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const AddWorkflowAction = (props) => {
    const [isTrigger, setIsTrigger] = useState(true)
    const [name, setName] = useState("")
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (callback, value, istrigger) => {
        setOpen(false)
        console.log(`name submitted: ${value}`)
        callback(value, istrigger)
        if(istrigger){
            setIsTrigger(false) //only one trigger allowed per workflow for now
        }
    }

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New {isTrigger ? 'Trigger' : 'Action'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Write a name for this {isTrigger ? 'workflow' : 'action'}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="name"
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSubmit(props.onAdd, name, isTrigger)} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

};

export default AddWorkflowAction;
