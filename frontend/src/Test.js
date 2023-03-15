import React from 'react'
import {
    WeeklyCalendar,
  } from 'antd-weekly-calendar';
  
  const events = [
    { startTime: new Date(2023, 2, 21, 12, 0, 0), endTime: new Date(2023, 2, 21, 14, 30, 0), title: 'Ap. 1', backgroundColor: 'red' },
    { startTime: new Date(2023, 2, 25, 10, 0, 0), endTime: new Date(2023, 2, 25, 17, 15, 0), title: 'Ap. 1' },
  ];
console.log(events[0].startTime)
const Test = () => {
  return (
    <>
        <WeeklyCalendar
            events={events}
            onEventClick={(event) => console.log(event)}
            onSelectDate={(date) => console.log(date)}
            weekends="false"
        />
      </>
  )
}

export default Test