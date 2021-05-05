import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import {Link} from "react-router-dom";


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    link: { textDecoration: "none"}
});

const WorkflowFormCard = ({type, attrs}) => {
    const classes = useStyles();
    console.log("recieved attrs:")
    console.log(attrs)
    return (
        <Card className={classes.root}>
            <CardContent>

                <Typography >
                    {type}
                </Typography>
                <Typography >
                    {Object.keys(attrs).map(attr => typeof attrs[attr] === 'object' ? <p key={attr}>{attr}: {JSON.stringify(attrs[attr],null,2)}</p> : <p key={attr}>{attr}: {attrs[attr]} </p>)}
                </Typography>


            </CardContent>
            <CardActions>
                    <Button size="small">Details</Button>
            </CardActions>
        </Card>
    );
};

export default WorkflowFormCard;