
import { get } from 'svelte/store';
import { buttons_store } from "$lib/stores/buttons";
import type { Button } from "$lib/stores/buttons";
import { state } from '$lib/stores/stores';

export function canShowButton(button: Button): boolean {
    const unlockCriteria = button.unlockCriteria;
    const stateValue = get(state);
    const buttonsStoreValue = get(buttons_store);

    if (
        stateValue["lines"].amount < unlockCriteria.lines ||
        stateValue["coffee"].amount < unlockCriteria.coffee ||
        stateValue["bencoin"].amount < unlockCriteria.bencoin
    ) {
        return false;
    }

    for (const prereq of unlockCriteria.prereqs) {
        const prereqButton = buttonsStoreValue.find((b) => b.id === prereq.id);
        if (prereqButton && prereqButton.amount < prereq.amount) {
            return false;
        }
    }
    return true;
}
