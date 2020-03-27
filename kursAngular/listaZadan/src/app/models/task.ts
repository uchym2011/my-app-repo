//import { ExecFileSyncOptionsWithBufferEncoding } from 'child_process';

// tworzymy interfejsc który będzie reprezentował nasz obiekt Task
export interface Task {
  _id?: {"$oid": string}
  userId: string;
  name: string;
  created: string;
  end?: string;
  isDone: number;
  priority?: number;
  projectid?: number;
}
