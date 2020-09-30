import moment from 'moment';
import {
  Gateway, System, Zone, DaySwitchpoints, DailySchedule, Day, RawSwitchpoint, Location,
} from './types';

function isNumeric(value: string): boolean {
  return /^\d+$/.test(value);
}

export function parse(json: string): Location | undefined {
  try {
    const rawObj = JSON.parse(json);
    const locationId = parseInt(Object.keys(rawObj)[0], 10);
    const loc = rawObj[locationId];
    const locationName = loc.name;
    const gateways: Gateway[] = [];
    const gatewayIds = Object.keys(loc).filter(isNumeric).map((n) => parseInt(n, 10));
    gatewayIds.forEach((gatewayId) => {
      const gateway = loc[gatewayId];
      const systems: System[] = [];
      const systemIds = Object.keys(gateway).filter(isNumeric).map((n) => parseInt(n, 10));
      systemIds.forEach((systemId) => {
        const system = gateway[systemId];
        const zoneIds = Object.keys(system).filter(isNumeric).map((n) => parseInt(n, 10));
        const zones: Zone[] = [];
        zoneIds.forEach((zoneId) => {
          const zone = system[zoneId];
          const switchpoints: DaySwitchpoints = {};
          zone.dailySchedules.forEach((dailySchedule: DailySchedule) => {
            switchpoints[dailySchedule.dayOfWeek as Day] = dailySchedule.switchpoints.map(({ heatSetpoint, timeOfDay }: RawSwitchpoint) => ({ heatSetpoint, timeOfDay: moment(timeOfDay, 'HH:mm:ss') }));
          });
          zone.switchpoints = switchpoints;
          zones.push(zone);
          delete system[zoneId];
        });
        system.zones = zones;
        systems.push(system);
        delete gateway[systemId];
      });
      gateway.systems = systems;
      gateways.push(gateway);
      delete loc[gatewayId];
    });
    return { locationId, name: locationName, gateways };
  } catch {
    return undefined;
  }
}

export function unparse(location: Location): string {
  const rawLocation: { [k: string]: any } = {
    locationId: location.locationId.toString(),
    name: location.name,
  };
  location.gateways.forEach((gateway) => {
    const rawGateway: { [k: string]: any } = {
      gatewayId: gateway.gatewayId.toString(),
    };
    gateway.systems.forEach((system) => {
      const rawSystem: { [k: string]: any } = {
        systemId: system.systemId.toString(),
      };
      system.zones.forEach((zone) => {
        const rawZone = {
          dailySchedules: Object.entries(zone.switchpoints).map(([day, switchpoints]) => ({ dayOfWeek: day, switchpoints: (switchpoints || []).map(({ heatSetpoint, timeOfDay }) => ({ heatSetpoint, timeOfDay: timeOfDay.format('HH:mm:ss') })) })),
          name: zone.name,
          zoneId: zone.zoneId.toString(),
        };
        rawSystem[rawZone.zoneId] = rawZone;
      });
      rawGateway[rawSystem.systemId] = rawSystem;
    });
    rawLocation[rawGateway.gatewayId] = rawGateway;
  });
  const rawObj = { [rawLocation.locationId]: rawLocation };
  return JSON.stringify(rawObj, null, 8);
}
