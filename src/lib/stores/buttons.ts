
import { writable } from 'svelte/store';

export const buttons_store = writable([
  {
    id: "btn1-1",
    title: "Hit random keys",
    label: "+.1C/s",
    cost: 1,
    currency: "Lines",
    rateIncrease: .01,
    image: "",
    description: "Smack the keyboard as fast as you can",
    unlocks: "btn1-2",
    triggersBanner: true,
    amount: 0
    
  },

  {
    id: "btn1-2",
    title: "Study",
    label: "+1C/s",
    cost: 8,
    currency: "Lines",
    rateIncrease: .5,
    image: "",
    description: "Review your notes",
    unlocks: "btn1-3",
    triggersBanner: true,
    amount: 0
  },

  {
    id: "btn1-3",
    title: "Hire tutor",
    label: "+10C/s",
    cost: 15,
    currency: "Lines",
    rateIncrease: 1,
    image: "",
    description: "Hire a tutor to teach you",
    unlocks: "btn1-4",
    triggersBanner: true,
    amount: 0
  },

  {
    id: "btn1-4",
    title: "Smart friend",
    label: "+100C/s",
    cost: 35,
    currency: "Lines",
    rateIncrease: 5,
    image: "",
    description: "You bribe your smarter friend(s) to do it for you",
    unlocks: null,
    triggersBanner: true,
    amount: 0
  },

]);


