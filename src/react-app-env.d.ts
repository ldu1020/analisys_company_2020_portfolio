/** @format */
/// <reference types="react-scripts" />

type UserData = {
  displayName: string | null;
  email: string | null;
  uid: string | null;
};
//Store

interface STORE {
  /** 모종의 문제로 DART API 를 이용하지 못할 시 를 대비해 firebase 에 저장해둔 회사들의 데이터를 chosenCorpList 로 할당합니다.  */
  ForERROR(): void;
  /** 회사이름을 인자로 데이터베이스에서 해당회사의 코드를 찾아 인자로 받은 콜백에 데이터를 전달합니다. . */
  findCorpName(corp_name: string, callback: any): Promise<void>;
  /** 이 앱에서 전달하는 모든 정보가 회사별로 구분된 데이터입니다.*/
  chosenCorpList: ChosenCorpList[];
  addChosenCorpList(data: ChosenCorpList): void;
  removeChosenCorpList(id: string): void;
  /** Promise All을 이용하여 chosenCoprList에 fetch 된 데이터를 추가합니다. */
  addFetchedCorpData(dataForFetch: DataForFetch): Promise<void>;
  /**Promise All 을 이용한 addFetchedCorpData 함수가 실행 되는 동안의 로딩의 상태입니다. */
  fetchLoading: boolean;
  /** 각 회사의 데이터를 보여주는 컴포넌트는 이 데이터를 중심으로 랜더링됩니다.*/
  focusedCorpList: ChosenCorpList;
  setFocusedCorpList(data: ChosenCorpList): void;
  /** 주요 계정과목을 위한 데이터입니다. focusedCorpList에서 데이터를 가공하여
   * 단일재무제표(OFS) 의 손익계산서(IS)와 대차대조표(BS)의 데이터로 필터링 했습니다 */
  readonly fitteredMajorDataOfFocused: {
    ISdata: MajorAccountsType[] | undefined;
    BSdata: MajorAccountsType[] | undefined;
  };
  /** 복합분석을 위한 데이터입니다. focusedCorpList에서 데이터를 가공합니다 이름, 이름디테일,minus 사용여부,금액(number) 데이터로 가공했습니다. */
  readonly flatDataOfFocused: FlatData[] | undefined;
}

//For Component

type FindCorpState = {
  nameError: boolean;
  corp_name: AccountsType['corp_name'];
  corp_code: string | null;
  bsns_year: AccountsType['bsns_year'];
  reprt_code: AccountsType['reprt_code'];
};

type FindCorpAction =
  | { type: 'ON_CHANGE'; target: any }
  | { type: 'SEARCH_NAME'; corp_code: any };

type CORPCODE = {
  corp_code: string;
  corp_name: string;
};

interface DataForFetch extends CORPCODE {
  id?: string;
  bsns_year: AccountsType['bsns_year'];
  reprt_code: AccountsType['reprt_code'];
}

type ErrorDataOfFetch = [{ error: string }];

//For STORE
type FsFilterType = 'IS' | 'BS';

interface ChosenCorpList extends DataForFetch {
  allAccounts: AccountsType[] | null;
  majorAccounts: MajorAccountsType[] | null;
  staff: StaffType[] | null;
}

type FlatData = {
  name: string;
  amount: number;
  detail?: string;
  minus?: boolean;
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

/**전채제무제표의 계정과목 */
type AccountsType = {
  /**mapping 으로 부여한 아이디 */
  id?: string;
  /**접수번호(14자리) */
  rcept_no: string;
  /**보고서 코드
   * 1분기보고서 : 11013
   * 반기보고서 : 11012
   * 3분기보고서 : 11014
   * 사업보고서 : 11011
   */
  reprt_code: '11011' | '11012' | '11013' | '11014';
  /**사업연도 ex)2020*/
  bsns_year: string;
  /**고유번호(공시대상회사의 고유번호)*/
  corp_code: string;
  /** 재무재표 구분
   * BS : 재무상태표
   *IS : 손익계산서
   *CIS : 포괄손익계산서
   *CF : 현금흐름표
   *SCE : 자본변동표
   */
  sj_div: 'IS' | 'BS' | 'CIS' | 'CF' | 'SCE';
  /**재무재표 명*/
  sj_nm: string;
  /**계정ID*/
  account_id: string;
  /**계정 명*/
  account_nm: string;
  /**계정 상세 (자본변동표에만 출력)*/
  account_detail: string;
  /**당기 명*/
  thstrm_nm: string;
  /**당기 금액*/
  thstrm_amount: string;
  /**당기 누적금액*/
  thstrm_add_amount: string;
  /**전기 명*/
  frmtrm_nm: string;
  /**전기 금액*/
  frmtrm_amount: string;
  /**전전기 명*/
  bfefrmtrm_nm: string;
  /**전전기 금액*/
  bfefrmtrm_amount: string;
  /**계정과목 정렬순서*/
  ord: string;
};

/**주요제무제표의 계정과목 */
interface MajorAccountsType extends AccountsType {
  /** 상장회사의 종목코드 (6자리)*/
  stock_code?: string;
  /** 개별,연결구분
   * CFS:연결재무제표, OFS:재무제표 */
  fs_div?: 'CFS' | 'OFS';
  /**개별,연결명 */
  fs_nm?: string;
  /**당기일자*/
  thstrm_dt?: string;
  /** 전기일자*/
  frmtrm_dt?: string;
  /** 전전기 일자*/
  bfefrmtrm_dt?: string;
}

/**직원현황 */
interface StaffType {
  /**접수번호*/
  rcept_no: string;
  /** 법인구분 : : Y(유가), K(코스닥), N(코넥스), E(기타)*/
  corp_cls: string;
  /** 공시대상회사의 고유번호*/
  corp_code: string;
  /**법인 명*/
  corp_name: string;
  /** 사업부문*/
  fo_bbm: string;
  /**성별 : 남 , 여*/
  sexdstn: string;
  /**개정 전 직원 수 (정규직)*/
  reform_bfe_emp_co_rgllbr?: string;
  /**개정 전 직원 수 (계약직)*/
  reform_bfe_emp_co_cnttk?: string;
  /**개정 전 직원 수 기타*/
  reform_bfe_emp_co_etc?: string;
  /**정규직 수*/
  rgllbr_co: string;
  /**정규직 단시간 근로자 수*/
  rgllbr_abacpt_labrr_co?: string;
  /** 계약직 수*/
  cnttk_co: string;
  /**계약직 단시간 근로자 수*/
  cnttk_abacpt_labrr_co: string;
  /**합계*/
  sm: string;
  /** 평균 근속 연수*/
  avrg_cnwk_sdytrn?: string;
  /** 연간 급여 총액*/
  fyer_salary_totamt: string;
  /**1인평균급여액*/
  jan_salary_am: string;
  /**비고*/
  rm: string;
}
