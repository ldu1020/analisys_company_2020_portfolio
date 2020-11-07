/** @format */

import React, { useState } from 'react';
import WcIcon from '@material-ui/icons/Wc';
import { makeStyles, SvgIcon } from '@material-ui/core';
import { toJS } from 'mobx';
type Prop = {
  scale: string;
};

const useStyles = makeStyles((theme) => ({
  wcIcon: {
    width: '10rem',
    height: '10rem',
  },
  iconChart: {
    display: 'flex',
    width: '10rem',
    clipPath: 'url(#hart)',
    height: '10rem',
    backgroundColor: 'gray',
    zIndex: -10,
  },
  manColor: (props: Prop) => ({
    width: '50%',
    height: '100%',
    transformOrigin: `bottom`,
    transition: 'all 0.3s',
    transform: `scaleY(${props.scale})`,
    backgroundColor: 'blue',
     animation: `$myEffect 3000ms ${theme.transitions.easing.easeInOut}`
  }),
  womanColor: (props: Prop) => ({
    width: '50%',
    height: '100%',
    transition: 'all 1s',
    transform: `scaleY(${props.scale})`,
    transformOrigin: `bottom`,
    backgroundColor: 'red',
    animation: `$myEffect 3000ms ${theme.transitions.easing.easeInOut}`
  }),
  '@keyframes myEffect': {
    '0%': {
      borderRadius:`50%`
    },
    '100%': {
      borderRadius:`none`

    },
  },
}));

console.log();

const StaffGraph = () => {
  const [state, setstate] = useState('0');
  const classes = useStyles({ scale: state });
  const onClick = (e: any) => {
    setstate(e.target.textContent);
  };
  const wcpath =
    'M 5.5 22 v -7.5 H 4 V 9 c 0 -1.1 0.9 -2 2 -2 h 3 c 1.1 0 2 0.9 2 2 v 5.5 H 9.5 V 22 h -4 Z M 18 22 v -6 h 3 l -2.54 -7.63 C 18.18 7.55 17.42 7 16.56 7 h -0.12 c -0.86 0 -1.63 0.55 -1.9 1.37 L 12 16 h 3 v 6 h 3 Z M 7.5 6 c 1.11 0 2 -0.89 2 -2 s -0.89 -2 -2 -2 s -2 0.89 -2 2 s 0.89 2 2 2 Z m 9 0 c 1.11 0 2 -0.89 2 -2 s -0.89 -2 -2 -2 s -2 0.89 -2 2 s 0.89 2 2 2 Z';
  return (
    <div>
      <WcIcon id='clippath' className={classes.wcIcon} />
      <SvgIcon>
        <path d={wcpath} />
      </SvgIcon>
      <button onClick={onClick}>0.5</button>
      <button onClick={onClick}>0.7</button>
      <button onClick={onClick}>1</button>
      <div className={classes.iconChart}>
        <div className={classes.manColor}></div>
        <div className={classes.womanColor}></div>
      </div>
      <svg viewBox='0 0 600 400' style={{ background: 'gray' }}>
        <clipPath id='hart'>
          <path d={wcpath} transform='scale(7)' />
        </clipPath>
      </svg>
    </div>
  );
};

export default StaffGraph;

const wcpath =
  'M,5.5,22,v,-7.5,H,4,V,9,c,0,-1.1,0.9,-2,2,-2,h,3,c,1.1,0,2,0.9,2,2,v,5.5,H,9.5,V,22,h,-4,Z,M,18,22,v,-6,h,3,l,-2.54,-7.63,C,18.18,7.55,17.42,7,16.56,7,h,-0.12,c,-0.86,0,-1.63,0.55,-1.9,1.37,L,12,16,h,3,v,6,h,3,Z,M,7.5,6,c,1.11,0,2,-0.89,2,-2,s,-0.89,-2,-2,-2,s,-2,0.89,-2,2,s,0.89,2,2,2,Z,m,9,0,c,1.11,0,2,-0.89,2,-2,s,-0.89,-2,-2,-2,s,-2,0.89,-2,2,s,0.89,2,2,2,Z';
