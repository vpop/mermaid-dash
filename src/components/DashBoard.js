import React from 'react';

import BackArrowIcon from '@material-ui/icons/ArrowBack';
import ZoomOutIcon from '@material-ui/icons/ZoomOutMap';
import CurrentSelectLocationIcon from '@material-ui/icons/TripOrigin';
import { ReactComponent as SinglePointIcon } from '../styles/Icons/circular-shape-silhouette.svg';
import { ReactComponent as MultiPointsIcon } from '../styles/Icons/four.svg';
import { ReactComponent as SelectMultiIcon } from '../styles/Icons/two.svg';
import { ReactComponent as SelectMarkerIcon } from '../styles/Icons/pin.svg';

import { ThemeProvider } from 'styled-components/macro';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import styled from 'styled-components/macro';

import { ButtonStyle } from './Button';
import { theme } from './theme';
import MetricCards from './MetricCardsContainer';
import InformationCard from './InformationCard';
import SiteDetail from './SiteDetail';
import DropDown from './DropDown';
import { summary, histogram } from '../constants/summary-information';

import PropTypes from 'prop-types';

const RootGrid = styled(Grid)`
  overflow-y: overlay;
  height: calc(100vh - 49px);
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #2d3641;
  }
`;

const gridStyleProperties = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 2)
  },
  dashBoardProperty: {
    position: 'relative',
    height: 0
  },
  backIconProperty: {
    marginRight: theme.spacing(1)
  },
  zoomOutIconWrapperProperty: {
    position: 'fixed',
    top: 130,
    left: 10
  },
  zoomToIconWrapperProperty: {
    position: 'fixed',
    top: 170,
    left: 10
  },
  legendProperty: {
    position: 'fixed',
    width: 200,
    height: 135,
    bottom: 10,
    left: 250,
    color: 'white',
    opacity: 0.6,
    backgroundColor: '#000000',
    borderRadius: 0,
    boxShadow: 'none'
  },
  legendItemProperty: {
    padding: '5px 0 10px 0px'
  },
  legendIconProperty: {
    margin: '3px 8px 0 4px'
  },
  legendMarkerIconProperty: {
    marginRight: '5px',
    marginLeft: '2px'
  },
  zoomOutIconProperty: {
    width: '16px',
    height: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const DashBoard = ({
  showFullMap,
  showSiteDetail,
  showDropDown,
  siteClickHandler,
  backButtonHandler,
  siteDetail,
  siteDropDownData,
  metrics,
  histogramContent,
  fullMapZoomHandler,
  zoomToSiteHandler,
  isLoading
}) => {
  const classes = gridStyleProperties();

  const backButton = showSiteDetail && (
    <ThemeProvider theme={theme.backButton}>
      <ButtonStyle translateHover={true} boxShadow={true} onClick={backButtonHandler}>
        <BackArrowIcon />
        <Typography variant="h6">Back</Typography>
      </ButtonStyle>
    </ThemeProvider>
  );

  const fullMapToggle = (
    <ThemeProvider theme={theme.mapControl}>
      <Tooltip
        title="Zoom to Full"
        placement="right-end"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
      >
        <ButtonStyle
          buttonBorder={true}
          growScaleHover={true}
          onClick={() => fullMapZoomHandler(true)}
        >
          <ZoomOutIcon className={classes.zoomOutIconProperty} placeholder="GeeksForGeeks" />
        </ButtonStyle>
      </Tooltip>
    </ThemeProvider>
  );

  const zoomToSelectSite = (
    <ThemeProvider theme={theme.mapControl}>
      <Tooltip
        title="Zoom to Selected Site"
        placement="right-end"
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
      >
        <ButtonStyle buttonBorder={true} setWiggle={true} onClick={() => zoomToSiteHandler(true)}>
          <CurrentSelectLocationIcon className={classes.zoomOutIconProperty} />
        </ButtonStyle>
      </Tooltip>
    </ThemeProvider>
  );

  const dropDownSites = siteDropDownData.length > 0 && showDropDown && (
    <DropDown
      siteList={siteDropDownData}
      selectSite={siteDetail}
      siteClickHandler={siteClickHandler}
    />
  );

  const siteDashboard = siteDetail && (
    <div>
      {dropDownSites}
      <SiteDetail selectSite={siteDetail} />
    </div>
  );

  const dashboard = (
    <Slide direction="left" in={showFullMap} mountOnEnter unmountOnExit>
      <div>
        <InformationCard title={summary.title} type={summary.type} textContent={summary} />
        <MetricCards metrics={metrics} isLoading={isLoading} />
        <InformationCard
          title={histogram.title}
          type={histogram.type}
          histogramContent={histogramContent}
        />
      </div>
    </Slide>
  );

  const backButtonControl = (
    <Slide direction="left" in={showFullMap} mountOnEnter unmountOnExit>
      <Box display="flex" justifyContent="flex-end">
        {backButton}
      </Box>
    </Slide>
  );

  const fullMapControl = <Box className={classes.zoomOutIconWrapperProperty}>{fullMapToggle}</Box>;
  const zoomToControl = <Box className={classes.zoomToIconWrapperProperty}>{zoomToSelectSite}</Box>;

  const dashboardControl = (
    <Slide direction="left" in={showFullMap} mountOnEnter unmountOnExit>
      <Grid item sm={4} className={classes.dashBoardProperty}>
        {showSiteDetail ? siteDashboard : dashboard}
      </Grid>
    </Slide>
  );

  return (
    <RootGrid container className={classes.root}>
      <Grid item sm={8}>
        {backButtonControl}
        {fullMapControl}
        {zoomToControl}
        <Paper className={classes.legendProperty}>
          <Box display="flex" flexDirection="column" className={classes.legendItemProperty}>
            <Box display="flex" m={1}>
              <SelectMarkerIcon
                width="20px"
                height="20px"
                className={classes.legendMarkerIconProperty}
              />
              <Typography variant="body1">Selected Project Site</Typography>
            </Box>
            <Box display="flex" ml={1} mb={1}>
              <SelectMultiIcon width="15px" height="15px" className={classes.legendIconProperty} />
              <Typography variant="body1">Selected Multiple Sites</Typography>
            </Box>
            <Box display="flex" ml={1} mb={1}>
              <SinglePointIcon width="15px" height="15px" className={classes.legendIconProperty} />
              <Typography variant="body1">Project Site</Typography>
            </Box>
            <Box display="flex" ml={1}>
              <MultiPointsIcon width="15px" height="15px" className={classes.legendIconProperty} />
              <Typography variant="body1">Multiple Project Sites</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      {dashboardControl}
    </RootGrid>
  );
};

DashBoard.propTypes = {
  showFullMap: PropTypes.bool,
  sites: PropTypes.array,
  siteSelectHandler: PropTypes.func,
  selectSite: PropTypes.object,
  metrics: PropTypes.array,
  classes: PropTypes.object
};

export default DashBoard;
