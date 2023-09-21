import React, { useState } from 'react';
import { type ConnectedProps, connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { type Day, allDays } from './parser';
import DraggableChart from './draggable-chart';
import { copyZoneDay, fromJson } from './schedule-slice';
import UndoRedo from './undo-redo';
import type { AppDispatch, RootState } from './store';

const mapStateToProps = (state: RootState) => ({
  json: state.schedule.present.json,
  zones: state.schedule.present.locations[0]?.gateways[0]?.systems[0]?.zones ?? [],
});

const mapDispatchToProps = (dispatch: AppDispatch) => bindActionCreators({ fromJson, copyZoneDay }, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

function App({ json, zones, fromJson, copyZoneDay }: ConnectedProps<typeof connector>) {
  const [day, setDay] = useState<Day>(allDays[0] as Day);
  const [copyDay, setCopyDay] = useState<Day>(allDays[1] as Day);

  const handleJsonChange = ({ currentTarget }: React.ChangeEvent<HTMLTextAreaElement>) => {
    fromJson(currentTarget.value);
  };

  const handleDayChange = ({ currentTarget }: React.ChangeEvent<HTMLSelectElement>) => {
    setDay(currentTarget.value as Day);
  };

  const handleCopyDayChange = ({ currentTarget }: React.ChangeEvent<HTMLSelectElement>) => {
    setCopyDay(currentTarget.value as Day);
  };

  const handleCopy = () => copyZoneDay({ from: day, to: copyDay });

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.currentTarget.files;
    if (files?.[0]) {
      const text = await files[0].text();
      fromJson(text);
    }
  };

  const handleExport = () => {
    const element = document.createElement('a');
    const file = new Blob([json], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'schedule.json';
    document.body.append(element);
    element.click();
  };

  return (
    <>
      <div>
        <select value={day} onChange={handleDayChange}>
          {allDays.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div>
        <UndoRedo />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr)', gridGap: '10px' }}>
        {zones.map((zone, i) => <div key={zone.name}><h2>{zone.name}</h2><DraggableChart zone={i} day={day} /></div>)}
      </div>
      <textarea spellCheck={false} style={{ width: '100%', height: '20vh' }} value={json} onChange={handleJsonChange} />
      <div>
        <input type='file' onChange={handleImport} />
        <button onClick={handleExport}>Export</button>
      </div>
      <div>
        <button onClick={handleCopy}>Copy to</button>
        <select value={copyDay} onChange={handleCopyDayChange}>
          {allDays.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
    </>
  );
}

export default connector(App);
