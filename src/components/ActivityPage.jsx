import { useNavigate, useParams } from 'react-router';
import { BaseActivity, STATUSES, COLLECTIONS } from '../constants';
import { useEffect, useState } from 'react';
import {
  createDocument,
  readDocument,
  updateDocument,
} from '../dataConnection';
import { makeChangeHandlerForKey } from '../helpers';

const ActivityPage = () => {
  const navigate = useNavigate();
  const { activityId } = useParams();
  const [activity, setActivity] = useState(BaseActivity);
  const makeChangeHandler = makeChangeHandlerForKey(activity, setActivity);
  useEffect(() => {
    setActivity(
      activityId !== 'new'
        ? readDocument(COLLECTIONS.ACTIVITES, activityId)
        : BaseActivity,
    );
  }, [activityId]);
  const saveActivity = () => {
    if (activityId === 'new') {
      createDocument(COLLECTIONS.ACTIVITES, activity);
    } else {
      updateDocument(COLLECTIONS.ACTIVITES, activityId, activity);
    }
    navigate(`/${COLLECTIONS.ACTIVITES}`);
  };
  const {
    name,
    status,
    notes,
    durration,
    // start,
    // end,
    // scores,
    // subs,
    // tags,
    // sessions,
  } = activity;

  return (
    <div className="page">
      <div className="head">
        <h2>{name}</h2>
      </div>
      <div className="ActivityForm">
        <label>
          name: <input value={name} onChange={makeChangeHandler('name')} />
        </label>
        <label>
          status:{' '}
          <select value={status} onChange={makeChangeHandler('status')}>
            <option value="">{'<select>'}</option>
            {Object.keys(STATUSES).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </label>
        <label>
          Notes:{' '}
          <textarea value={notes} onChange={makeChangeHandler('notes')} />
        </label>
        <label>
          durration:{' '}
          <input
            type="number"
            value={durration / 60}
            onChange={makeChangeHandler('durration', (v) => v * 60)}
          />
        </label>
        <button onClick={saveActivity}>Save</button>
      </div>
    </div>
  );
};

export default ActivityPage;
