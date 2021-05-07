import React, {useContext} from 'react';
import { useParams, Link, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TimelineIcon from '@material-ui/icons/Timeline';
import Workflows from './Workflows'
import NewWorkflow from "./NewWorkflow";
import WorkflowDetails from "./WorkflowComponents/WorkflowDetails";
import { UserContext } from "../UserContext";

import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
    Typography,
    Grid
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    drawerPaper: { width: "inherit" },
    link: { textDecoration: "none", color: theme.palette.text.primary },
}));

const Home = () => {
    const classes = useStyles();
    const { account_id } = useParams();
    const { user } = useContext(UserContext);
    console.log(`account id from useParams: ${account_id}`);

    return (
        <div>
            {user ? (
            <Grid container justify="center" alignItems="center" direction="column">
                <Grid item>
                    <Drawer
                        style={{ width: "240px" }}
                        variant="persistent"
                        anchor="left"
                        open={true}
                        classes={{ paper: classes.drawerPaper }}
                        aria-label="mailbox folders"
                    >
                        <List>

                            <Link
                                to={`/accounts/${account_id}/workflows`}
                                className={classes.link}
                            >
                                <ListItem button>
                                    <ListItemIcon>
                                        <TimelineIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Workflows"} />
                                </ListItem>
                            </Link>
                        </List>

                    </Drawer>
                </Grid>
                <Grid item>

                    <Route exact path="/accounts/:account_id/workflows">
                        <Container>
                            <Typography variant="h3" gutterBottom>
                                Workflows
                            </Typography>
                            <Workflows/>
                        </Container>
                    </Route>
                    <Route exact path="/accounts/:account_id/workflow/new">
                        <Container>
                            <Typography variant="h5" gutterBottom>
                                New Workflow
                            </Typography>
                            <NewWorkflow/>
                        </Container>
                    </Route>
                    <Route exact path="/accounts/:account_id/workflows/:workflow_id">
                        <Container>
                            <Typography variant="h5" gutterBottom>
                                Workflow detail
                            </Typography>
                            <WorkflowDetails/>
                        </Container>
                    </Route>
                </Grid>
            </Grid>
            ) : (
                <Link to="/login" >You need to login</Link>
            )}

        </div>
    );
};

export default Home;