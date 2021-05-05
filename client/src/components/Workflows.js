import React, {useState} from 'react';
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

const workflowList = [{name: "send emails", id: 1, is_active: true},
    {name: "scheduled work", id: 2, is_active: true},
    {name: "listen to chats", id: 3, is_active: false},
    {name: "send emails", id: 4, is_active: true},
    {name: "scheduled work", id: 5, is_active: true},
    {name: "listen to chats", id: 6, is_active: false}]

const Workflows = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Link to={`/workflows/new`} className={classes.link}>
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