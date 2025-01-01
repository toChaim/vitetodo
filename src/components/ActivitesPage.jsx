import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { getCollection } from '../dataConnection';
import { COLLECTIONS } from '../constants';

import ActivitesFilter from './ActivitesFilter';
import { makeFilter } from '../helpers';

const ActivitesPage = () => {
  const [data, setData] = useState({});
  const [filterObj, setFilterObj] = useState({});
  useEffect(() => {
    setData(getCollection(COLLECTIONS.ACTIVITES));
  }, []);

  return (
    <div>
      <ActivitesFilter filterObj={filterObj} setFilterObj={setFilterObj} />
      <ul>
        {Object.values(data)
          .filter(makeFilter(filterObj))
          .map(({ id, name, status }) => (
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
