"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_1 = require("d3");
const InputText_1 = __importDefault(require("./InputText"));
const Members_1 = __importDefault(require("./Members"));
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
        const canGive = d[giver] === 'true';
        canGiveMap
            .get(giver)
            .set(presentReceiver, canGive);
    }
});
console.log(canGiveMap.entries());
//#endregion
const availableToReceiveGift = new Set(KKMembers);
const possibleArrangements = [];
const checkIfOutput = (gifter, currentArrangement) => {
    gifter === Members_1.default.WillJr &&
        possibleArrangements.push(currentArrangement);
};
function nextGifter(gifter, availableReceivers, currentArrangement) { }
//# sourceMappingURL=index.js.map