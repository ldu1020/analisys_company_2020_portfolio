/** @format */

export const ffc_initialState: FindCorpState = {
  corp_name: '',
  bsns_year: '2019',
  reprt_code: '11011',
  nameError: false,
  corpData: null,
};

export function reducer(
  state: FindCorpState,
  action: FindCorpAction
): FindCorpState {
  switch (action.type) {
    case 'ON_CHANGE':
      const { name, value } = action.target;
      console.log(name, value);
      if (name === 'corp_name') {
        return { ...state, [name]: value, corpData: null, nameError: false };
      } else {
        return { ...state, [name]: value };
      }
    case 'SEARCH_NAME':
      if (action.pickedData) {
        return { ...state, corpData: action.pickedData, nameError: false };
      } else {
        return { ...state, nameError: true };
      }
    default:
      return state;
  }
}
