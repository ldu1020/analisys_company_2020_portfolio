/** @format */

export const staffState = () => ({
  navValue: 0,
  setNavValue(data: any) {
    this.navValue = data;
  },
  dataOfHeader: [] as StaffType[],
  setHeaderData(data: StaffType[]) {
    this.dataOfHeader = data;
  },
  get genderData() {
    const manData = this.dataOfHeader.find((li) => li.sexdstn === '남');
    const womanData = this.dataOfHeader.find((li) => li.sexdstn === '여');
    return { manData, womanData };
  },
  dataForGraph: {
    subHeader: '',
    manAmount: '10',
    womanAmount: '20',
  },
  setDataForGraph(data: any) {
    this.dataForGraph = data;
  },
  get eachRate() {
    const man = Number(this.dataForGraph.manAmount.split(',').join(''));
    const woman = Number(this.dataForGraph.womanAmount.split(',').join(''));
    return {
      manRate: man ? man / (man + woman) : 0,
      womanRate: woman ? woman / (man + woman) : 0,
    };
  },
});
