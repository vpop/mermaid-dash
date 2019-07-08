import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const cardStyle = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 0),
    textAlign: 'center'
  },
  title: {
    borderTop: '1px solid',
    padding: theme.spacing(1, 1)
  },
  body: {
    color: '#5080AD',
    padding: theme.spacing(4, 1)
  }
}));

const metricCard = props => {
  const classes = cardStyle();
  const { title, count } = props.card;
  const contentItem = count ? <Box className={classes.body}>{count}</Box> : null;
  const titleItem = title ? <Box className={classes.title}>{title}</Box> : null;

  return (
    <Paper className={classes.root}>
      <Typography variant="h2">{contentItem}</Typography>
      <Typography variant="subtitle1" component="div">
        {titleItem}
      </Typography>
    </Paper>
  );
};

export default metricCard;