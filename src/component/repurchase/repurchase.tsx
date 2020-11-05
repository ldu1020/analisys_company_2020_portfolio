/** @format */

import { observer } from 'mobx-react';
import { nanoid } from 'nanoid';
import React from 'react';
import { useStore } from '../../stores/setUpContext';

const Repurchase = observer(() => {
  const { focusedCorpList } = useStore();
  const { repurchase } = focusedCorpList;
  console.log(repurchase);
  return (
    <div>
      {repurchase?.map((li) => (
        <ul key={nanoid()}>
          <li>방법1:{li.acqs_mth1}</li>
          <li>방법2:{li.acqs_mth2}</li>
          <li>방법3:{li.acqs_mth3}</li>
          <li>주식종류:{li.stock_knd}</li>
          <li>기초수량:{li.bsis_qy}</li>
          <li>기말수량:{li.trmend_qy}</li>
        </ul>
      ))}
    </div>
  );
});

export default Repurchase;
