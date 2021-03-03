import React, {useCallback, useEffect, useState} from 'react';
import { set, isEqual, debounce } from 'lodash';
import Table from './Table'

import './App.css';

function App() {
  const [schedule, setSchedule] = useState(0);
  useEffect(() => {
    const scheduleStorage = window.localStorage.getItem('schedule');
    if (scheduleStorage) {
      setSchedule(JSON.parse(scheduleStorage));
    } else {
      getSchedule('wangyuxu');
    }
  }, []);
  function deleteSchedule(data) {
    const confirm = window.confirm('delete item?');
    if (confirm) {
      const temp = schedule.slice();
      temp.splice(schedule.findIndex(item => isEqual(item, data)), 1);
      window.localStorage.setItem('schedule', JSON.stringify(temp));
      setSchedule(temp);
    }
  }
  function addSchedule(data) {
    const temp = [...schedule, data];
    setSchedule(temp);
    window.localStorage.setItem('schedule', JSON.stringify(temp));
  }
  function getSchedule(str) {
    console.log(str.target);
    fetch(`https://cors-anywhere.herokuapp.com/https://webapplis.utc.fr/Edt_ent_rest/myedt/result/?login=${str}` )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.length) {
          res = res.map(item => set(item, 'name', str));
          const temp = (JSON.parse(window.localStorage.getItem('schedule')) || []).concat(res);
          window.localStorage.setItem('schedule', JSON.stringify(temp));
          setSchedule(temp);
        } else {
          window.alert('there no anymore schedule');
        }
      }).catch(err => console.log(err))
  }
  return (
    <div className="App">
      <Table list={schedule} getSchedule={debounce(getSchedule, 500)} addSchedule={addSchedule} deleteSchedule={deleteSchedule} />
    </div>
  );
}

export default App;
