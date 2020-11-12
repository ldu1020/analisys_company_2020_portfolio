/** @format */

import { observer } from 'mobx-react';
import React from 'react';
import { Line } from 'react-chartjs-2';

interface ChartOfAccountsProps {
  pickedItem: AccountsType | undefined;
}

const ChartOfAccounts: React.FC<ChartOfAccountsProps> = observer(
  ({ pickedItem }) => {
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
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function (value: any) {
                  return moneyToString(value);
                },
              },
            },
          ],
        },
      };

      return <Line data={data} options={options} />;
    } else {
      return null;
    }
  }
);

function moneyToString(money: number) {
  if (money >= 1000000000000) {
    return (money / 1000000000000).toFixed(1) + '조 원';
  } else if (money >= 100000000) {
    return (money / 100000000).toFixed(1) + '억 원';
  } else if (money >= 10000) {
    return (money / 10000).toFixed(1) + '만 원';
  } else if (money < -1000000000000) {
    return (money / 1000000000000).toFixed(1) + '조 원';
  } else if (money <= -100000000) {
    return (money / 100000000).toFixed(1) + '억 원';
  } else if (money <= -10000) {
    return (money / 10000).toFixed(1) + '만 원';
  }
}

export default ChartOfAccounts;
