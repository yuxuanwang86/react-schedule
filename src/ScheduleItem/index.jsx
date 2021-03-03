import React from 'react';

import './styles.css';

const colorList = [
  '#CCFF99',
  '#CCCCFF',
  '#99CCCC',
  '#FFFFCC',
  '#CCFFCC',
  '#FFCCCC',
  '#CCCCCC',
  '#FF6666',
  '#FFFF99',
  '#666699',
]
const week = [
  'LUNDI',
  'MARDI',
  'MERCREDI',
  'JEUDI',
  'VENDREDI',
  'SAMEDI',
  'DIMANCHE'
];

export default ({ data, deleteSchedule }) => {
  return (
    <div className="position-absolute scheduleItem" style={{
      backgroundColor: colorList[clacColor(data.uv) % 10] || '#CCCCFF',
      width: '12%',
      height: `${calcHeight(data.begin, data.end)}vh`,
      left: `${week.findIndex(item => item === data.day) * 13 + 9.5}%`,
      top: `calc(${calcTop(data.begin)}vh + 30px) `
    }}>
      <div onClick={() => deleteSchedule(data)} className="position-absolute delete">X</div>
      <p>{data.begin} - {data.end}</p>
      <p>{data.type}  {data.uv} {data.group}</p>
      <p>{data.room}</p>
      <p>{data.name}</p>
    </div>
  )
}

function calcTop(begin) {
  const hours = begin.substr(0, 2) - 8;
  const mins = begin.substr(3) / 60;
  return hours * 8 + mins * 8;
}

function calcHeight(begin, end) {
  const hours = end.substr(0, 2) - begin.substr(0, 2);
  const mins = (end.substr(3) - begin.substr(3)) / 60;
  console.log(hours, mins)
  return hours * 8 + mins * 8;
}

function clacColor(type) {
  return type.split('').reduce((acc, cur) => acc += cur.charCodeAt(0), 0)
}
