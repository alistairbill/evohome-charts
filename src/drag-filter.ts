import { type AnyAction } from '@reduxjs/toolkit';
import { type Day } from './parser';
import { updateSwitchpoint } from './schedule-slice';

const ignoreTime = 250 as const;

// Store rapid actions of the same type at most once every x time.
let ignoreRapid = false;
let previousZone: number;
let previousDay: Day;
let previousIndex: number;
export function dragThrottlingFilter(action: AnyAction) {
  if (updateSwitchpoint.match(action)) {
    if (action.payload.zone !== previousZone || action.payload.day !== previousDay || action.payload.index !== previousIndex) {
      ignoreRapid = false;
      previousZone = action.payload.zone;
      previousDay = action.payload.day;
      previousIndex = action.payload.index;
      return true;
    }

    if (ignoreRapid) {
      return false;
    }

    ignoreRapid = true;
    setTimeout(() => {
      ignoreRapid = false;
    }, ignoreTime);
  }

  return true;
}
