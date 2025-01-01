// Utility to generate a random hex string
export const getHexString = (digits = 16) => {
  const res = Math.random()
    .toString(16)
    .slice(2, Math.min(digits + 2, 15));
  return res.length < digits ? res + getHexString(digits - res.length) : res;
};

// Parse JSON and convert ISO date strings to Date objects
// https://jsoneditoronline.org/indepth/parse/json-date-format/
export const isStringDate = (str) =>
  typeof str === 'string' &&
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(str);

export const parserReplacer = (key, value) => {
  if (isStringDate(value)) {
    return new Date(value);
  }

  return value;
};

// Convert Date objects to ISO strings before saving
export const isDateObject = (obj) => obj && typeof obj.getMonth === 'function';

export const stringifyReplacer = (key, value) => {
  if (value instanceof Set) {
    return [...value];
  }
  if (value instanceof Map) {
    return Object.fromEntries(value);
  }
  if (isDateObject(value)) {
    return value.toJSON();
  }
  if (typeof value === 'function') {
    return value.toString();
  }

  return value;
};

// https://stackoverflow.com/questions/11071473/how-can-javascript-save-to-a-local-file
export const downloadFile = (fileContent, fileName = 'data.json') => {
  if (typeof fileContent !== 'string') {
    fileContent = JSON.stringify(fileContent, stringifyReplacer, 2);
  }
  const blob = new Blob([fileContent], {
    type: 'application/json',
  });
  const link = document.createElement('a');
  link.download = fileName;
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};

export const previewFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    if (file) {
      reader.readAsText(file);
    }
  });
};

export const makeChangeHandlerForKey = (data, setData) => {
  return (key) => {
    return ({ target: { value } }) => {
      setData({ ...data, [key]: value });
    };
  };
};

export const makeSetter = (key, data, setter) => {
  return (value) => {
    return setter(
      Array.isArray(data)
        ? data.map((v, i) => (key === i ? value : v))
        : { ...data, [key]: value },
    );
  };
};

export const makeChangeHandler = (setter) => {
  return ({ target: { value } }) => {
    setter(value);
  };
};

export const makeFilter = (filterObj) => {
  const filters = Object.entries(filterObj);

  return (record) => {
    if (!filters.length) {
      return true;
    }
    return filters.every(([key, filter]) => {
      return typeof filter === 'function'
        ? filter(record[key])
        : record[key].includes(filter);
    });
  };
};
