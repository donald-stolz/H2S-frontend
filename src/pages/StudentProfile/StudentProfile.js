// StudentProfile component
import React, { useState, useEffect } from "react";
// import axios from "axios";
import PropTypes from "prop-types";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  List,
  ListItem,
  Typography,
  LinearProgress
} from "@material-ui/core";
import CheckInButton from "../../components/CheckInButton";
import UpdateButton from "../../components/UpdateButton";
import { getStudent, checkIn } from "../../services/api";
import LoadingPage from "../../components/LoadingPage";

const StudentProfile = props => {
  const { classes, match } = props;
  const [student, setStudent] = useState(null);
  let level, barValue;

  if (student !== null) {
    let cursus = student.cursus_users.find(element => {
      return element.cursus_id === 17;
    });
    level = cursus.level;
    barValue = level - Math.floor(level);
  }

  useEffect(() => {
    async function fetchProfile() {
      let profile = await getStudent(match.params.user);
      let cursus = profile.cursus_users.find(element => {
        return element.cursus_id === 17;
      });
      level = cursus.level;
      barValue = (level - Math.floor(level)) * 100;
      profile = { ...profile, level, barValue };
      setStudent(profile);
      console.log(profile);
    }
    fetchProfile();
  }, []);

  const toggleCheckin = () => {
    if (typeof student.checkin_status === "undefined") {
      student.checkin_status = false;
    }
    let checkin_status = !student.checkin_status;
    checkIn(student.login, checkin_status);
    setStudent({ ...student, checkin_status });
  };

  return student ? (
    <Grid className={classes.baseGrid} container spacing={24}>
      <Grid item xs={12}>
        {/* Student name and level */}
        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item sm={12} md={3} className={classes.avatarGrid}>
              <Avatar className={classes.avatar} src={student.image_url} />
            </Grid>
            <Grid container sm={12} md={9}>
              <Grid item xs={12} md={10}>
                <List>
                  <ListItem>
                    <Typography variant="h4">{student.displayname}</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="subtitle1">Current Group:</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="subtitle1">
                      Current Project:
                    </Typography>
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={2} className={classes.buttonGrid}>
                <CheckInButton
                  checkedIn={student.checkin_status}
                  toggle={toggleCheckin}
                />
                <UpdateButton student={student} />
              </Grid>
              <Grid item xs={12} className={classes.progressGrid}>
                <LinearProgress
                  variant="determinate"
                  value={student.barValue}
                  className={classes.levelProgress}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography variant="h6">Attendance Tracker</Typography>
          <hr />
          {/* TODO: Attendance Content */}
        </Paper>
      </Grid>
      <Grid item xs={6}>
        {/* Projects */}
        <Paper className={classes.paper}>
          <Typography variant="h6">Projects</Typography>
          <hr />
          {/* TODO: Projects Content */}
        </Paper>
      </Grid>
      <Grid item xs={6}>
        {/* Recent Evaluations */}
        <Paper className={classes.paper}>
          <Typography variant="h6">Past Evaluations</Typography>
          <hr />
          {/* TODO: Evaluation Content */}
        </Paper>
      </Grid>
      <Grid item xs={6}>
        {/* Badges */}
        <Paper className={classes.paper}>
          <Typography variant="h6">Badges</Typography>
          <hr />
          {/* LOW TODO: Badges/Skills/Achievments Content */}
        </Paper>
      </Grid>
    </Grid>
  ) : (
    <LoadingPage />
  );
};

StudentProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(StudentProfile));
