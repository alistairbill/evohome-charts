import moment from 'moment';

export interface Location {
  locationId: number;
  name: string;
  gateways: Gateway[];
}

export interface Gateway {
  gatewayId: number;
  systems: System[];
}

export interface System {
  systemId: number;
  zones: Zone[];
}

export interface Zone {
  name: string;
  zoneId: number;
  switchpoints: DaySwitchpoints;
}

export interface DailySchedule {
  dayOfWeek: Day;
  switchpoints: RawSwitchpoint[];
}

export const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type DaySwitchpoints = { [day in Day]?: Switchpoint[] };

export interface Switchpoint {
  heatSetpoint: number;
  timeOfDay: moment.Moment;
}

export interface RawSwitchpoint {
  heatSetpoint: number;
  timeOfDay: moment.Moment;
}
