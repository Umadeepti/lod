
export class PalData {
  public name: string;
  public description: string;
  public imagePath: string;
  //public testDatas: TestData[];

  //constructor(name: string, desc: string, imagePath: string, testDatas: TestData[]) {
  constructor(name: string, desc: string, imagePath: string) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
   // this.testDatas = testDatas;
  }
}
