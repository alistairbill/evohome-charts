import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { type ConnectedProps, connect } from 'react-redux';
import type { AppDispatch, RootState } from './store.ts';

const mapStateToProps = (state: RootState) => ({
  canUndo: state.schedule.past.length > 0,
  canRedo: state.schedule.future.length > 0,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

const UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }: ConnectedProps<typeof connector>) => (
  <p>
    <button onClick={onUndo} disabled={!canUndo}>
      Undo
    </button>
    <button onClick={onRedo} disabled={!canRedo}>
      Redo
    </button>
  </p>
);

export default connector(UndoRedo);
