/** @format */
/// <reference types="react-scripts" />

type UserData = {
  displayName: string | null;
  email: string | null;
  uid: string | null;
};
//Store

interface STORE {
  corpList: CORPCODE[];
  chosenCorpList: ChosenCorpList[];
  focusedCorpList: ChosenCorpList;
  setCorpList(): void;
  findCorpName(corp_name: string): CORPCODE;
  addFetchedCorpData(dataForFetch: DataForFetch): void;
  setFocusedCorpList(data: ChosenCorpList | null): void;
}

//Find Corp Data input State
type ReprtCode = '11011' | '11012' | '11013' | '11014' | null;

type CORPCODE = {
  corp_code: string;
  corp_name: string;
  modify_date: string;
};

type FindCorpState = {
  corp_name: string;
  bsns_year: string;
  reprt_code: ReprtCode;
  nameError: boolean;
  corpData: CORPCODE | null | undefined;
};

type FindCorpAction =
  | { type: 'ON_CHANGE'; target: any }
  | { type: 'SEARCH_NAME'; pickedData: CORPCODE | null | undefined };

interface DataForFetch extends CORPCODE {
  id?: string;
  bsns_year: string;
  reprt_code: string;
}

interface ChosenCorpList extends InputState {
  allAccounts: Accounts[] | ErrorDataOfFetch;
  majorAccounts: Accounts[] | ErrorDataOfFetch;
  staff: any[] | ErrorDataOfFetch;
  repurchase: any[] | ErrorDataOfFetch;
}

type ErrorDataOfFetch = [{ error: string }];

type ChoiseCorpList = {
  id: string;
  corp_code: string;
  modify_date: string;
  corp_name: string;
  bsns_year: string;
  reprt_code: stirng;
};

type FsFilterType = 'IS' | 'BS';

type AccountsType = {
  id?: string;
  stock_code?: string;
  fs_div?: string;
  fs_nm?: string;
  thstrm_dt?: string;
  frmtrm_dt?: string;
  bfefrmtrm_dt?: string;
  rcept_no: string;
  reprt_code: string;
  bsns_year: string;
  corp_code: string;
  sj_div: 'IS' | 'BS' | 'CIS' | 'CF' | 'SCE' | string;
  sj_nm: string;
  account_id: string;
  account_nm: string;
  account_detail: string;
  thstrm_nm: string;
  thstrm_amount: string;
  thstrm_add_amount: string;
  frmtrm_nm: string;
  frmtrm_amount: string;
  bfefrmtrm_nm: string;
  bfefrmtrm_amount: string;
  ord: string;
};

type AmountOf3Years = {
  account_nm: string;
  thstrm_nm: string;
  thstrm_amount: string;
  frmtrm_nm: string;
  frmtrm_amount: string;
  bfefrmtrm_nm: string;
  bfefrmtrm_amount: string;
};
