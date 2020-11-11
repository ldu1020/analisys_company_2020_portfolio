/** @format */

import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';

interface CalculatorComponentProps {
  flatDataOfFocused: FlatData[];
  plus: string[];
  division?: string[];
}

const CalculatorComponent: React.FC<CalculatorComponentProps> = ({
  flatDataOfFocused,
  plus,
  division,
}) => {
  const [result, setresult] = useState(0);
  const [plusState, setplusState] = useState<FlatData[]>(
    plus.map((plusItem) => {
      const inList = flatDataOfFocused.find((flatItem) =>
        (flatItem.name + flatItem.detail).includes(plusItem)
      );
      return inList ? inList : { name: '조회실패', amount: 0 };
    })
  );
  const [divisionState, setdivisionState] = useState<FlatData[] | null>(
    division
      ? division.map((divisionItem) => {
          const inList = flatDataOfFocused.find((flatItem) =>
            (flatItem.name + flatItem.detail).includes(divisionItem)
          );
          return inList ? inList : { name: '조회실패', amount: 1 };
        })
      : null
  );

  useEffect(() => {
    const molecular = plusState
      .map((li) => li.amount)
      .reduce((pre, cur) => pre + cur);
    const denominator = divisionState
      ?.map((li) => li.amount)
      .reduce((pre, cur) => pre + cur);
    denominator
      ? setresult(Math.floor((molecular / denominator) * 100))
      : setresult(molecular);
  }, [plusState, divisionState]);

  return (
    <div>
      <div>
        <p>더하기존</p>
        {plusState.map((li, index) => (
          <div>
            <Autocomplete
              id='combo-box-demo'
              options={flatDataOfFocused}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => {
                if (value && value.amount) {
                  const update = [...plusState];
                  update[index] = value as FlatData;
                  setplusState(update);
                }
              }}
              value={li}
              renderInput={(params) => (
                <TextField {...params} variant='standard' />
              )}
            />
            <p>{li.amount}</p>
          </div>
        ))}
      </div>

      <div>
        {divisionState?.map((li, index) => (
          <div>
            <p>나누기존</p>
            <Autocomplete
              id='combo-box-demo'
              options={flatDataOfFocused}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => {
                if (value && value.amount) {
                  const update = [...divisionState];
                  update[index] = value as FlatData;
                  setdivisionState(update);
                }
              }}
              value={li}
              renderInput={(params) => (
                <TextField {...params} variant='standard' />
              )}
            />
            <p>{li.amount}</p>
          </div>
        ))}
      </div>

      <p>결과 : {result}</p>
    </div>
  );
};

export default CalculatorComponent;
