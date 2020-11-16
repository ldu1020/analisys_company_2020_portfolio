/** @format */

import React, { useLayoutEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Grow,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import NonFetchedDataDisplay from '../non_fetched_data/non_fetched_data';
import CalculatorComponent from './calculator_component';
import { useStore } from '../../stores/setUpContext';

const useStyles = makeStyles((theme) => ({
  analisysSet: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  description: {
    color: theme.palette.text.secondary,
  },
  nameOfAnalisys: {
    fontSize: '1.5rem',
    margin: '0',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  searchNavBtn: {
    color: '#fff',
    position: 'fixed',
    bottom: '7rem',
    right: '1rem',
    backgroundColor: theme.palette.secondary.light,
    boxShadow: theme.shadows['2'],
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
  },
}));

const dataSet = [
  {
    title: 'ROIC',
    basis: '영업이익 / 투하자본 (유형자산 + 운전자본 ) ',
    description:
      '투하자본 수익률로써, 투하자본이 적고 영업이익이 높을수록 긍정적이며, 다년간의 자료를 분석해 보면 좋습니다.',
    plus: ['영업이익'],
    division: ['유형자산', '매출채권', '-매입채무'],
  },
  {
    title: 'ROE',
    basis: '당기순이익 / 자본총액',
    description:
      '부채를 포함하지 않은 본인의 자본으로써 얻은 수익률지표로, 이 또한 높을 수록 긍정적이며 투자의 대가 워런버핏은 3년연속 15%이상인 기업에 투자하라 말한바도 있습니다.  ',
    plus: ['당기순이익'],
    division: ['자본총계'],
  },
  {
    title: '유동비율',
    basis: '유동자산 / 유동부채',
    description:
      '재무재표상에서 유동성은이란 1년이내 현금화 할수 있는 가로 판단합니다.  단기 채무상환 능력을 평가할 수 있으며 수익성이 높아도 유동성이 좋지않으면  흑자도산의 위험이 있기에 기본적이면서도 중요한 지표입니다. ',
    plus: ['유동자산'],
    division: ['유동부채'],
  },
  {
    title: '고정자산회전률',
    basis: '매출액 / 고정자산',
    description:
      '고정자산에 투하된 자금은 장기간에 걸쳐 묶이기 때문에 효율적으로 운용되지않으면 현금흐름도 악화됩니다. 특히 그 비용이 높은 대기업에서 중요한 지표가 됩니다. 수치가 업계마다 상이해서 동종업계 평균치와 비교해보는것이 좋습니다.',
    plus: ['매출액'],
    division: ['고정자산'],
  },
  {
    title: '노동분배율',
    basis: '인건비 / 부가가치',
    description:
      '노동분배율은 기업의 보상수준과 노동 효율성등을 나타내는 지표입니다.  낮을 수록 효율적임을 뜻하지만 분석의도에따라 긍정부정은 달라질 수 있습니다. 부가가치의 산출근거는 편의를 위해 영업이익 + 인건비로 측정했습니다. ',
    plus: ['인건비'],
    division: ['인건비', '영업이익'],
  },
];

interface Props {
  scrollToFind: () => void;
}

const AnalisysOfAccounts: React.FC<Props> = observer(({ scrollToFind }) => {
  const { flatDataOfFocused } = useStore();
  const classes = useStyles();
  const sectionRef = useRef<HTMLHeadingElement | null>(null);
  const [sectionY, setSectionY] = useState(false);

  useLayoutEffect(() => {
    if (sectionRef.current) {
      window.addEventListener('scroll', () => {
        sectionRef.current && sectionRef.current.getBoundingClientRect().y < 0
          ? setSectionY(true)
          : setSectionY(false);
      });
    } else {
      setSectionY(false);
    }
  }, []);

  return (
    <Container maxWidth='md'>
      <Box p={3}>
        <h1 className={classes.title} ref={sectionRef}>
          분석
        </h1>
        <p className={classes.description}>
          각 항목은 주요한 분석지표입니다
          <br /> 데이터가 기업마다 상이할 수 있어, <br />
          기본적으로 제공하는 데이터가 '조회 불가' 일 경우에
          <br />
          직접 계정과목을 선택해서 원하는 정보를 알아내세요! <br />
          간단한 검색도 가능합니다.
        </p>

        <Grid container spacing={3}>
          {dataSet.map((data) => (
            <Grid item md={6} key={data.title} className={classes.analisysSet}>
              <p className={classes.nameOfAnalisys}>{data.title}</p>
              <p>{data.basis}</p>

              {flatDataOfFocused ? (
                <CalculatorComponent
                  description={data.description}
                  plus={data.plus}
                  division={data.division}
                />
              ) : (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'>
                    데이터를 검색해 주세요
                  </AccordionSummary>
                  <AccordionDetails className={classes.details}>
                    <NonFetchedDataDisplay />
                  </AccordionDetails>
                </Accordion>
              )}
            </Grid>
          ))}
        </Grid>

        <Grow in={sectionY}>
          <IconButton className={classes.searchNavBtn} onClick={scrollToFind}>
            <SearchIcon />
          </IconButton>
        </Grow>
      </Box>
    </Container>
  );
});

export default AnalisysOfAccounts;
