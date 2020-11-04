/** @format */
import axios from 'axios';
import JSZip from 'jszip';
import convert from 'xml-js';

const key = 'ce13545eedd8abca0280126dd154feb1492b926a';

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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
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
