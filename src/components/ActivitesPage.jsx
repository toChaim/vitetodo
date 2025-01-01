import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { getCollection } from '../dataConnection';
import { COLLECTIONS, STATUSES } from '../constants';

import ActivitesFilter from './ActivitesFilter';
import { makeFilter } from '../helpers';

const ActivitesPage = () => {
  const [data, setData] = useState({});
  const [filterObj, setFilterObj] = useState({ status: STATUSES.PENDING });
  useEffect(() => {
    setData(getCollection(COLLECTIONS.ACTIVITES));
  }, []);
  const activities = Object.values(data).filter(makeFilter(filterObj));

  return (
    <div>
      <ActivitesFilter filterObj={filterObj} setFilterObj={setFilterObj} />
      <ul>
        {activities.length}
        {activities.map(({ id, name, status }) => (
          <li key={id}>
            <Link to={`/${COLLECTIONS.ACTIVITES}/${id}`}>
              {name}: {status}: {id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitesPage;
