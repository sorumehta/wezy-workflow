import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import WorkflowCard from "./WorkflowComponents/WorkflowCard";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    link: { textDecoration: "none"}
}));

const Workflows = () => {
    const classes = useStyles();
    const [workflowList, setWorkflowList] = useState([])
    useEffect(() => {
        fetch('/api/v1/accounts/1/workflows')
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
                    setWorkflowList(jsonResponse.data);
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
    return (
        <React.Fragment>
            <Link to={`/workflow/new`} className={classes.link}>
            <Button variant="contained" color="primary" id={"newworkflow"}>
                New Workflow
            </Button>
            </Link>
        <div className={classes.root}>

            <br />
            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                {workflowList.map((workflow) => (
                    <GridListTile key={workflow.id} cols={ 1}>
                        <WorkflowCard name={workflow.name} id={workflow.id} isActive={workflow.is_active} />
                    </GridListTile>
                ))}
            </GridList>


        </div>

        </React.Fragment>
    );
};

export default Workflows;