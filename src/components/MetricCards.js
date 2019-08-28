import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MetricCard from './MetricCard';

import PropTypes from 'prop-types';

const metricStyle = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(2)
  }
}));

const MetricCards = ({ metrics, showFullMap }) => {
  const classes = metricStyle();

  const cardList = metrics.map((card, index) => {
    return (
      <Grid item xs={4} key={index}>
        <MetricCard content={card} showFullMap={showFullMap} />
      </Grid>
    );
  });

  return (
    <Grid container spacing={2} className={classes.root}>
      {cardList}
    </Grid>
  );
};

MetricCards.propTypes = {
  metrics: PropTypes.array
};

export default MetricCards;
