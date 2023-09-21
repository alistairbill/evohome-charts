import { DateTimeFormatter, LocalTime } from '@js-joda/core';
import { objectFromEntries } from 'ts-extras';

const hhmmss = DateTimeFormatter.ofPattern('HH:mm:ss');

type RawLocation = {
  [gatewayId: string]: RawGateway | string;
  locationId: string;
  name: string;
};

export type Location = {
  id: string;
  name: string;
  gateways: Gateway[];
};

type RawGateway = {
  [systemId: string]: RawSystem | string;
  gatewayId: string;
};

export type Gateway = {
  id: string;
  systems: System[];
};

type RawSystem = {
  [zoneId: string]: RawZone | string;
  systemId: string;
};

export type System = {
  id: string;
  zones: Zone[];
};

type RawZone = {
  dailySchedules: RawDailySchedule[];
  name: string;
  zoneId: string;
};

export type Zone = {
  id: string;
  name: string;
  switchpoints: DailySchedule;
};

type DailySchedule = Record<Day, Switchpoint[]>;

type RawDailySchedule = {
  dayOfWeek: Day;
  switchpoints: RawSwitchpoint[];
};

export type RawSwitchpoint = {
  heatSetpoint: number;
  timeOfDay: string;
};

export type Switchpoint = {
  heatSetpoint: number;
  timeOfDay: number;
};

export const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = (typeof allDays)[number];

export function parse(json: string): Location[] {
  const raw = JSON.parse(json) as Record<string, RawLocation>;
  return Object.values(raw).map(location => ({
    id: location.locationId,
    name: location.name,
    gateways: Object.entries(location).filter((kv): kv is [string, RawGateway] => !(['locationId', 'name'].includes(kv[0]))).map(([_, gateway]) => ({
      id: gateway.gatewayId,
      systems: Object.entries(gateway).filter((kv): kv is [string, RawSystem] => kv[0] !== 'gatewayId').map(([_, system]) => ({
        id: system.systemId,
        zones: Object.entries(system).filter((kv): kv is [string, RawZone] => kv[0] !== 'systemId').map(([_, zone]) => ({
          id: zone.zoneId,
          name: zone.name,
          switchpoints: objectFromEntries(zone.dailySchedules.map(({ dayOfWeek, switchpoints }) => [dayOfWeek, switchpoints.map(({ heatSetpoint, timeOfDay }) => ({ heatSetpoint, timeOfDay: LocalTime.parse(timeOfDay, hhmmss).toSecondOfDay() }))])),
        })),
      })),
    })),
  }));
}

export function unparse(locations: Location[]): string {
  const raw = objectFromEntries(locations.map(({ id: locationId, name, gateways }) => [locationId, gateways.reduce<RawLocation>((acc, { id: gatewayId, systems }) => {
    acc[gatewayId] = systems.reduce<RawGateway>((acc, { id: systemId, zones }) => {
      acc[systemId] = zones.reduce<RawSystem>((acc, { id: zoneId, name, switchpoints }) => {
        acc[zoneId] = {
          zoneId, name,
          dailySchedules: Object.entries(switchpoints).map(([dayOfWeek, switchpoints]) => ({
            dayOfWeek: dayOfWeek as Day,
            switchpoints: switchpoints.map(({ heatSetpoint, timeOfDay }) => ({ heatSetpoint, timeOfDay: hhmmss.format(LocalTime.ofSecondOfDay(timeOfDay)) })),
          })),
        };
        return acc;
      }, { systemId });
      return acc;
    }, { gatewayId });
    return acc;
  }, { locationId, name })]));

  return JSON.stringify(raw, null, 4);
}
