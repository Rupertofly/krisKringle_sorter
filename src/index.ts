import { csvParse } from 'd3';
import InputText from './InputText';
import Member from './Members';
import _ from 'lodash';
import fs from 'fs';
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
    const canGive = d[giver]! === '1';
    canGiveMap
      .get(giver as Member)!
      .set(presentReceiver, canGive);
  }
});
console.log(canGiveMap.entries());

//#endregion

const availableToReceiveGift = new Set(KKMembers);
const availableToGiveGift = new Set(KKMembers);
const possibleArrangements: Map<Member, Member>[] = [];
const checkIfOutput = (
  availableGifters: Set<Member>,
  currentArrangement: Map<Member, Member>
) => {
  if (
    availableGifters.size < 1 &&
    currentArrangement.size > 17
  ) {
    possibleArrangements.push(currentArrangement);
    console.log(currentArrangement);
    console.log(
      `possible Arrangements: ${possibleArrangements.length}`
    );
    // fs.appendFileSync(
    //   './outputFile.txt',
    //   `[` +
    //     [...currentArrangement]
    //       .map(v => `${v[0]} gives a gift to ${v[1]}`)
    //       .join('\n') +
    //     ']\n'
    // );
  }
};
function nextGifter(
  gifter: Member,
  availableGifters: Set<Member>,
  availableReceivers: Set<Member>,
  currentArrangement: Map<Member, Member>
) {
  const canGive = canGiveMap.get(gifter)!;
  availableGifters.delete(gifter);
  for (let receiver of availableReceivers) {
    if (gifter === Member.Richard) console.log(receiver);
    if (
      availableReceivers.has(receiver) &&
      canGive.get(receiver)
    ) {
      const newGiftSet = new Set([...availableGifters]);

      const newReceiverSet = new Set([
        ...availableReceivers,
      ]);
      newReceiverSet.delete(receiver);
      const newArrangement = new Map([
        ...currentArrangement,
      ]);
      newArrangement.set(gifter, receiver);
      checkIfOutput(availableGifters, newArrangement);
      for (let newGifter of availableGifters) {
        nextGifter(
          newGifter,
          newGiftSet,
          newReceiverSet,
          newArrangement
        );
      }
    } else {
      // console.log(
      //   `failed ${gifter} can't give to ${receiver}`
      // );
      continue;
    }
  }
}
let v = [...availableToGiveGift];
let c: Member[] = (_.shuffle(v) as unknown) as Member[];
nextGifter(
  Member.Richard,
  new Set(c),
  new Set(_.shuffle([...availableToReceiveGift])),
  new Map<Member, Member>()
);
