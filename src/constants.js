// data connection
export const LOCAL_STORAGE_KEY = 'todo';
export const DEFAULT_DATA = '{ "activites": {}, "blocks": {}, "sessions": {}}';

const [ACTIVITES, BLOCKS, SESSIONS] = ['activites', 'blocks', 'sessions'];
export const COLLECTIONS = { ACTIVITES, BLOCKS, SESSIONS };

const [PYSICAL, MENTAL, EMOTIONAL, SOCIAL, MATERIAL, PURPOSE] = [
  'PYSICAL',
  'MENTAL',
  'EMOTIONAL',
  'SOCIAL',
  'MATERIAL',
  'PURPOSE',
];
export const AREAS = { PYSICAL, MENTAL, EMOTIONAL, SOCIAL, MATERIAL, PURPOSE };

const [PENDING, STARTED, DONE, RELEASED, ONGOING] = [
  'PENDING',
  'STARTED',
  'DONE',
  'RELEASED',
  'ONGOING',
];
export const STATUSES = { PENDING, STARTED, DONE, RELEASED, ONGOING };

export const BaseActivity = {
  name: '',
  status: PENDING, // enum of
  notes: '',
  durration: 5 * 60, // number of seconds
  start: null,
  end: null,
  scores: {
    PYSICAL: 0,
    MENTAL: 0,
    EMOTIONAL: 0,
    SOCIAL: 0,
    MATERIAL: 0,
    PURPOSE: 0,
  },
  subs: {},
  tags: {},
  sessions: {},
};

export const nullFilter = () => true;

export const BaseBlock = {
  name: '',
  start: null,
  end: null,
  filter: nullFilter,
};

export const BaseSession = {
  name: '',
  start: null,
  end: null,
  paused: 0,
};
