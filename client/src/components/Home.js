import React from 'react';
import { useParams, Link, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import TimelineIcon from '@material-ui/icons/Timeline';
import Workflows from './Workflows'
import NewWorkflow from "./NewWorkflow";
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
    return (
        <div>
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
                            <Link to={`#`} className={classes.link}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"Dashboard"} />
                                </ListItem>
                            </Link>
                            <Link
                                to={`/workflows`}
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
                    <Typography variant="h4" gutterBottom>
                        Sandpiper
                    </Typography>
                    <br />
                    <Route exact path="/workflows">
                        <Container>
                            <Typography variant="h5" gutterBottom>
                                Workflows
                            </Typography>
                            <Workflows/>
                        </Container>
                    </Route>
                    <Route exact path="/workflows/new">
                        <Container>
                            <Typography variant="h5" gutterBottom>
                                New Workflow
                            </Typography>
                            <NewWorkflow/>
                        </Container>
                    </Route>
                </Grid>
            </Grid>


        </div>
    );
};

export default Home;