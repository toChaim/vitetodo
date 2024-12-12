import { useEffect, useState } from 'react';

import {
  downloadFile,
  previewFile,
  parserReplacer,
  stringifyReplacer,
} from '../helpers';
import { getData, saveData } from '../dataConnection';

const isValidJSON = (str) => {
  try {
    JSON.parse(str, parserReplacer);
    return true;
  } catch {
    return false;
  }
};

const SettingsPage = () => {
  const [original, setOriginal] = useState('{}');
  const [data, setData] = useState('{}');

  useEffect(() => {
    const localData = JSON.stringify(getData(), stringifyReplacer, 2);
    setData(localData);
    setOriginal(localData);
  }, []);
  const canSave = original !== data && isValidJSON(data);

  return (
    <div className="page">
      <div>
        <h2>SettingsPage</h2>
      </div>
      <div className="head row">
        <button
          onClick={() => {
            downloadFile(data);
          }}
          disabled={!isValidJSON(data)}
        >
          Download ⬇
        </button>
        <label className="fileControl">
          Upload ⬆:{' '}
          <input
            type="file"
            accept="./*,.json"
            onChange={({ target: { files } }) => {
              previewFile(files[0]).then((res) => {
                setData(res);
              });
            }}
          />
        </label>
        <button
          onClick={() => {
            saveData(JSON.parse(data, parserReplacer, 2));
          }}
          disabled={!canSave}
        >
          Save
        </button>
      </div>
      <div className="main">
        <textarea value={data} onChange={(e) => setData(e.target.value)} />
      </div>
    </div>
  );
};

export default SettingsPage;
