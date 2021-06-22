import React, { useContext } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
  } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid className={classes.gridContainer}>
      {/* own video */}
      {stream && (
        <Paper classes={classes.paper}>
          <Grid item xs={12} md={12}>
            <Typography variant="h5" gutterBottom>
              {name || 'Name'}
            </Typography>
            <video
              playsinline
              muted
              ref={myVideo}
              autoPlay
              classes={classes.video}
            />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper classes={classes.paper}>
          <Grid item xs={12} md={12}>
            <Typography variant="h5" gutterBottom>
              {call.name || 'Name'}
            </Typography>
            <video
              playsinline
              ref={userVideo}
              autoPlay
              classes={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
