"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_1 = require("d3");
const InputText_1 = __importDefault(require("./InputText"));
const Members_1 = __importDefault(require("./Members"));
const lodash_1 = __importDefault(require("lodash"));
//#region setup Data
let parsedData = d3_1.csvParse(InputText_1.default);
let canGiveMap = new Map();
const KKMembers = parsedData.columns.filter(s => s !== 'Receiver');
KKMembers.forEach(c => canGiveMap.set(c, new Map()));
parsedData.map(d => {
    const presentReceiver = d.Receiver;
    for (let giver in d) {
        if (giver === 'Receiver')
            continue;
        giver = giver;
        const canGive = d[giver] === '1';
        canGiveMap
            .get(giver)
            .set(presentReceiver, canGive);
    }
});
console.log(canGiveMap.entries());
//#endregion
const availableToReceiveGift = new Set(KKMembers);
const availableToGiveGift = new Set(KKMembers);
const possibleArrangements = [];
const checkIfOutput = (availableGifters, currentArrangement) => {
    if (availableGifters.size < 1 &&
        currentArrangement.size > 17) {
        possibleArrangements.push(currentArrangement);
        console.log(currentArrangement);
        console.log(`possible Arrangements: ${possibleArrangements.length}`);
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
function nextGifter(gifter, availableGifters, availableReceivers, currentArrangement) {
    const canGive = canGiveMap.get(gifter);
    availableGifters.delete(gifter);
    for (let receiver of availableReceivers) {
        if (gifter === Members_1.default.Richard)
            console.log(receiver);
        if (availableReceivers.has(receiver) &&
            canGive.get(receiver)) {
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
                nextGifter(newGifter, newGiftSet, newReceiverSet, newArrangement);
            }
        }
        else {
            // console.log(
            //   `failed ${gifter} can't give to ${receiver}`
            // );
            continue;
        }
    }
}
let v = [...availableToGiveGift];
let c = lodash_1.default.shuffle(v);
nextGifter(Members_1.default.Richard, new Set(c), new Set(lodash_1.default.shuffle([...availableToReceiveGift])), new Map());
//# sourceMappingURL=index.js.map