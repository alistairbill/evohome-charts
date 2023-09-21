import { useRef } from 'react';
import { DateTimeFormatter, LocalTime } from '@js-joda/core';
import { type ConnectedProps, connect } from 'react-redux';
import { type Dispatch, bindActionCreators } from '@reduxjs/toolkit';
import { addSwitchpoint, deleteSwitchpoint, updateSwitchpoint } from './schedule-slice';
import type { Day, Switchpoint } from './parser';
import { type RootState } from './store';

const round = ({ timeOfDay, heatSetpoint }: Switchpoint): Switchpoint => ({
  timeOfDay: Math.min(Math.max(0, Math.round(timeOfDay / 600) * 600), (60 * 60 * 24) - 600),
  heatSetpoint: Math.min(Math.max(10, Math.round(heatSetpoint * 2) / 2), 25),
});

const formatter = DateTimeFormatter.ofPattern('HH:mm');

const toX = (time: number): number => (time / 60) + 100;
const toY = (y: number): number => 1400 - (50 * y);

function fromDom(domPt: DOMPoint, svg: SVGSVGElement) {
  const matrix = svg.getScreenCTM()?.inverse();
  if (!matrix) {
    throw new Error('No matrix');
  }

  const pt = domPt.matrixTransform(matrix);
  return {
    timeOfDay: (pt.x - 100) * 60,
    heatSetpoint: (1400 - pt.y) / 50,
  };
}

type Line = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

function lines(data: Switchpoint[]): Line[] {
  const n = data.length;
  const result = [];
  if (n < 1) {
    return [];
  }

  for (let i = 1; i < n; i++) {
    // Horizontal
    result.push({
      x1: toX(data[i - 1]!.timeOfDay),
      x2: toX(data[i]!.timeOfDay),
      y1: toY(data[i - 1]!.heatSetpoint),
      y2: toY(data[i - 1]!.heatSetpoint),
    }, {
      x1: toX(data[i]!.timeOfDay),
      x2: toX(data[i]!.timeOfDay),
      y1: toY(data[i - 1]!.heatSetpoint),
      y2: toY(data[i]!.heatSetpoint),
    });
  }

  result.push({
    x1: toX(data[n - 1]!.timeOfDay),
    x2: 1540,
    y1: toY(data[n - 1]!.heatSetpoint),
    y2: toY(data[n - 1]!.heatSetpoint),
  });
  return result;
}

type OwnProps = {
  day: Day;
  zone: number;
};

const mapStateToProps = (state: RootState, { zone, day }: OwnProps) => ({
  data: state.schedule.present.locations[0]?.gateways[0]?.systems[0]?.zones[zone]?.switchpoints[day] ?? [],
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ addSwitchpoint, deleteSwitchpoint, updateSwitchpoint }, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

function DraggableChart({ day, zone, data, ...props }: OwnProps & ConnectedProps<typeof connector>) {
  const svg = useRef<SVGSVGElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const isLongPress = useRef(false);
  const dragIndex = useRef(0);
  const handleMouseMove = (event: MouseEvent) => {
    if (!svg.current) {
      return;
    }

    const pt = DOMPoint.fromPoint(event);
    props.updateSwitchpoint({ zone, day, index: dragIndex.current, switchpoint: round(fromDom(pt, svg.current)) });
  };

  const handleMouseDown = (index: number) => {
    dragIndex.current = index;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    });
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
    }, 100);
  };

  const handleSvgClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!isLongPress.current) {
      const pt = new DOMPoint(event.clientX, event.clientY);
      props.addSwitchpoint({ zone, day, switchpoint: round(fromDom(pt, event.currentTarget)) });
    }

    isLongPress.current = false;
  };

  const handlePointClick = (event: React.MouseEvent<SVGCircleElement>, index: number) => {
    event.stopPropagation();
    if (!isLongPress.current) {
      props.deleteSwitchpoint({ zone, day, index });
    }

    isLongPress.current = false;
  };

  return (
    <svg viewBox='0 0 1600 1000' onClick={handleSvgClick} ref={svg}>
      {data.map(({ timeOfDay, heatSetpoint }, i) => (
        <g>
          <circle cx={toX(timeOfDay)} cy={toY(heatSetpoint)} r={50} fill='rgba(0, 0, 0, 0)' onMouseDown={() => handleMouseDown(i)} onClick={event => handlePointClick(event, i)} />
          <circle cx={toX(timeOfDay)} cy={toY(heatSetpoint)} r={20} className='chart-element' pointerEvents='none' />
        </g>
      ))}
      {lines(data).map((coords) => (
        <line {...coords} className='chart-line' strokeWidth={10} pointerEvents='none' />
      ))}
      {Array.from({ length: 9 }).fill(0).map((_, i) => ((2 * i) + 10)).map(y => (
        <g key={y}>
          <text className='chart-element' fontSize={35} x={10} y={toY(y) + 10}>{y}</text>
          <line x1={0} x2={1540} y1={toY(y)} y2={toY(y)} stroke='gray' strokeDasharray={5} />
        </g>
      ))}
      {Array.from({ length: 13 }).fill(0).map((_, i) => (2 * 60 * 60 * i)).map(x => (
        <g key={x}>
          <line x1={toX(x)} x2={toX(x)} y1={100} y2={950} className='chart-tick' strokeDasharray={5} />
          <text className='chart-element' fontSize={35} x={toX(x) - 30} y={970}>{LocalTime.ofSecondOfDay(x % 86_400).format(formatter)}</text>
        </g>
      ))}
    </svg>
  );
}

export default connector(DraggableChart);
