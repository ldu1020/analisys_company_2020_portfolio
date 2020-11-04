/** @format */

import { observer } from 'mobx-react';
import React from 'react';
import { Line } from 'react-chartjs-2';

interface ChartOfAccountsProps {
  pickedItem: AccountsType | undefined;
}

const ChartOfAccounts: React.FC<ChartOfAccountsProps> = observer(
  ({ pickedItem }) => {
    console.log(pickedItem);
    if (pickedItem) {
      const {
        account_detail,
        account_nm,
        thstrm_nm,
        thstrm_amount,
        frmtrm_nm,
        frmtrm_amount,
        bfefrmtrm_nm,
        bfefrmtrm_amount,
      } = pickedItem;
      const ColorRedAndBlue = (opacity: number) => {
        const index = Number(thstrm_amount);
        return index >= 0
          ? `rgba(0, 0, 255,${opacity})`
          : `rgba(255, 0, 0 , ${opacity})`;
      };

      const data = {
        labels: [bfefrmtrm_nm, frmtrm_nm, thstrm_nm],
        datasets: [
          {
            label: `${account_detail === '-' ? account_nm : account_detail}`,
            backgroundColor: ColorRedAndBlue(0.3),
            borderColor: ColorRedAndBlue(1),
            data: [bfefrmtrm_amount, frmtrm_amount, thstrm_amount],
            fill: true,
          },
        ],
      };

      return <Line data={data} />;
    } else {
      return null;
    }
  }
);

export default ChartOfAccounts;
