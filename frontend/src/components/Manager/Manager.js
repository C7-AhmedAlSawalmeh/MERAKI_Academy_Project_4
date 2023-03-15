import React from 'react'
import "./Manager.css"
import { Avatar, Divider, List, Skeleton, Descriptions, Badge, Button, Modal, DatePicker, Space, Calendar, Typography, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import { useEffect, useState, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Data } from "../../App"
import { WeeklyCalendar, } from 'antd-weekly-calendar';
import "./Manager.css"

const { RangePicker } = DatePicker;


const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const items = [
    {
        key: 'Work',
        label: 'Work',
    },
    {
        key: 'Meeting',
        label: 'Meeting',
    },
    {
        key: 'OFF',
        label: 'OFF',
    },
    {
        key: 'Annual',
        label: 'Annual',
    },
    {
        key: 'Sick',
        label: 'Sick',
    },
    {
        key: 'Break',
        label: 'Break',
    },
];
let events = [];
const Manager = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [employee, setEmployee] = useState("")
    const [salaryClicked, setSalaryClicked] = useState(false)
    const [valueOfSalary, setValueOfSalary] = useState("")
    const [salaryClickId, setSalaryClickId] = useState("")
    const [HrBtnClicked, setHrBtnClicked] = useState(false)
    const [hrIdClick, setHrIdClick] = useState("")
    const [hrAction, setHrAction] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isMpdalOpen_2, setIsMpdalOpen_2] = useState(false)
    const [selectStartDay, setSelectStartDay] = useState("")
    const [selectEndDay, setSelectEndDay] = useState("")
    const [workActivity, setWorkActivity] = useState("Work")
    const [renderActivity, setRenderActivity] = useState(true)


    const { RangePicker } = DatePicker;




    const { token, setToken } = useContext(Data)
    // Call all the data ||-----------------------------------------------------------||
    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/employee', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setData(response.data.employees)
            setLoading(false);

        } catch (err) {
            console.log(err)
        }
    };
    // Show Data for specific employee ||---------------------------------||
    const handleClickName = async (employeeId) => {

        try {
            const response = await axios.get(`http://localhost:5000/employee/id/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setEmployee(response.data.employee)



        } catch (err) {
            console.log(err)
        }
    }
    //Calculate the annual for the employee by id ||-----------------------------||
    const calculateAnnual = async (employeeId) => {

        const employee_Id = {
            employee_id: employeeId
        }
        try {
            const response = await axios.post("http://localhost:5000/annual", employee_Id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


        } catch (err) {
            console.log(err)
        }

    }
    //Calculate the sick for the employee by id ||-----------------------------||
    const calculateSick = async (employeeId) => {
        const employee_Id = {
            employee_id: employeeId
        }
        try {
            const response = await axios.post("http://localhost:5000/sick", employee_Id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


        } catch (err) {
            console.log(err)
        }

    }
    //Calculate the salary for the employee by id ||-----------------------------||
    const calculateSalary = async (employeeId) => {

        const employee = {
            employee_id: employeeId,
            hourly_salary: valueOfSalary
        }
        try {
            const response = await axios.post("http://localhost:5000/salary", employee, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


            setEmployee(response.data.salary)

        } catch (err) {
            console.log(err)
        }
    }
    // Put HR action to the employee profile ||-----------------------------------------------------------||
    const handleHRclick = async (employeeId) => {

        if (hrAction != "") {
            const employee = {
                employee_id: employeeId,
                reason: hrAction

            }
            try {
                const response = await axios.post("http://localhost:5000/hrAction", employee, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setEmployee(response.data.Action)

                setHrAction("")

            } catch (err) {
                console.log(err)

            }
        }

    }
    // Delete the HR action from the employee's profile ||-----------------------------------------------------------||
    const handleDeleteHR = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/hrAction/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const newData = data.map((elem, i) => {

                if (elem._id == employee._id) {
                    const result = employee.hr_actions.filter((elem, i) => {
                        return elem._id != id
                    })

                    elem.hr_actions = result
                    employee.hr_actions = elem.hr_actions
                    setEmployee(data[i])
                    return elem
                }
                else {
                    return elem
                }
            })
            setData(newData)



        } catch (err) {
            console.log(err)
        }
    }
    //Show First Modal (Edit One) ||-----------------------------------------------------------||
    const showModal = () => {
        setIsModalOpen(true);
    };
    //handle ok for the first Modal ||-----------------------------------------------------------||
    const handleOk = async () => {
        let day = new Date(selectStartDay)

        const schedule = {

            employee_id: employee._id,
            work_days: {
                day: weekday[day.getDay()],
                start_time: selectStartDay,
                end_time: selectEndDay,
                hours: 8,
                isWork: workActivity
            }
        }
        try {
            const response = await axios.post(`http://localhost:5000/schedule/${employee._id}`, schedule, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const newData = data.map((elem, i) => {

                if (elem._id == employee._id) {
                    elem.schedule.push(response.data.schedule)
                    employee.schedule.push(response.data.schedule)
                    console.log(employee.schedule)
                    if (employee?.schedule?.length) {
                        const loopSchedule = () => {

                            if (renderActivity) {
                                events = []
                                employee.schedule.forEach((elem, i) => {
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
                                        color = "yellow"
                                    }

                                    events.push({ startTime: new Date(elem.work_days.start_time), endTime: new Date(elem.work_days.end_time), title: elem.work_days.isWork, backgroundColor: color, id: elem._id })

                                    console.log(events)
                                    console.log(employee.schedule)
                                    setRenderActivity(false)

                                })

                                setRenderActivity(false)
                            }

                        }
                        loopSchedule()
                    }
                    //    setEmployee(data[i])
                    return elem
                }
                else {
                    return elem
                }
            })

            setData(newData)



        } catch (err) {
            console.log(err)
        }
        setIsModalOpen(false);
        setRenderActivity(true)

    };

    //handle cencel for both modals ||-----------------------------------------------------------||
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsMpdalOpen_2(false)
    };


    // Handle the change on date in the date Picker||-----------------------------------------------------------||
    const onRangeChange = (dates, dateStrings) => {
        if (dates) {

            setSelectStartDay(dateStrings[0])
            setSelectEndDay(dateStrings[1])
        } else {
            console.log('Clear');
        }
    };
    //Some fetures in the data picked "not needed"||-----------------------------------------------------------||
    const rangePresets = [
        {
            label: 'Last 7 Days',
            value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
            label: 'Last 14 Days',
            value: [dayjs().add(-14, 'd'), dayjs()],
        },
        {
            label: 'Last 30 Days',
            value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
            label: 'Last 90 Days',
            value: [dayjs().add(-90, 'd'), dayjs()],
        },
    ];

    //handle ok for the 2nd Modal ||-----------------------------------------------------------||
    const handleShowOk = () => {
        setIsMpdalOpen_2(false);
    }
    //Show 2nd Modal (Show One) ||-----------------------------------------------------------||
    const showModalShow = () => {
        setIsMpdalOpen_2(true)
    }





    const deleteActivity = async (id) => {
        const employee = {

        }
        try {
            const response = await axios.delete(`http://localhost:5000/schedule/update/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const newData = data.map((elem, i) => {

                if (elem._id == employee._id) {
                    const result = employee.schedule.filter((elem, i) => {
                        return elem._id != id
                    })

                    elem.schedule = result
                    employee.schedule = elem.schedule
                    setEmployee(data[i])
                    return elem
                }
                else {
                    return elem
                }
            })
            setData(newData)
            console.log(events)
            const newResult = events.filter((elem, i) => {
                return elem.id != id
            })
            events = newResult
            console.log(newResult)
        } catch (err) {
            console.log(err)
        }



    }

    if (employee) {
        calculateAnnual(employee._id)
        calculateSick(employee._id)

    }
    const onClick = ({ key }) => {
        setWorkActivity(key)
    }

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <div className='managerPage'>
            <div
                id="scrollableDiv"
                style={{
                    width: 350,
                    height: "100vh",
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 1}
                    loader={
                        <Skeleton
                            avatar
                            paragraph={{
                                rows: 1,
                            }}
                            active
                        />
                    }
                    endMessage={<Divider plain>End ..</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={data}
                        renderItem={(employee) => (
                            <List.Item key={employee.email}>
                                <List.Item.Meta

                                    title={<a onClick={() => {
                                        handleClickName(employee._id)

                                    }}>{employee.name}</a>}

                                    description={employee.email}

                                />

                                <div>{employee.employeeId}</div>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>

            </div>
            <div>
                {employee && <div className='emplyoeeProfile'>
                    <Descriptions title={`${employee.name}'s Profile`} layout="vertical" bordered={true}>
                        <Descriptions.Item label="Name">{employee.name}</Descriptions.Item>
                        <Descriptions.Item label="Employee ID">{employee.employeeId}</Descriptions.Item>
                        <Descriptions.Item label="Phone Number">{employee.phoneNumber}</Descriptions.Item>
                        <Descriptions.Item label="Date of Entry">{employee.date}</Descriptions.Item>
                        <Descriptions.Item label="Current Time" span={2}>
                            {Date()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status" span={3} >

                            <Badge status="processing" text="Active" />
                        </Descriptions.Item>
                        <Descriptions.Item label="Annual Vacations">{employee.annual_vacations.annual_days}</Descriptions.Item>
                        <Descriptions.Item label="Sick Vacations">{employee.sick_vacations.sick_days}</Descriptions.Item>
                        <Descriptions.Item label="Salary"><button onClick={() => {
                            setSalaryClickId(employee._id)
                            setSalaryClicked(!salaryClicked)
                            calculateSalary(employee._id)


                        }}>Edit Salary</button>
                            {salaryClicked && salaryClickId === employee._id && <input placeholder="Hourly" onChange={(e) => {
                                setValueOfSalary(e.target.value)

                            }}></input>}
                            <p>{employee?.salary?.hourly_salary * 8}JOD</p>
                        </Descriptions.Item>
                        <Descriptions.Item label="HR Actions" >
                            <button onClick={() => {

                                setHrBtnClicked(!HrBtnClicked)
                                setHrIdClick(employee._id)
                                handleHRclick(employee._id)
                            }}>Add HR action</button>
                            {HrBtnClicked && employee._id == hrIdClick && <input placeholder='Put the reason here' onChange={(e) => {
                                setHrAction(e.target.value)
                            }}></input>}
                            <br />
                            {employee.hr_actions.map((elem, i) => {
                                return <div key={i}>
                                    <p>{elem.reason}</p>
                                    <button onClick={() => {
                                        handleDeleteHR(elem._id)
                                    }}>Delete HR</button>
                                </div>

                            })}

                            <br />



                        </Descriptions.Item>
                        <Descriptions.Item label="Schedule">
                            <button onClick={showModal}>Edit Schedule</button>


                            <Modal title="Set Schedule" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <Space direction="vertical" size={12}>
                                    <RangePicker
                                        presets={rangePresets}
                                        showTime
                                        format=" YYYY/MM/DD HH:mm:ss"
                                        onChange={onRangeChange}
                                    />
                                    <Dropdown
                                        menu={{
                                            items,
                                            selectable: true,
                                            defaultSelectedKeys: ['6'],
                                            onClick,
                                        }}
                                    >
                                        <Typography.Link>
                                            <Space>
                                                {workActivity}
                                                <DownOutlined />
                                            </Space>
                                        </Typography.Link>
                                    </Dropdown>
                                </Space>
                            </Modal>


                            <button onClick={showModalShow}>Show Schedule</button>
                            <Modal title="test" open={isMpdalOpen_2} onOk={handleShowOk} onCancel={handleCancel} width={1000}>
                                <>
                                    <WeeklyCalendar
                                        events={events}
                                        onEventClick={(event) => deleteActivity(event.id)}

                                        weekends="false"
                                    />
                                </>

                            </Modal>

                        </Descriptions.Item>
                        <Descriptions.Item label="Attendence">
                            <div>
                                <input type="checkbox" id="start" name="start" ></input>
                                <label >Start</label>
                            </div>

                            <div>
                                <input type="checkbox" id="end" name="end"></input>
                                <label >End</label>
                            </div>

                        </Descriptions.Item>
                    </Descriptions>
                </div>}

            </div>
        </div>
    )
}


export default Manager
// format="YYYY/MM/DD HH:mm:ss"