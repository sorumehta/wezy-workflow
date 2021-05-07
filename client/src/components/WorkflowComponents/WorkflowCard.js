import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import {Link, useParams} from "react-router-dom";


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

const WorkflowCard = ({id, name, isActive, workflow}) => {
    const classes = useStyles();
    const { account_id } = useParams();
    const [active, setActive] = React.useState(isActive);

    const handleChange = (event) => {
        console.log(`setting is_active to ${event.target.checked} for id ${id}`)
        setActive(event.target.checked);
    };

    useEffect(() => {
        console.log(`sending PUT request for id ${id}`)
        fetch(`/api/v1/accounts/${account_id}/workflows/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify({is_active: active}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
            if(response.ok){
                console.log("workflow submitted successfully")
            } else{
                console.error(`ERROR while posting workflow: ${response.status}`)
            }
        })
    },[active])

    return (
        <Card className={classes.root}>
            <CardContent>

                <Typography >
                    {name}
                </Typography>

                <Switch checked={active} onChange={handleChange} name="activateWorkflow" />

            </CardContent>
            <CardActions>
                <Link to={`workflows/${id}`} className={classes.link}>
                    <Button size="small">Details</Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default WorkflowCard;