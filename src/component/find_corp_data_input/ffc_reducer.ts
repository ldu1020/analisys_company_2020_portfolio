/** @format */

export const ffc_initialState = {
  corp_name: '',
  nameError: false,
  corpData: null,
  bsns_year: '2019',
  reprt_code: '11011',
};

export function reducer(state: any, action: any) {
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
    case '':
      return {};
    default:
      return state;
  }
}
