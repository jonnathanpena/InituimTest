import { ApplicationActionTypes, ApplicationActionUnion } from '../actions/application.action';
import { Queue } from '../../models/Queue';
import { ApplicationState } from '../states/application.state';

import * as CryptoJS from 'crypto-js';

const PrivateKey : string = 'InitiumTest@Qutio2021';

const initialState: ApplicationState = {
  data: [],
  last: {
    id: 0,
    queueId: 0,
    queueCat: {
      id: 0,
      queueName: '',
      queueTime: 0
    },
    clientId: 0,
    client: {
      id: 0,
      clientIdentification: '',
      clientName: ''
    },
    processed: false,
    position: 0,
    turnAt: null
  },
  next: [],
  getAll: true
};

const reload = (state: ApplicationState = initialState): ApplicationState => {
  if (localStorage.getItem('queues') !== null && localStorage.getItem('queues') !== '') {
    const saved = localStorage.getItem('queues');
    const bytes = CryptoJS.AES.decrypt(saved, PrivateKey);
    if (bytes.toString()) {
      const applicationState: ApplicationState = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      applicationState.getAll = true;
      localStorage.setItem('queues', CryptoJS.AES.encrypt(JSON.stringify(applicationState), PrivateKey).toString());

      return applicationState;
    } else {
      return state;
    }
  } else {
    return state;
  }
}

export function applicationReducer(state: ApplicationState = initialState, action: ApplicationActionUnion): ApplicationState {
  switch (action.type) {
    case ApplicationActionTypes.LOAD:
      return initialState;
    case ApplicationActionTypes.UPDATEDATA:
      const data: Queue[] = action.payload.filter(q => q.processed == true);
      const last : Queue = data[0];
      const next : Queue[] = action.payload.filter(q => q.processed == false);
      const getAll : boolean = false;
      const save : ApplicationState = { data, last, next, getAll };
      localStorage.setItem('queues', CryptoJS.AES.encrypt(JSON.stringify(save), PrivateKey).toString());

      return save;
    case ApplicationActionTypes.RELOADDATA:
      return reload(state);
    default:
      return reload(state);
  }
}
