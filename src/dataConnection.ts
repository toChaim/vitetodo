import { stringifyReplacer, parserReplacer } from './helpers';
import { LOCAL_STORAGE_KEY, DEFAULT_DATA } from './constants';

// Initialize localStorage if it doesn't exist
const initializeStorage = () => {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    localStorage.getItem(LOCAL_STORAGE_KEY) || DEFAULT_DATA,
  );
};

// Get the current data from localStorage
const getData = () =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '', parserReplacer);

// Save updated data to localStorage
const saveData = (data) =>
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(data, stringifyReplacer),
  );

// or similar to firebase
export const or = (...filters) => {
  return (v) => {
    for (let f of filters) {
      if (f(v)) {
        return true;
      }
    }
    return false;
  };
};

// where similar to firebase
export const operators = [
  '<',
  '<=',
  '>',
  '>=',
  '!=',
  '==',
  'array-contains',
  'array-contains-any',
  'in',
  'not-in',
];

export const where = (key, operator, value) => {
  const arrayContainsAny = (v) => {
    const values = new Set(value);
    return v[key].some((e) => values.has(e));
  };

  const fnObj = {
    '<': (v) => v[key] < value,
    '<=': (v) => v[key] <= value,
    '>': (v) => v[key] > value,
    '>=': (v) => v[key] >= value,
    '!=': (v) => v[key] !== value,
    '==': (v) => v[key] === value,
    'array-contains': (v) => v[key].includes(value),
    'array-contains-any': arrayContainsAny,
    in: arrayContainsAny,
    'not-in': (v) => !arrayContainsAny(v),
  };

  return (v) => fnObj[operator](v);
};

// filterObject
export const filterObject = (obj: Object, filters: Array<Function>) => {
  if (filters.length === 0) {
    return obj;
  }
  return Object.entries(obj).reduce((a, [key, value]) => {
    const pass = filters.every((fn) => fn(value));
    if (pass) {
      a[key] = value;
    }
    return a;
  }, {});
};

// Get all documents in a collection
const getCollection = (collectionId, ...filters) =>
  filterObject(getData()[collectionId] || {}, filters);

// Create a document in a collection
// Ensure a unique ID by checking the existing data
function generateUniqueId(collectionId) {
  let documentId;
  const data = getData();
  do {
    documentId = self.crypto.randomUUID();
  } while (data[collectionId][documentId]);
  return documentId;
}

const createDocument = (collectionId, document) => {
  const data = getData();
  const documentId = generateUniqueId(collectionId);
  const timestamp = new Date();
  const newDocument = {
    ...document,
    id: documentId,
    created: timestamp,
    updated: timestamp,
  };
  data[collectionId][documentId] = newDocument;
  saveData(data);
  return documentId;
};

// Read a document by ID
const readDocument = (collectionId, documentId) =>
  getData()[collectionId][documentId] || null;

// Update a document by ID
const updateDocument = (collectionId, documentId, updates) => {
  const data = getData();
  if (!data[collectionId][documentId]) {
    throw new Error(
      `Document with ID ${documentId} not found in ${collectionId}`,
    );
  }
  data[collectionId][documentId] = {
    ...data[collectionId][documentId],
    ...updates,
    updated: new Date(),
  };
  saveData(data);
};

// Delete a document by ID
const deleteDocument = (collectionId, documentId) => {
  const data = getData();
  if (!data[collectionId][documentId]) {
    throw new Error(
      `Document with ID ${documentId} not found in ${collectionId}`,
    );
  }
  delete data[collectionId][documentId];
  saveData(data);
};

// Initialize storage on load
initializeStorage();

export {
  getData,
  saveData,
  getCollection,
  createDocument,
  readDocument,
  updateDocument,
  deleteDocument,
};
