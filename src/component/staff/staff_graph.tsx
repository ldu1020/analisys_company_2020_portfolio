/** @format */

import React from 'react';
import CountUp from 'react-countup';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: theme.breakpoints.values.sm,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  svg: {
    background: 'none',
    position: 'absolute',
    top: '0',
  },
  wcIcon: {
    width: '10rem',
    height: '10rem',
  },
  iconChart: {
    display: 'flex',
    width: '10rem',
    clipPath: 'url(#wcPath)',
    height: '10rem',
    backgroundColor: 'lightgray',
  },
  subHeader: {
    margin: '1rem',
    fontSize: '1.3rem',
  },
  manCount: (props: Prop) => ({
    position: 'absolute',
    top: '50%',
    left: '10%',
    color: theme.palette.primary.light,
    transition: '0.3s all',
    transform: `scale(${1 + (props.manRate - props.womanRate) / 3})`,
  }),
  womanCount: (props: Prop) => ({
    position: 'absolute',
    top: '50%',
    right: '10%',
    color: theme.palette.secondary.light,
    transition: '0.3s all',
    transform: `scale(${1 + (props.womanRate - props.manRate) / 3})`,
  }),
  manColor: (props: Prop) => ({
    width: '50%',
    height: '100%',
    transformOrigin: `bottom`,
    transition: 'all 0.3s',
    transform: `scaleY(${props.manRate})`,
    backgroundColor: theme.palette.primary.main,
  }),
  womanColor: (props: Prop) => ({
    width: '50%',
    height: '100%',
    transition: 'all 1s',
    transform: `scaleY(${props.womanRate})`,
    transformOrigin: `bottom`,
    backgroundColor: theme.palette.secondary.main,
  }),
  '@keyframes myEffect': {
    '0%': {
      borderRadius: `none`,
    },
    '100%': {
      borderRadius: `50%`,
    },
  },
}));

type Prop = {
  manRate: number;
  womanRate: number;
};

type StaffGraphProps = {
  dataForGraph: {
    subHeader: string;
    manAmount: string;
    womanAmount: string;
  };
  readonly eachRate: { manRate: number; womanRate: number };
};

const StaffGraph: React.FC<StaffGraphProps> = ({ dataForGraph, eachRate }) => {
  const classes = useStyles(eachRate);

  return (
    <Paper className={classes.root}>
      <h1 className={classes.subHeader}>{dataForGraph.subHeader}</h1>
      <CountUp
        className={classes.manCount}
        suffix='%'
        end={Math.floor(eachRate.manRate * 100)}
      />
      <CountUp
        className={classes.womanCount}
        suffix='%'
        end={Math.floor(eachRate.womanRate * 100)}
      />

      <div className={classes.iconChart}>
        <div className={classes.manColor}></div>
        <div className={classes.womanColor}></div>
      </div>
      <svg className={classes.svg} viewBox='0 0 600 400'>
        <clipPath id='wcPath'>
          <path d={wcpath} transform='scale(7)' />
        </clipPath>
      </svg>
    </Paper>
  );
};

const wcpath =
  'M 5.5 22 v -7.5 H 4 V 9 c 0 -1.1 0.9 -2 2 -2 h 3 c 1.1 0 2 0.9 2 2 v 5.5 H 9.5 V 22 h -4 Z M 18 22 v -6 h 3 l -2.54 -7.63 C 18.18 7.55 17.42 7 16.56 7 h -0.12 c -0.86 0 -1.63 0.55 -1.9 1.37 L 12 16 h 3 v 6 h 3 Z M 7.5 6 c 1.11 0 2 -0.89 2 -2 s -0.89 -2 -2 -2 s -2 0.89 -2 2 s 0.89 2 2 2 Z m 9 0 c 1.11 0 2 -0.89 2 -2 s -0.89 -2 -2 -2 s -2 0.89 -2 2 s 0.89 2 2 2 Z';

export default StaffGraph;
