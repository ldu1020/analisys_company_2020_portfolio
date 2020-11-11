/** @format */

import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { useStore } from '../../stores/setUpContext';
import CalculatorComponent from './calculator_component';

const AnalisysOfAccounts = observer(() => {
  const { flatDataOfFocused } = useStore();

  return (
    <div>
      <h1>ROIC</h1>
      {flatDataOfFocused && (
        <CalculatorComponent
          flatDataOfFocused={flatDataOfFocused}
          plus={['영업이익']}
          division={['유형자산', '운전자본']}
        />
      )}
      <h1>ROE</h1>
      {flatDataOfFocused && (
        <CalculatorComponent
          flatDataOfFocused={flatDataOfFocused}
          plus={['당기순이익']}
          division={['자본금']}
        />
      )}
      <h1>유동비율</h1>
      {flatDataOfFocused && (
        <CalculatorComponent
          flatDataOfFocused={flatDataOfFocused}
          plus={['유동자산']}
          division={['유동부채']}
        />
      )}
      <h1>고정자산회전률</h1>
      {flatDataOfFocused && (
        <CalculatorComponent
          flatDataOfFocused={flatDataOfFocused}
          plus={['매출액']}
          division={['고정자산']}
        />
      )}
      <h1>유동비율</h1>
      {flatDataOfFocused && (
        <CalculatorComponent
          flatDataOfFocused={flatDataOfFocused}
          plus={['인건비']}
          division={['매출액']}
        />
      )}
    </div>
  );
});

export default AnalisysOfAccounts;
