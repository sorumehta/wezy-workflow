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

const WorkflowCard = ({id, name, isActive}) => {
    const classes = useStyles();
    const [active, setActive] = React.useState(isActive);

    const handleChange = (event) => {
        setActive(event.target.checked);
    };

    return (
        <Card className={classes.root}>
            <CardContent>

                <Typography >
                    {name}
                </Typography>

                <Switch checked={active} onChange={handleChange} name="activateWorkflow" />

            </CardContent>
            <CardActions>
                <Link to={`/workflows/${id}`} className={classes.link}>
                    <Button size="small">Details</Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default WorkflowCard;