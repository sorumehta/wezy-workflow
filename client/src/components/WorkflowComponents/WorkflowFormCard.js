import React, {useState} from 'react';
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
    const [actionType, setActionType] = useState(null)
    const handleClick = () => {
        console.log(`You just clicked on action name: ${attrs.name}`)
    }

    return (
        <Card className={classes.root}>
            <CardContent>

            </CardContent>
            <CardActions>
                    <Button size="small" onClick={handleClick}>Save</Button>
            </CardActions>
        </Card>
    );
};

export default WorkflowFormCard;