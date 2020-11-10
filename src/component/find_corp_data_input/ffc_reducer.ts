/** @format */

export const ffc_initialState: FindCorpState = {
  corp_name: '',
  bsns_year: '2019',
  reprt_code: '11011',
  nameError: false,
  corp_code: null,
  loading: false,
  succese: false,
};

export function reducer(
  state: FindCorpState,
  action: FindCorpAction
): FindCorpState {
  switch (action.type) {
    case 'ON_CHANGE':
      const { name, value } = action.target;
      if (name === 'corp_name') {
        return { ...state, [name]: value, corp_code: null, nameError: false };
      } else {
        return { ...state, [name]: value };
      }
    case 'SEARCH_NAME':
      console.log(action.corp_code);
      if (action.corp_code) {
        return { ...state, corp_code: action.corp_code, nameError: false };
      } else {
        return { ...state, nameError: true };
      }
    default:
      return state;
  }
}
