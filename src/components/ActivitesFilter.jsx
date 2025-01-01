import PropTypes from 'prop-types';

import { STATUSES } from '../constants';
import { makeChangeHandlerForKey } from '../helpers';

const ActivitesFilter = ({ filterObj, setFilterObj }) => {
  const { name, status } = filterObj;
  const makeChangeHandler = makeChangeHandlerForKey(filterObj, setFilterObj);

  return (
    <div>
      <label>
        Name: <input value={name || ''} onChange={makeChangeHandler('name')} />
      </label>
      <label>
        Status:{' '}
        <select value={status} onChange={makeChangeHandler('status')}>
          <option value="">{'<Select>'}</option>
          {Object.values(STATUSES).map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

ActivitesFilter.propTypes = {
  filterObj: PropTypes.object,
  setFilterObj: PropTypes.func,
};

export default ActivitesFilter;
