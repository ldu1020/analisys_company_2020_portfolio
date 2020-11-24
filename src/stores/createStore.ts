/** @format */

/** @format */

import { fetchStaff } from './../service/dart_api';
import { nanoid } from 'nanoid';
import {
  fetchAccountsOfFS,
  fetchMajorAccountsOfFS,
} from './../service/dart_api';
import { findCorpCodeOfDB, testSync } from '../service/database';

export function createStore(): STORE {
  return {
    async ForERROR() {
      this.fetchLoading = true;
      testSync((data: Record<string, ChosenCorpList>) => {
        Object.values(data).forEach((dataList) => {
          dataList && this.addChosenCorpList(dataList);
        });
        this.chosenCorpList.length > 0 &&
          this.setFocusedCorpList(this.chosenCorpList[0]);
        this.fetchLoading = false;
      });
    },
    async findCorpName(corp_name: string, callback: any) {
      await findCorpCodeOfDB(corp_name, (dataOfDB: any) => {
        let value = dataOfDB ? Object.values(dataOfDB)[0] : null;
        callback(value as string | null);
      });
    },
    chosenCorpList: [] as ChosenCorpList[],
    addChosenCorpList(data: ChosenCorpList) {
      const inItem = this.chosenCorpList.find(
        (li) =>
          data.corp_name + data.bsns_year + data.reprt_code ===
          li.corp_name + li.bsns_year + li.reprt_code
      );
      !inItem && this.chosenCorpList.push(data);
    },
    removeChosenCorpList(id: string) {
      this.chosenCorpList = this.chosenCorpList.filter((li) => li.id !== id);
    },
    async addFetchedCorpData(choiceList: DataForFetch) {
      try {
        this.fetchLoading = true;

        let allAccounts;
        let majorAccounts;
        let staff;

        Promise.all([
          fetchAccountsOfFS(choiceList),
          fetchMajorAccountsOfFS(choiceList),
          fetchStaff(choiceList),
        ])
          .then((data) => {
            return data.map((li) =>
              li && li.data.status === '000' ? li.data.list : null
            );
          })
          .then((data) => {
            allAccounts =
              data[0] &&
              data[0].map((li: AccountsType) => ({
                ...li,
                id: nanoid(),
              }));
            majorAccounts = data[1];
            staff = data[2];

            return { ...choiceList, allAccounts, majorAccounts, staff };
          })
          .then((data) => {
            this.addChosenCorpList(data);
            this.setFocusedCorpList(data);
          })
          .then(() => {
            this.fetchLoading = false;
          });
      } catch (err) {
        console.log(err);
        this.fetchLoading = false;
      }
    },
    fetchLoading: false,
    focusedCorpList: {} as ChosenCorpList,
    setFocusedCorpList(data: ChosenCorpList) {
      this.focusedCorpList = data;
    },
    get fitteredMajorDataOfFocused() {
      const majorAccount = this.focusedCorpList?.majorAccounts;

      const ISdata = majorAccount?.filter(
        (li) => li.sj_div === 'IS' && li.fs_div === 'OFS'
      );
      const BSdata = majorAccount?.filter(
        (li) => li.sj_div === 'BS' && li.fs_div === 'OFS'
      );

      return { ISdata, BSdata };
    },
    get flatDataOfFocused() {
      const { allAccounts, staff } = this.focusedCorpList;
      const flattenAllAccounts = allAccounts?.map((list) => {
        return {
          name: list.account_nm,
          amount: Number(list.thstrm_amount.split(',').join('')),
          detail: list.account_detail === '-' ? undefined : list.account_detail,
          minus: false,
        };
      });
      const allAmountOfStaff = staff
        ?.map((list) => {
          const ammount =
            list.fyer_salary_totamt === '-'
              ? 0
              : Number(list.fyer_salary_totamt.split(',').join(''));
          return ammount;
        })
        .reduce((pre, cur) => {
          return pre + cur;
        });

      const flattenStaff = [
        {
          name: '인건비',
          amount: allAmountOfStaff ? allAmountOfStaff : 0,
          detail: undefined,
          minus: false,
        },
        {
          name: '조회실패',
          amount: 0,
          detail: undefined,
          minus: false,
        },
      ];

      return flattenAllAccounts?.concat(flattenStaff);
    },
  };
}

export type TStore = ReturnType<typeof createStore>;
