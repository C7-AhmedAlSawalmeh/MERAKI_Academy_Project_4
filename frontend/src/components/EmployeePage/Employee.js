import React from 'react'
import { Avatar, Divider, List, Skeleton, Descriptions, Badge, Button, Modal, DatePicker, Space, Calendar, Typography, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useEffect, useState, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Data } from "../../App"
import { WeeklyCalendar, } from 'antd-weekly-calendar';


const { RangePicker } = DatePicker;


let events = []
const Employee = () => {
  const [emplyoee, setEmplyoee] = useState({})
  const [loading, setLoading] = useState(false);
  const [isMpdalOpen_2, setIsMpdalOpen_2] = useState(false)
  const [renderActivity, setRenderActivity] = useState(true)
  const [data, setData] = useState([]);
  const { isLoggedIn, setIsLoggedIn, token, setToken, managerLogged, setManagerLogged, normalToken, setNormalToken } = useContext(Data)
  // Call all the data ||-----------------------------------------------------------||
  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/employee', {
        headers: {
          Authorization: `Bearer ${normalToken}`
        }
      })

      setData(response.data.employees)
      const filter = response.data.employees.filter((elem, i) => {
        return elem.employeeId == response.data.emplyoeeId
      })

      setEmplyoee(filter)
      setLoading(false);

    } catch (err) {
      console.log(err)
    }
  };
  //handle ok for the 2nd Modal ||-----------------------------------------------------------||
  const handleShowOk = () => {
    setIsMpdalOpen_2(false);
  }
  //Show 2nd Modal (Show One) ||-----------------------------------------------------------||
  const showModalShow = () => {
    if (renderActivity) {
      events = []
      emplyoee[0].schedule.forEach((elem, i) => {
        let color;

        if (elem.work_days.isWork == "Work") {
          color = "blue"
        }
        if (elem.work_days.isWork == "Meeting") {
          color = "orange"
        }
        if (elem.work_days.isWork == "OFF") {
          color = "grey"
        }
        if (elem.work_days.isWork == "Annual") {
          color = "cornflowerblue"
        }
        if (elem.work_days.isWork == "Sick") {
          color = "red"
        }
        if (elem.work_days.isWork == "Break") {
          color = "black"
        }

        events.push({ startTime: new Date(elem.work_days.start_time), endTime: new Date(elem.work_days.end_time), title: `${elem.work_days.isWork} (${elem.work_days.hours}) hours`, backgroundColor: color, id: elem._id })
        setRenderActivity(false)
      })
    }

    setIsMpdalOpen_2(true)
  }
  //handle cencel for both modals ||-----------------------------------------------------------||
  const handleCancel = () => {

    setIsMpdalOpen_2(false)
  };
  useEffect(() => {
    loadMoreData()
  }, [])

 
  return (
    <div>
      {emplyoee?.length && <Descriptions title={emplyoee[0].name} layout="vertical" bordered>
        <Descriptions.Item label="Name">{emplyoee[0].name}</Descriptions.Item>
        <Descriptions.Item label="Employee ID">{emplyoee[0].employeeId}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">{emplyoee[0].phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="Date of Entry">{emplyoee[0].date}</Descriptions.Item>
        <Descriptions.Item label="Current Time" span={2}>
          {Date()}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="Annual Vacations">{emplyoee[0].annual_vacations.annual_days}</Descriptions.Item>
        <Descriptions.Item label="Sick Vacations">{emplyoee[0].sick_vacations.sick_days}</Descriptions.Item>
        <Descriptions.Item label="Salary">{emplyoee[0].salary.hourly_salary * 8} JOD</Descriptions.Item>
        <Descriptions.Item label="Schedule">
          <button onClick={showModalShow}>Show Schedule</button>
          <Modal title="test" open={isMpdalOpen_2} onOk={handleShowOk} onCancel={handleCancel} width={1000}>
            <>
              <WeeklyCalendar
                events={events}


                weekends="false"
              />
            </>

          </Modal>
        </Descriptions.Item>
      </Descriptions>}
    </div>
  )
}

export default Employee