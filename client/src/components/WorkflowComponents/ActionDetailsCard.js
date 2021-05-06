import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
});

export default function ActionDetailsCard({name, type, config}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    name: {name}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    type: {type}
                </Typography>

                <Typography variant="body2" component="p">
                    {JSON.stringify(config, null, 2)}
                </Typography>
            </CardContent>
        </Card>
    );
}
