import React from 'react'
import "./Manager.css"
import { Avatar, Divider, List, Skeleton, Descriptions, Badge } from 'antd';
import { useEffect, useState, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Data } from "../../App"
import "./Manager.css"
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
    const [checkDelete, setCheckDelete] = useState(false)

    const { token, setToken } = useContext(Data)

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
    const handleHRclick = async (employeeId) => {
        
        if(hrAction!=""){
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
    if (employee) {
        calculateAnnual(employee._id)
        calculateSick(employee._id)

    }

    const handleDeleteHR =async (id) => {
        try{
            const response = await axios.delete(`http://localhost:5000/hrAction/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)
            const newEmployee = data.filter((elem,i)=>{
                return 
            })
            
        }catch(err){
            console.log(err)
        }
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
                    {employee && <div className='emplyoeeProfile'> <Descriptions title={`${employee.name}'s Profile`} layout="vertical" bordered={true}>
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
                                    <button onClick={()=>{
                                        handleDeleteHR(elem._id)
                                    }}>Delete HR</button>
                                    </div>

                            })}
                            
                            <br />
                            Database version: 3.4
                            <br />

                        </Descriptions.Item>
                    </Descriptions>
                    </div>}

                </div>
            </div>
        )
    }

    export default Manager