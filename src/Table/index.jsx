import React, {useState} from 'react';
import { range } from 'lodash';

import ScheduleItem from '../ScheduleItem';
import './style.css';


const week = [
  'LUNDI',
  'MARDI',
  'MERCREDI',
  'JEUDI',
  'VENDREDI',
  'SAMEDI',
  'DIMANCHE'
];

const inputList = ['uv', 'type', 'day', 'begin', 'end', 'group'];
const time = range(12).map(item => item + 8);
export default ({ list, deleteSchedule, addSchedule, getSchedule }) => {
  const [showModal, setShowModal] = useState(false);
  function add() {
    setShowModal(true)
  }
  function setupSchedule() {
    const temp = {};
    inputList.forEach(item => {
      temp[item] = document.querySelector(`#${item}`).value;
    });
    setShowModal(false);
    addSchedule(temp);
  }
  return (
    <div className="table">
      <div className="d-flex header tr">
        <span className="th " >
          <input type="text" onInput={(event) => (getSchedule(event.target.value))}/>
        </span>
        {
          week.map(item => <span className="th " key={item}>{item}</span>)
        }
      </div>
      {
        time.map(item => (
          <div key={item}>
            <div className="tr odd d-flex">
              <span className="td ">{item}:00</span>
              {
                range(7).map(item => <span onClick={add} className="td" key={item} />)
              }
            </div>
            <div className="tr even d-flex">
              <span className="td " />
              {
                range(7).map(item => <span onClick={add} key={item} className="td " />)
              }
            </div>
          </div>
        ))
      }
      {
        list && list.map(item => <ScheduleItem data={item} deleteSchedule={deleteSchedule}  />)
      }
      <div className="modal" style={{display: showModal ? 'block' : 'none'}} >
        <div className="d-flex flex-column ">
          <label htmlFor="uv">uv: <input id="uv" name="uv" type="text"/></label>
          <label htmlFor="type">type: <input id="type" name="type" type="text"/></label>
          <label htmlFor="day">day: <select id="day" name="day">
            {week.map(item => <option value={item} key={item}>{item}</option>)}
          </select></label>
          <label htmlFor="begin">begin: <input id="begin" name="begin" type="time"/></label>
          <label htmlFor="end">end: <input id="end" name="end" type="time"/></label>
          <label htmlFor="group">group: <input id="group" name="group" type="text"/></label>
          <button onClick={() => setupSchedule(false)} >submit</button>
        </div>

      </div>
    </div>
  )
}
