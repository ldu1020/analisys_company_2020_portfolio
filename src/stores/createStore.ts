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
    focusedCorpList: {} as ChosenCorpList,
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
    choiceCorpList(inputState: InputState): ChoiseCorpList | void {
      console.log(`들어온데이터: `);
      console.log(inputState);
      const pick = this.corpList.find(
        (li: CORPCODE) => li.corp_name === inputState.corp_name
      );
      if (!pick) {
        alert('찾으시는 회사명을 다시한번 확인 해 주세요');
      } else {
        const data = {
          ...inputState,
          id: nanoid(),
          corp_code: pick.corp_code,
          modify_date: pick.modify_date,
        };
        console.log(`가공된 데이터: `);
        console.log(data);

        return data;
      }
    },
    async setChosenCorpList(choiceList: ChoiseCorpList) {
      try {
        const fsListData = await fetchAccountsOfFS(choiceList);
        const MajorFsListData = await fetchMajorAccountsOfFS(choiceList);

        let fsList: FsList[];
        let MajorFsList: FsList[];

        if (fsListData.data.list && MajorFsListData.data.list) {
          fsList = (fsListData.data.list as FsList[]).map((accountList) => ({
            ...accountList,
            id: nanoid(),
          }));
          MajorFsList = (MajorFsListData.data.list as FsList[]).map(
            (accountList) => ({
              ...accountList,
              id: nanoid(),
            })
          );
          const { id, modify_date, corp_name } = choiceList;
          this.chosenCorpList.push({
            id,
            corp_name,
            modify_date,
            fsList,
            MajorFsList,
          });
          this.focusedCorpList = {
            id,
            corp_name,
            modify_date,
            fsList,
            MajorFsList,
          };
        } else {
          alert('조회 된 데이터가 없습니다.');
        }
      } catch (err) {
        console.log(err);
      }
    },
    setFocusedCorpList(id: string) {
      const dataSelected = this.chosenCorpList.find((li) => li.id === id);
      dataSelected
        ? (this.focusedCorpList = dataSelected)
        : alert('해당 회사의 데이터가 없습니다.');
      console.log(this.focusedCorpList);
    },
    getFitterDataOfFS(MajorFsList: FsList[], type: FsFilterType) {
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
