"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3_1 = require("d3");
const InputText_1 = __importDefault(require("./InputText"));
let parsedData = d3_1.csvParse(InputText_1.default);
let canGive = new Map();
parsedData.map(d => {
    const presentReceiver = d.Receiver;
});
//# sourceMappingURL=index.js.map