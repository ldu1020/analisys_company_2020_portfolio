/** @format */

/// <reference types="react-scripts" />
/** @format */

/// <reference types="react-scripts" />
type CORPCODE = {
  corp_code: string;
  corp_name: string;
  modify_date: string;
};

type ReprtCode = 11011 | 11012 | 11013 | 11014 | null;

type InputState = {
  id?: any;
  corp_name: string;
  corp_code: string;
  bsns_year: string;
  reprt_code: string;
};

type ChoiseCorpList = {
  id: string;
  corp_code: string;
  modify_date: string;
  corp_name: string;
  bsns_year: string;
  reprt_code: stirng;
};

type AccountsType = {
  account_nm: string;
  amount: string;
  rate: string;
};

type FsFilterType = 'IS' | 'BS';

type FsList = {
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

type ChosenCorpList = {
  id: string;
  corp_name: string;
  modify_date: string;
  fsList: FsList[];
  MajorFsList: FsList[];
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
