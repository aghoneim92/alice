import { createRecord, TypedRecord } from './TypedRecord'


export interface IWindow extends Iterable<any> {
  id: string;
  title?: string;
}

export type WindowRecord = TypedRecord<IWindow>

export const Window: { new(): TypedRecord<IWindow>; } = createRecord<IWindow>(
  new Map(),
  'Window'
)
