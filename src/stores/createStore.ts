/** @format */

import { fetchRepurchase, fetchStaff } from './../service/dart_api';
/** @format */

import { nanoid } from 'nanoid';
import {
  fetchCORPCODE,
  fetchAccountsOfFS,
  fetchMajorAccountsOfFS,
} from './../service/dart_api';
/** @format */

export function createStore() {
  return {
    corpList: [] as CORPCODE[],
    chosenCorpList: [] as ChosenCorpList[],
    focusedCorpList: null as ChosenCorpList | null,
    async setCorpList() {
      try {
        const fetchedData = await fetchCORPCODE();
        console.log(fetchedData);
        this.corpList = [...fetchedData];
      } catch (err) {
        console.log(err);
      }
    },
    findCorpName(corp_name: string) {
      const pick = this.corpList.find(
        (li: CORPCODE) => li.corp_name === corp_name
      );
      return pick;
    },
    async addFetchedCorpData(choiceList: ChoiseCorpList) {
      try {
        let allAccounts;
        let majorAccounts;
        let repurchase;
        let staff;

        Promise.all([
          fetchAccountsOfFS(choiceList),
          fetchMajorAccountsOfFS(choiceList),
          fetchRepurchase(choiceList),
          fetchStaff(choiceList),
        ])
          .then((data) => {
            return data.map((li) =>
              li && li.data.status === '000'
                ? li.data.list
                : [{ error: '데이터를 불러오지 못했습니다.' }]
            );
          })
          .then((data) => {
            allAccounts = data[0].map((li: AccountsType) => ({
              ...li,
              id: nanoid(),
            }));
            majorAccounts = data[1];
            repurchase = data[2];
            staff = data[3];

            const fetchedData = {
              ...choiceList,
              allAccounts,
              majorAccounts,
              repurchase,
              staff,
            };
            this.chosenCorpList.push(fetchedData);
          });
      } catch (err) {
        console.log(err);
      }
    },
    setFocusedCorpList(data: ChosenCorpList | null) {
      this.focusedCorpList = data;
    },
    getFitterDataOfFS(MajorFsList: AccountsType[], type: FsFilterType) {
      if (!MajorFsList) {
        console.log(MajorFsList);
        return [
          {
            account_nm: '데이터 불러오기 실패',
            amount: '0',
            rate: `-100`,
          },
        ];
      } else {
        const FSData = MajorFsList.filter(
          (li) => li.sj_div === type && li.fs_div === 'OFS'
        );
        let data;

        switch (type) {
          case 'IS':
            const WholeBnefit = FSData[0].thstrm_amount.split(',').join('');
            data = FSData.map((li: any) => {
              const eachRate = li.thstrm_amount.split(',').join('');
              const rate = (Number(eachRate) / Number(WholeBnefit)) * 100;
              return {
                account_nm: li.account_nm,
                amount: li.thstrm_amount,
                rate: `${rate.toFixed(1)}`,
              };
            });
            break;
          case 'BS':
            const wholeAsset = FSData.find((li) => li.account_nm === '자산총계')
              ?.thstrm_amount.split(',')
              .join('');
            console.log(wholeAsset);
            data = FSData.map((li: any) => {
              const eachRate = li.thstrm_amount.split(',').join('');
              let rate = (Number(eachRate) / Number(wholeAsset)) * 100;
              console.log(rate);
              return {
                account_nm: li.account_nm,
                amount: li.thstrm_amount,
                rate: rate ? `${rate.toFixed(2)}` : li.thstrm_amount,
              };
            });
            break;
        }

        return data;
      }
    },
  };
}

export type TStore = ReturnType<typeof createStore>;
