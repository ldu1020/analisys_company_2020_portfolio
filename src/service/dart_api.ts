/** @format */
import axios from 'axios';
import JSZip from 'jszip';
import convert from 'xml-js';

const key = process.env.DART_API_KEY;

export const fetchCORPCODE = async () => {
  const uniqueIdAPI = `api/corpCode.xml?crtfc_key=${key}`;

  try {
    const CORPCODE = await axios
      .get(uniqueIdAPI, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        return unZip(res);
      })
      .then((res) => {
        return toJson(res).result.list;
      });

    return CORPCODE;
  } catch (err) {
    alert(
      `데이터를 불러오지 못했습니다. 오류가 계속 될 시 dart api 홈페이지를 방문 해 보세요`
    );
  }
};

export const fetchAccountsOfFS = async (choiceCorpList: ChoiseCorpList) => {
  const { corp_code, bsns_year, reprt_code } = choiceCorpList;
  const MajorOfFsAPI = `api/fnlttSinglAcntAll.json?crtfc_key=${key}&corp_code=${corp_code}&bsns_year=${bsns_year}&reprt_code=${reprt_code}&fs_div=OFS`;
  console.log(MajorOfFsAPI);
  try {
    const MajorOfFS = await axios.get(MajorOfFsAPI);
    return MajorOfFS;
  } catch (err) {
    alert(
      `재무제표 데이터를 불러오지 못했습니다. 오류가 계속 될 시 dart api 홈페이지를 방문 해 보세요`
    );
  }
};

export const fetchMajorAccountsOfFS = async (
  choiceCorpList: ChoiseCorpList
) => {
  const { corp_code, bsns_year, reprt_code } = choiceCorpList;
  const MajorOfFsAPI = `api/fnlttSinglAcnt.json?crtfc_key=${key}&corp_code=${corp_code}&bsns_year=${bsns_year}&reprt_code=${reprt_code}`;
  console.log(MajorOfFsAPI);

  try {
    const MajorOfFS = await axios.get(MajorOfFsAPI);
    return MajorOfFS;
  } catch (err) {
    alert(
      `주요 계정과목 데이터를 불러오지 못했습니다. 오류가 계속 될 시 dart api 홈페이지를 방문 해 보세요`
    );
  }
};

export const fetchRepurchase = async (choiceCorpList: ChoiseCorpList) => {
  const { corp_code, bsns_year, reprt_code } = choiceCorpList;
  const RepurchaseAPI = `api/tesstkAcqsDspsSttus.json?crtfc_key=${key}&corp_code=${corp_code}&bsns_year=${bsns_year}&reprt_code=${reprt_code}`;
  console.log(RepurchaseAPI);

  try {
    const Repurchase = await axios.get(RepurchaseAPI);
    return Repurchase;
  } catch (err) {
    alert(
      ` 데이터를 불러오지 못했습니다. 오류가 계속 될 시 dart api 홈페이지를 방문 해 보세요`
    );
  }
};

export const fetchStaff = async (choiceCorpList: ChoiseCorpList) => {
  const { corp_code, bsns_year, reprt_code } = choiceCorpList;
  const StaffAPI = `api/empSttus.json?crtfc_key=${key}&corp_code=${corp_code}&bsns_year=${bsns_year}&reprt_code=${reprt_code}`;
  console.log(StaffAPI);

  try {
    const Staff = await axios.get(StaffAPI);
    return Staff;
  } catch (err) {
    alert(
      `직원 현황 데이터를 불러오지 못했습니다. 오류가 계속 될 시 dart api 홈페이지를 방문 해 보세요`
    );
  }
};

function unZip(res: any) {
  return JSZip.loadAsync(res.data).then((data) =>
    data.files['CORPCODE.xml'].async('string')
  );
}

function toJson(data: string) {
  const options = { compact: true, spaces: 4, textFn: RemoveJsonTextAttribute };
  let dataString = convert.xml2json(data, options);
  return JSON.parse(dataString);
}

const RemoveJsonTextAttribute = (value: any, parentElement: any) => {
  try {
    const keyNo = Object.keys(parentElement._parent).length;
    const keyName = Object.keys(parentElement._parent)[keyNo - 1];
    parentElement._parent[keyName] = value;
  } catch (e) {
    console.log(e);
  }
};
