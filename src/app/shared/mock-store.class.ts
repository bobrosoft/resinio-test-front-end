import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class MockStore<T> {
  reducers = new Map<string, BehaviorSubject<any>>();

  select(name) {
    if (!this.reducers.has(name)) {
      this.reducers.set(name, new BehaviorSubject({}));
    }
    return this.reducers.get(name);
  }

  mockState(reducerName, data) {
    this.select(reducerName).next(data);
  }

  dispatch(data: any) {
    // spy on me
  }
}