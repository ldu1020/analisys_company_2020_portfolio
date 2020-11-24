/** @format */
import axios from 'axios';

const key = process.env.REACT_APP_DART_API_KEY;

export const fetchAccountsOfFS = async (choiceCorpList: DataForFetch) => {
  const { corp_code, bsns_year, reprt_code } = choiceCorpList;
  const MajorOfFsAPI = `/giphy/api/fnlttSinglAcntAll.json?crtfc_key=${key}&corp_code=${corp_code}&bsns_year=${bsns_year}&reprt_code=${reprt_code}&fs_div=OFS`;
  try {
    const MajorOfFS = await axios.get(MajorOfFsAPI);
    return MajorOfFS;
  } catch (err) {
    alert(
      `재무제표 데이터를 불러오지 못했습니다. 오류가 계속 될 시 dart api 홈페이지를 방문 해 보세요`
    );
  }
};

export const fetchMajorAccountsOfFS = async (choiceCorpList: DataForFetch) => {
  const { corp_code, bsns_year, reprt_code } = choiceCorpList;
  const MajorOfFsAPI = `/giphy/api/fnlttSinglAcnt.json?crtfc_key=${key}&corp_code=${corp_code}&bsns_year=${bsns_year}&reprt_code=${reprt_code}`;

  try {
    const MajorOfFS = await axios.get(MajorOfFsAPI);
    return MajorOfFS;
  } catch (err) {
    alert(
      `주요 계정과목 데이터를 불러오지 못했습니다. 오류가 계속 될 시 dart api 홈페이지를 방문 해 보세요`
    );
  }
};

export const fetchRepurchase = async (choiceCorpList: DataForFetch) => {
  const { corp_code, bsns_year, reprt_code } = choiceCorpList;
  const RepurchaseAPI = `/giphy/api/tesstkAcqsDspsSttus.json?crtfc_key=${key}&corp_code=${corp_code}&bsns_year=${bsns_year}&reprt_code=${reprt_code}`;

  try {
    const Repurchase = await axios.get(RepurchaseAPI);
    return Repurchase;
  } catch (err) {
    alert(
      ` 데이터를 불러오지 못했습니다. 오류가 계속 될 시 dart api 홈페이지를 방문 해 보세요`
    );
  }
};

export const fetchStaff = async (choiceCorpList: DataForFetch) => {
  const { corp_code, bsns_year, reprt_code } = choiceCorpList;
  const StaffAPI = `/giphy/api/empSttus.json?crtfc_key=${key}&corp_code=${corp_code}&bsns_year=${bsns_year}&reprt_code=${reprt_code}`;

  try {
    const Staff = await axios.get(StaffAPI);
    return Staff;
  } catch (err) {
    alert(
      `직원 현황 데이터를 불러오지 못했습니다. 오류가 계속 될 시 dart api 홈페이지를 방문 해 보세요`
    );
  }
};
