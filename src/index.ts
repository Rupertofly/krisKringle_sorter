import { csvParse } from 'd3';
import InputText from './InputText';
import Member from './Members';

let parsedData = csvParse(InputText);
let canGive = new Map<Member, Map<Member, boolean>>();
parsedData.map(d => {
  const presentReceiver = d.Receiver as Member;
});
