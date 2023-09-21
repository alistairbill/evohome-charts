import { configureStore } from '@reduxjs/toolkit';
import undoable from 'redux-undo';
import scheduleReducer, { type ScheduleState } from './schedule-slice.ts';
import { dragThrottlingFilter } from './drag-filter.ts';

export const store = configureStore({
  reducer: {
    schedule: undoable<ScheduleState>(scheduleReducer, { filter: dragThrottlingFilter }),
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
