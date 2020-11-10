/** @format */

/** @format */

import { fetchStaff } from './../service/dart_api';
import { nanoid } from 'nanoid';
import {
  fetchAccountsOfFS,
  fetchMajorAccountsOfFS,
} from './../service/dart_api';
import { findCorpCodeOfDB } from '../service/database';

export function createStore() {
  return {
    async findCorpName(corp_name: string, callback: any) {
      await findCorpCodeOfDB(corp_name, (dataOfDB: any) => {
        let value = dataOfDB ? Object.values(dataOfDB)[0] : null;
        callback(value as string | null);
      });
    },
    chosenCorpList: [] as ChosenCorpList[],
    addChosenCorpList(data: ChosenCorpList) {
      this.chosenCorpList.push(data);
    },
    removeChosenCorpList(id: string) {
      this.chosenCorpList = this.chosenCorpList.filter((li) => li.id !== id);
    },
    async addFetchedCorpData(choiceList: ChoiseCorpList) {
      try {
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

            const fetchedData = {
              ...choiceList,
              allAccounts,
              majorAccounts,
              staff,
            };
            this.addChosenCorpList(fetchedData);
            this.setFocusedCorpList(fetchedData);
          });
      } catch (err) {
        console.log(err);
      }
    },
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
    get fletDataOfFoucused() {
      const { allAccounts, staff } = this.focusedCorpList;
      const flattenAllAccounts = allAccounts?.map((list) => {
        return {
          name: list.account_nm,
          amount: Number(list.thstrm_amount.split(',').join('')),
          detail: list.account_detail === '-' ? undefined : list.account_detail,
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

      const flattenStaff = {
        name: '인건비',
        amount: allAmountOfStaff ? allAmountOfStaff : 0,
        detail: undefined,
      };

      return flattenAllAccounts?.concat(flattenStaff);
    },
    customSET: [],
    itemForCustom: [] as ItemForCustomData[],
    addItemForCustom(data: ItemForCustomData) {
      console.log(this.itemForCustom);
      const notInnerData = this.itemForCustom.findIndex(
        (li) => li.name + li.detail === data.name + data.detail
      );
      notInnerData === -1 && this.itemForCustom.push(data);
    },
    removeItemForCustom(name: string) {
      this.itemForCustom = this.itemForCustom.filter((li) => li.name !== name);
    },
  };
}

export type TStore = ReturnType<typeof createStore>;
