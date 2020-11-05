/** @format */

import { observer } from 'mobx-react';
import React from 'react';
import { useStore } from '../../stores/setUpContext';

const Staff = observer(() => {
  const { focusedCorpList } = useStore();
  const { staff } = focusedCorpList;
  return (
    <div>
      {staff?.map((li) => (
        <div>
          <h1>사업부분{li.fo_bbm}</h1>
          <li>성별 {li.sexdstn}</li>
          <li>정직원수 {li.rgllbr_co}</li>
          <li>계약직수 {li.cnttk_co}</li>
          <li>1인 평균 급여액 {li.jan_salary_am}</li>
          <li>연간 급여 총액{li.fyer_salary_totamt}</li>
          <li>합계:{li.sm}</li>
          <li>비고:{li.rm}</li>
        </div>
      ))}
    </div>
  );
});

export default Staff;
