//import { ExecFileSyncOptionsWithBufferEncoding } from 'child_process';

// tworzymy interfejsc który będzie reprezentował nasz obiekt Task
export interface Task {
  _id?: { $oid: string };
  userId?: string;
  title?: string;
  created?: string;
  end?: string;
  finishDate?: string;
  isDone?: number;
  priority?: number;
  description?: string;
  id: number;
}
