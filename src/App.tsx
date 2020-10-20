import React from 'react';
import { cloneDeep } from 'lodash';
import DraggableGraph from './DraggableGraph';
import { parse, unparse } from './parser';
import {
  Day, Switchpoint, Location, Zone, ALL_DAYS,
} from './types';

interface Props {}
interface State {
  day: Day;
  copyDay: Day;
  location?: Location;
  oldLocation?: Location;
  rawJson: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      day: 'Monday' as Day,
      copyDay: 'Tuesday' as Day,
      location: undefined as Location | undefined,
      oldLocation: undefined as Location | undefined,
      rawJson: '',
    };
  }

  handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ day: event.target.value as Day });
  };

  handleCopyDayChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ copyDay: event.target.value as Day });
  };

  handleCopy = (): void => {
    const { location: loc, day, copyDay } = this.state;
    if (!loc) {
      return;
    }
    const location = cloneDeep(loc);
    location.gateways[0].systems[0].zones.forEach((zone) => {
      zone.switchpoints[copyDay] = zone.switchpoints[day];
    });
    const rawJson = unparse(location);
    this.setState({ rawJson, location, oldLocation: loc });

  }

  changeJson = (text: string): void => {
    const { location: loc } = this.state;
    const location = parse(text);
    this.setState({ location, oldLocation: loc, rawJson: text });
  }

  handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.changeJson(event.target.value);
  };

  updateSwitchpoints(i: number, switchpoints: Switchpoint[]): void {
    const { location: loc, day } = this.state;
    if (!loc) {
      return;
    }
    const location = cloneDeep(loc);
    location.gateways[0].systems[0].zones[i].switchpoints[day] = switchpoints;
    const rawJson = unparse(location);
    this.setState({ rawJson, location, oldLocation: loc });
  }

  handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (text) {
        this.changeJson(text.toString());
      }
    };
    const files = event.currentTarget.files;
    if (files && files[0]) {
      reader.readAsText(files[0]);
    }
  }

  handleExport = (): void => {
    const { rawJson } = this.state;
    const element = document.createElement("a");
    const file = new Blob([rawJson], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = "schedule.json";
    document.body.appendChild(element);
    element.click();
  }

  handleUndo = (): void => {
    const { oldLocation } = this.state;
    if (!oldLocation) {
      return;
    }
    const rawJson = unparse(oldLocation);
    this.setState({ rawJson, location: oldLocation, oldLocation: undefined });
  }

  render(): React.ReactNode {
    let zones = [] as Zone[];
    const { location, day, copyDay, rawJson, oldLocation } = this.state;
    if (location) {
      zones = location.gateways[0].systems[0].zones;
    }
    return (
      <>
        <div>
          <select value={day} onChange={this.handleDayChange}>
            {ALL_DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <button disabled={!oldLocation} onClick={this.handleUndo}>Undo</button>
        </div>
        <div className="container">
          {zones.map((zone, i) => (
            <DraggableGraph
              key={zone.name}
              name={zone.name}
              switchpoints={zone.switchpoints[day] || []}
              updateSwitchpoints={(s) => this.updateSwitchpoints(i, s)}
            />
          ))}
        </div>
        <textarea spellCheck={false} className="json" value={rawJson} onChange={this.handleJsonChange} />
        <div>
          <input type="file" onChange={this.handleImportFile} />
          <button onClick={this.handleExport}>Export</button>
        </div>
        <div>
          <button onClick={this.handleCopy}>Copy to</button>
          <select value={copyDay} onChange={this.handleCopyDayChange}>
            {ALL_DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </>
    );
  }
}

export default App;
