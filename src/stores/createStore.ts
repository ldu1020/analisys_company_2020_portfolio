/** @format */

import { fetchRepurchase, fetchStaff } from './../service/dart_api';
import { nanoid } from 'nanoid';
import {
  fetchAccountsOfFS,
  fetchMajorAccountsOfFS,
} from './../service/dart_api';
import { testSync } from '../service/database';

export function createStore() {
  return {
    corpList: [] as CORPCODE[],
    async setCorpList() {
      try {
        // const fetchedData = await fetchCORPCODE();
        // console.log(fetchedData);
        // this.corpList = [...fetchedData];

        //FOR TEST
        testSync((data: any) => {
          this.focusedCorpList = data;
        });
        console.log('fetcj!');
      } catch (err) {
        console.log(err);
      }
    },
    chosenCorpList: [] as ChosenCorpList[],
    addChosenCorpList(data: ChosenCorpList) {
      this.chosenCorpList.push(data);
    },
    removeChosenCorpList(id: string) {
      this.chosenCorpList = this.chosenCorpList.filter((li) => li.id !== id);
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
            repurchase = data[2];
            staff = data[3];

            const fetchedData = {
              ...choiceList,
              allAccounts,
              majorAccounts,
              repurchase,
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
