import React from 'react'
import "./Manager.css"
import { Avatar, Divider, List, Skeleton, Descriptions, Badge, Button, Modal, DatePicker, Space , Calendar  } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Data } from "../../App"
import "./Manager.css"
import Employee from '../EmployeePage/Employee';
import DescriptionsItem from 'antd/es/descriptions/Item';
const { RangePicker } = DatePicker;
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
            console.log(response)
            const newData = data.map((elem, i) => {

                if (elem._id == employee._id) {
                    const result = employee.hr_actions.filter((elem, i) => {
                        return elem._id != id
                    })
                    console.log(result)
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
            // const newHRaction = employee.hr_actions.filter((elem,i)=>{
            //     return elem._id != id
            // })
            // // setEmployee(newEmployee)
            // console.log(employee.hr_actions)
            // employee.hrAction=newHRaction


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
        const schedule = {
            employee_id:employee._id,
            work_days:{
                start_time:selectStartDay,
                end_time:selectEndDay,
                hours:8,
                isWork:true
            }
        }
try{
    const response = await axios.post(`http://localhost:5000/schedule/${employee._id}`,schedule,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(response)
}catch(err){
    console.log(err)
}
        setIsModalOpen(false);

    };
    //handle cencel for both modals ||-----------------------------------------------------------||
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsMpdalOpen_2(false)
    };

    // Handle the change on date in the date Picker||-----------------------------------------------------------||
    const onChange = (date) => {
        if (date) {
            console.log('Date: ', date);
        } else {
            console.log('Clear');
        }
    };
    // Handle the change on date in the date Picker||-----------------------------------------------------------||
    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            // console.log('From: ', dates[0], ', to: ', dates[1]);
            // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
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
    const handleShowOk = ()=>{
        setIsMpdalOpen_2(false);
    }
    //Show 2nd Modal (Show One) ||-----------------------------------------------------------||
    const showModalShow = ( ) =>{
        setIsMpdalOpen_2(true)
    }
    const getListData = (value) => {
        let listData;
        switch (value.date()) {
          case 8:
            listData = [
              {
                type: 'warning',
                content: 'This is warning event.',
              },
              {
                type: 'success',
                content: 'This is usual event.',
              },
            ];
            break;
          case 10:
            listData = [
              {
                type: 'warning',
                content: 'This is warning event.',
              },
              {
                type: 'success',
                content: 'This is usual event.',
              },
              {
                type: 'error',
                content: 'This is error event.',
              },
            ];
            break;
          case 15:
            listData = [
              {
                type: 'warning',
                content: 'This is warning event',
              },
              {
                type: 'success',
                content: 'This is very long usual event。。....',
              },
              {
                type: 'error',
                content: 'This is error event 1.',
              },
              {
                type: 'error',
                content: 'This is error event 2.',
              },
              {
                type: 'error',
                content: 'This is error event 3.',
              },
              {
                type: 'error',
                content: 'This is error event 4.',
              },
            ];
            break;
          default:
        }
        return listData || [];
      };
      const getMonthData = (value) => {
        if (value.month() === 8) {
          return 1394;
        }
      };
    



    if (employee) {
        calculateAnnual(employee._id)
        calculateSick(employee._id)

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
                        <p>{employee.salary.hourly_salary * 8}JOD</p>
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
                        Database version: 3.4
                        <br />

                    </Descriptions.Item>
                    <Descriptions.Item label="Schedule">
                        <button onClick={showModal}>Edit Schedule</button>


                        <Modal title="Set Schedule" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Space direction="vertical" size={12}>
                                <DatePicker
                                    presets={[
                                        {
                                            label: 'Yesterday',
                                            value: dayjs().add(-1, 'd'),
                                        },
                                        {
                                            label: 'Last Week',
                                            value: dayjs().add(-7, 'd'),
                                        },
                                        {
                                            label: 'Last Month',
                                            value: dayjs().add(-1, 'month'),
                                        },
                                    ]}
                                    onChange={onChange}
                                />
                                <RangePicker presets={rangePresets} onChange={onRangeChange} />
                                <RangePicker
                                    presets={rangePresets}
                                    showTime
                                    format="YYYY/MM/DD HH:mm:ss"
                                    onChange={onRangeChange}
                                />
                            </Space>
                        </Modal>


                        <button onClick={showModalShow}>Show Schedule</button>
                        <Modal title="test" open={isMpdalOpen_2} onOk={handleShowOk} onCancel={handleCancel}>


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