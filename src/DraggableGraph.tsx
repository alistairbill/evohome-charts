import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-dragdata';
import moment from 'moment';
import { Switchpoint } from './types';
import { ChartOptions } from 'chart.js';

interface Props {
  name: string;
  switchpoints: Switchpoint[];
  updateSwitchpoints(switchpoints: Switchpoint[]): void;
}

interface Drag {
  dragData: boolean;
  dragX: true;
  onDragEnd: (e: Event, datasetIndex: number, index: number, value: ChartValue) => void;
}

interface ChartValue {
  x: moment.Moment;
  y: number;
}

function roundValue(chartValue: ChartValue): Switchpoint {
  const heatSetpoint = Math.round(chartValue.y * 2) / 2;
  const roundedMinutes = Math.round(chartValue.x.clone().minute() / 10) * 10;
  const timeOfDay = chartValue.x.clone().minute(roundedMinutes).second(0);
  return { timeOfDay, heatSetpoint };
}

export default class DraggableGraph extends React.Component<Props> {
  chart = React.createRef<any>();

  render(): React.ReactNode {
    const { name } = this.props;
    const options: ChartOptions & Drag = {
      animation: {
        duration: 0,
      },
      dragData: true,
      dragX: true,
      onDragEnd: (e, datasetIndex, index, value) => {
        const { switchpoints: sw, updateSwitchpoints } = this.props;
        const switchpoints = [...sw];
        switchpoints[index] = roundValue(value);
        const sorted = switchpoints.sort(({ timeOfDay: a }, { timeOfDay: b }) => a.diff(b));
        updateSwitchpoints(sorted);
      },
      title: {
        display: true,
        text: name,
      },
      legend: {
        display: false,
      },
      onClick: (event: MouseEvent, activeElements: any[]) => {
        const instance = this.chart?.current?.chartInstance;
        if (!instance) {
          return;
        }
        const { switchpoints: sw, updateSwitchpoints } = this.props;
        const switchpoints = [...sw];
        if (activeElements.length > 0) {
          const index = activeElements[0]._index;
          switchpoints.splice(index, 1);
          updateSwitchpoints(switchpoints);
          return;
        }

        let valueX: moment.Moment | null = null as moment.Moment | null;
        let valueY: number | null = null as number | null;
        Object.values(instance.scales).forEach((scaleRef: any) => {
          if (scaleRef.isHorizontal()) {
            valueX = scaleRef.getValueForPixel(event.offsetX);
          } else {
            valueY = scaleRef.getValueForPixel(event.offsetY);
          }
        });
        if (valueX == null || valueY == null) {
          return;
        }
        switchpoints.push(roundValue({ x: valueX, y: valueY }));
        const sorted = switchpoints.sort(({ timeOfDay: a }, { timeOfDay: b }) => a.diff(b));
        updateSwitchpoints(sorted);
      },
      scales: {
        xAxes: [{
          type: 'time',
          bounds: 'ticks',
          time: {
            unit: 'hour',
          },
        }],
        yAxes: [{
          ticks: {
            suggestedMin: 8,
            suggestedMax: 25,
          },
          scaleLabel: {
            display: true,
            labelString: 'Temperature (deg C)',
          },
        }],
      },
    };

    const { switchpoints } = this.props;
    const data = {
      labels: Array.from({ length: 24 }, (_, i) => moment().hour(i).minute(0).second(0)),
      datasets: [{
        steppedLine: true,
        data: switchpoints.map(({ heatSetpoint, timeOfDay }) => ({ x: timeOfDay, y: heatSetpoint })),
      }],
    };
    return (
      <div>
        <Line data={data} options={options} ref={this.chart} />
      </div>
    );
  }
}
