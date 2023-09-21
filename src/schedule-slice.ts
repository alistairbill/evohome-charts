import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { parse, type Day, type Location, type Switchpoint, unparse } from './parser';

export type ScheduleState = {
  json: string;
  locations: Location[];
};

const initialState: ScheduleState = {
  json: '',
  locations: [],
};

type UpdateSwitchpoint = {
  zone: number;
  index: number;
  day: Day;
  switchpoint: Switchpoint;
};

type DeleteSwitchpoint = {
  zone: number;
  day: Day;
  index: number;
};

type AddSwitchpoint = {
  zone: number;
  day: Day;
  switchpoint: Switchpoint;
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    fromJson(state, action: PayloadAction<string>) {
      state.json = action.payload;
      state.locations = parse(action.payload);
    },
    addSwitchpoint(state, action: PayloadAction<AddSwitchpoint>) {
      state.locations[0]?.gateways[0]?.systems[0]?.zones[action.payload.zone]?.switchpoints[action.payload.day].push(action.payload.switchpoint);
      state.locations[0]?.gateways[0]?.systems[0]?.zones[action.payload.zone]?.switchpoints[action.payload.day].sort((a, b) => a.timeOfDay - b.timeOfDay);
      state.json = unparse(state.locations);
    },
    updateSwitchpoint(state, action: PayloadAction<UpdateSwitchpoint>) {
      const sw = state.locations[0]?.gateways[0]?.systems[0]?.zones[action.payload.zone]?.switchpoints[action.payload.day];
      if (sw) {
        sw[action.payload.index] = action.payload.switchpoint;
        sw.sort((a, b) => a.timeOfDay - b.timeOfDay);
        state.json = unparse(state.locations);
      }
    },
    deleteSwitchpoint(state, action: PayloadAction<DeleteSwitchpoint>) {
      state.locations[0]?.gateways[0]?.systems[0]?.zones[action.payload.zone]?.switchpoints[action.payload.day].splice(action.payload.index, 1);
      state.json = unparse(state.locations);
    },
    copyZoneDay(state, action: PayloadAction<{ from: Day; to: Day }>) {
      const zones = state.locations[0]?.gateways[0]?.systems[0]?.zones;
      if (zones) {
        for (const zone of zones) {
          zone.switchpoints[action.payload.to] = zone.switchpoints[action.payload.from];
        }

        state.json = unparse(state.locations);
      }
    },
  },
});

export const { fromJson, addSwitchpoint, updateSwitchpoint, deleteSwitchpoint, copyZoneDay } = scheduleSlice.actions;
export default scheduleSlice.reducer;
