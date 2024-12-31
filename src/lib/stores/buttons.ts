
import { writable } from 'svelte/store';


export interface UnlockCriteria {
  lines: number;
  coffee: number;
  bencoin: number;
  prereqs: { id: string; amount: number }[];
}

export interface CostState {
  [key: string]: number | undefined;
}



interface UnlockType {
  [key: string]: {
    type: string;
    amount?: number;
  };
}



export interface Button {
  id: string;
  label: string;
  max: number;
  amount: number;
  section: number;
  unlockCriteria: UnlockCriteria;
  cost: CostState;
  type: UnlockType;
  cooldown: number;
  costScale: string;
}

export const buttons_store = writable<Button[]>([

  { id: "btn12",
    label: "Unlock Auto-type",
    max: 1,
    cost: { lines: 1 },
    type: { lines: { type: "rate", amount: .01 } },
    amount: 0,
    section: 1,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: []},
    cooldown: 0 ,
    costScale: "exp" },
  

  { id: "btn13",
    label: "Unlock Auto-enter",
    max: 1,
    cost: { lines: 10 },
    type: { unlock: { type: "auto_enter" } },
    amount: 0,
    section: 1,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: []},
    cooldown: 0 ,
    costScale: "exp" },
  

  { id: "btn1",
    label: "Purchase +.1 C/s",
    max: 1000,
    cost: { lines: .1 },
    type: { lines: { type: "rate", amount: .1 } },
    amount: 0,
    section: 1,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        {id:"btn12", amount: 1} ]},
      cooldown: 0 ,
      costScale: "exp" },
    

  { id: "btn2",
    label: "Purchase +1x C/s",
    max: 1000,
    cost: { lines: 10 },
    type: { lines: { type: "mult", amount: 1 }, unlock: {type: "section2", amount: 3} },
    amount: 0,
    section: 1,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [ {id:"btn1", amount: 3} ]},
    cooldown: 0 ,
    costScale: "exp" },
  

  { id: "btn3",
    label: "Unlock Menu Bar",
    max: 1,
    cost: { lines: 10 },
    type: { unlock: { type: "menu_bar" } },
    amount: 0,
    section: 2,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [] },
    cooldown: 0 ,
    costScale: "exp" },

  { id: "btn4",
    label: "Unlock Resume",
    max: 1,
    cost: { lines: 15 },
    type: { unlock: { type: "resume" },
            unlock2: { type: "section3" },
            unlock3: { type: "ben_coin"} },
    amount: 0,
    section: 2,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [ {id:"btn3", amount: 1} ]},
    cooldown: 0 ,
    costScale: "exp" },
  

  { id: "btn5",
    label: "Unlock Email",
    max: 1,
    cost: { lines: 15 },
    type: { unlock: { type: "email" } },
    amount: 0,
    section: 2,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [ {id:"btn4", amount: 1} ]},
    cooldown: 0 ,
    costScale: "exp" },
  

  { id: "btn6",
    label: "Unlock Linkedin",
    max: 1,
    cost: { lines: 15 },
    type: { unlock: { type: "linkedin" } },
    amount: 0,
    section: 2,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [ {id:"btn5", amount: 1} ]},
    cooldown: 0 ,
    costScale: "exp" },
  

  { id: "btn7",
    label: "Unlock github",
    max: 1,
    cost: { lines: 15 },
    type: { unlock: { type: "github" } },
    amount: 0,
    section: 2,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [ {id:"btn6", amount: 1} ]},
    cooldown: 0 ,
    costScale: "exp" },
  

  { id: "btn8",
    label: "Unlock project1",
    max: 1,
    cost: { lines: 15 },
    type: { unlock: { type: "project1" } },
    amount: 0,
    section: 3,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: []},
    cooldown: 0 ,
    costScale: "exp" },
  

  { id: "btn9",
    label: "Unlock project2",
    max: 1,
    cost: { lines: 15 },
    type: { unlock: { type: "project2" } },
    amount: 0,
    section: 3,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [ {id:"btn8", amount: 1} ]},
    cooldown: 0 ,
    costScale: "exp" },
  

  { id: "btn10",
    label: "Unlock project3",
    max: 1,
    cost: { lines: 15 },
    type: { unlock: { type: "project3" } },
    amount: 0,
    section: 3,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [ {id:"btn9", amount: 1} ]},
    cooldown: 0 ,
    costScale: "exp" },
  

  { id: "btn11",
    label: "Unlock project4",
    max: 1,
    cost: { lines: 15 },
    type: { unlock: { type: "project4" } },
    amount: 0,
    section: 3,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [ {id:"btn10", amount: 1} ]},
    cooldown: 0 ,
    costScale: "exp" },
  

  { id: "btn14",
    label: "Increase Calculations",
    max: 8,
    cost: { bencoin: 1 },
    type: { bencoin: { type: "windows", amount: 1 } },
    amount: 1,
    section: 4,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: []},
    cooldown: 1 ,
    costScale: "exp" },
  

  { id: "btn15",
    label: "Multi-thread",
    max: 2,
    cost: { bencoin: 10 },
    type: { bencoin: { type: "nodes", amount: 1 } },
    amount: 0,
    section: 4,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [ {id:"btn14", amount: 1} ]},
    cooldown: 1 ,
    costScale: "exp" },
  

  { id: "btn16",
    label: "Smarter Calculations",
    max: 10,
    cost: { bencoin: 10 },
    type: { bencoin: { type: "speed", amount: 1 } },
    amount: 0,
    section: 4,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [ {id:"btn14", amount: 1} ]},
    cooldown: 1 ,
    costScale: "exp" },

    { id: "btn17",
    label: "Quality Pour",
    max: 100,
    cost: { bencoin: 10 },
    type: { water: { type: "pour", amount: 10 } },
    amount: 0,
    section: 5,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: []},
    cooldown: 0 ,
    costScale: "exp" },

    { id: "btn18",
    label: "Auto-Pour",
    max: 1,
    cost: { bencoin: 10 },
    type: { unlock: { type: "auto_water" } },
    amount: 0,
    section: 5,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: []},
    cooldown: 0 ,
    costScale: "exp" },

    { id: "btn19",
    label: "Auto-Pour +",
    max: 9,
    cost: { bencoin: 10 },
    type: { water: { type: "speed", amount: 1 } },
    amount: 0,
    section: 5,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: []},
    cooldown: 0 ,
    costScale: "exp" },
    
    { id: "btn20",
    label: "Buy Beans",
    max: 10000,
    cost: { bencoin: 50 },
    type: { beans: { type: "beans", amount: 1 } },
    amount: 0,
    section: 5,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: []},
    cooldown: 0 ,
    costScale: "rand" },
    
    { id: "btn21",
    label: "Auto-Bean",
    max: 1,
    cost: { bencoin: 10 },
    type: { unlock: { type: "auto_bean" } },
    amount: 0,
    section: 5,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [  ]},
    cooldown: 0 ,
    costScale: "exp" },
    


]);


