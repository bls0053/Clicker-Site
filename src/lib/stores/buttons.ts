
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
  max: number;
  unlocks: string[];
  amount: number;
  section: number;
  unlockCriteria: UnlockCriteria;
  cost: CostState;
  increase: RateState;
  type: string;
}

export const buttons_store = writable<Button[]>([

  {
    id: "btn12",
    title: "",
    label: "Unlock Auto-type",
    max: 1,
    cost: {
      lines: 5,
    },
    increase: {
      lines: .1
    },
    type: "rate",
    unlocks: [""], 
    amount: 0,
    section: 1,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        
      ]
    }
  },

  {
    id: "btn13",
    title: "",
    label: "Unlock Auto-enter",
    max: 1,
    cost: {
      lines: 10,
    },
    increase: {

    },
    type: "unlock",
    unlocks: ["auto_enter"], 
    amount: 0,
    section: 1,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        
      ]
    }
  },

  {
    id: "btn1",
    title: "do action",
    label: "Purchase +.1 C/s",
    max: 1000,
    cost: {
      lines: .1,
    },
    increase: {
      lines: .01
    },
    type: "rate",
    unlocks: [""],
    amount: 0,
    section: 1,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        {id:"btn12", amount: 1}
      ]
    },

  },

  {
    id: "btn2",
    title: "do action",
    label: "Purchase +1x C/s",
    max: 1000,
    cost: {
      lines: 10,
    },
    increase: {
      lines: 1
    },
    type: "mult",
    unlocks: ["section2"],
    amount: 0,
    section: 1,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        {id:"btn12", amount: 1}
      ]
    }
  },

  {
    id: "btn3",
    title: "do action",
    label: "Unlock Menu Bar",
    max: 1,
    cost: {
      lines: 10,
    },
    increase: {
    
    },
    type: "unlock",
    unlocks: ["menu_bar"],
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
    label: "Unlock Resume",
    max: 1,
    cost: {
      lines: 15,
    },
    increase: {

    },
    type: "unlock",
    unlocks: ["resume"],
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

  {
    id: "btn5",
    title: "Unlock Email",
    label: "Unlock Email",
    max: 1,
    cost: {
      lines: 15,
    },
    increase: {

    },
    type: "unlock",
    unlocks: ["email"],
    amount: 0,
    section: 2,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        {id:"btn4", amount: 1}
      ]
    }
  },

  {
    id: "btn6",
    title: "Unlock Linkedin",
    label: "Unlock Linkedin",
    max: 1,
    cost: {
      lines: 15,
    },
    increase: {

    },
    type: "unlock",
    unlocks: ["linkedin"],
    amount: 0,
    section: 2,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        {id:"btn5", amount: 1}
      ]
    }
  },

  {
    id: "btn7",
    title: "Unlock Github",
    label: "Unlock Github",
    max: 1,
    cost: {
      lines: 15,
    },
    increase: {

    },
    type: "",
    unlocks: ["github", "section3"], 
    amount: 0,
    section: 2,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        {id:"btn6", amount: 1}
      ]
    }
  },

  {
    id: "btn8",
    title: "",
    label: "Unlock Project 1",
    max: 1,
    cost: {
      lines: 15,
    },
    increase: {

    },
    type: "project",
    unlocks: ["project1"], 
    amount: 0,
    section: 3,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        {id:"btn7", amount: 1}
      ]
    }
  },

  {
    id: "btn9",
    title: "",
    label: "Unlock Project 2",
    max: 1,
    cost: {
      lines: 15,
    },
    increase: {

    },
    type: "project",
    unlocks: ["project2"], 
    amount: 0,
    section: 3,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        {id:"btn8", amount: 1}
      ]
    }
  },

  {
    id: "btn10",
    title: "",
    label: "Unlock Project 3",
    max: 1,
    cost: {
      lines: 15,
    },
    increase: {

    },
    type: "project",
    unlocks: ["project3"], 
    amount: 0,
    section: 3,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        {id:"btn9", amount: 1}
      ]
    }
  },

  {
    id: "btn11",
    title: "",
    label: "Unlock Project 4",
    max: 1,
    cost: {
      lines: 15,
    },
    increase: {

    },
    type: "project",
    unlocks: ["project4"], 
    amount: 0,
    section: 3,
    unlockCriteria: {
      lines: 0,
      coffee: 0,
      bencoin: 0,
      prereqs: [
        {id:"btn10", amount: 1}
      ]
    }
  },

  

]);


