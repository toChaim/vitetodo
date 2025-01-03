import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const makeBaseSession = () => {
  return { startTime: new Date(), resumeTime: 0, seconds: 0 };
};

const TimerControl = ({ duration, save }) => {
  const [time, setTime] = useState(Date.now());
  const [data, setData] = useState(makeBaseSession());
  const { resumeTime, seconds } = data;
  const lapsed = resumeTime ? seconds + time - resumeTime : seconds;

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const updateData = (prev) => {
    return {
      ...prev,
      resumeTime: prev.resumeTime ? 0 : time,
      seconds: lapsed,
      endTime: new Date(),
    };
  };

  const handleSave = () => {
    save(updateData(data));
    setData(makeBaseSession());
  };

  return (
    <div>
      <div>{Math.floor(lapsed / 1000)}</div>
      <div>
        <button onClick={() => setData(updateData)}>
          {resumeTime ? 'pause' : 'start'}
        </button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

TimerControl.propTypes = {
  duration: PropTypes.number,
  save: PropTypes.func,
};

export default TimerControl;
