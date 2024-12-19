
import { writable } from 'svelte/store';

export const buttons = writable([
  {
    id: "btn1",
    label: "Increase Speed",
    cost: 100,
    rateIncrease: 5,
    image: "speed-icon.png",
    description: "Boosts production speed.",
    unlocks: null,
    triggersBanner: true,
    upgradeDetails: "Production speed increased by 5 units.",
  },
  {
    id: "btn2",
    label: "Unlock Factory",
    cost: 500,
    rateIncrease: 0,
    image: "factory-icon.png",
    description: "Unlocks a new factory for production.",
    unlocks: "#factory-section",
    triggersBanner: true,
    upgradeDetails: "New factory unlocked!",
  },
]);


