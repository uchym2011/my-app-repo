// tworzymy interfejsc który będzie reprezentował nasz obiekt Task
export interface Task {
  _id?: {"$oid": string}
  name: string;
  created: string;
  end?: string;
  isDone: boolean;
}
