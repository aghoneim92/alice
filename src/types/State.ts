import { createRecord, TypedRecord } from './createRecord'
import { Map } from 'immutable'
import { IWindow } from './Window'

export interface IState extends Iterable<any> {
  currentWindowId?: Id;
  windows: Map<Id, IWindow>;
}

export type StateRecord = TypedRecord<State>

export const State: TypedRecord<IState> = createRecord(
  <IState> {
    windows: Map<string, IWindow>(),
  },
  'State',
)

export const initialState = new State({
  windows: Map<id, IWindow>(),
})
