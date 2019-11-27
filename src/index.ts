import { csvParse } from 'd3';
import InputText from './InputText';
import Member from './Members';
//#region setup Data
let parsedData = csvParse(InputText);
let canGiveMap = new Map<Member, Map<Member, boolean>>();
const KKMembers: Member[] = parsedData.columns.filter(
  s => s !== 'Receiver'
) as Member[];
KKMembers.forEach(c => canGiveMap.set(c, new Map()));
parsedData.map(d => {
  const presentReceiver = d.Receiver as Member;
  for (let giver in d) {
    if (giver === 'Receiver') continue;
    giver = giver as Member;
    const canGive = d[giver]! === 'true';
    canGiveMap
      .get(giver as Member)!
      .set(presentReceiver, canGive);
  }
});
console.log(canGiveMap.entries());

//#endregion

const availableToReceiveGift = new Set(KKMembers);
const possibleArrangements: Map<Member, Member>[] = [];
const checkIfOutput = (
  gifter: Member,
  currentArrangement: Map<Member, Member>
) => {
  gifter === Member.WillJr &&
    possibleArrangements.push(currentArrangement);
};
function nextGifter(
  gifter: Member,
  availableReceivers: Set<Member>,
  currentArrangement: Map<Member, Member>
) {}
