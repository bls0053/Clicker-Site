
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

export interface RateState {
  [key: string]: number | undefined;
}

export interface Button {
  id: string;
  title: string;
  label: string;
  cost: CostState;
  increase: RateState;
  unlocks: string;
  amount: number;
  section: number;
  unlockCriteria: UnlockCriteria;
  type: string;
}

export const buttons_store = writable<Button[]>([
  {
    id: "btn1",
    title: "do action",
    label: "Purchase +.1 C/s",
    cost: {
      lines: 1,
    },
    increase: {
      lines: .01
    },
    type: "rate",
    unlocks: "",
    amount: 0,
    section: 1,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        
      ]
    },

  },

  {
    id: "btn2",
    title: "do action",
    label: "Purchase +1x C/s",
    cost: {
      lines: 10,
    },
    increase: {
      lines: 1
    },
    type: "mult",
    unlocks: "id3",
    amount: 0,
    section: 1,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        {id:"btn1", amount: 3}
      ]
    }
  },

  {
    id: "btn3",
    title: "do action",
    label: "Unlock Menu Bar",
    cost: {
      lines: 10,
    },
    increase: {
    
    },
    type: "unlock",
    unlocks: "menu_bar",
    amount: 0,
    section: 2,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
    
      ]
    }
  },

  {
    id: "btn4",
    title: "Unlock Resume",
    label: "+.1C/s",
    cost: {
      lines: 15,
    },
    increase: {
      lines: .01
    },
    type: "unlock",
    unlocks: "resume",
    amount: 0,
    section: 2,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        {id:"btn3", amount: 1}
      ]
    }
  },



]);


