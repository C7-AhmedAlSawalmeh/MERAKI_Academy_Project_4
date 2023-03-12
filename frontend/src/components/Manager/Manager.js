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
    const { token, setToken } = useContext(Data)
    const [clickId, setClickId] = useState("")
    const [employee, setEmployee] = useState("")
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
        setClickId(employeeId)
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
        console.log(employeeId)
        const employee_Id={
            employee_id:employeeId
        }
        try {
            const response = await axios.post("http://localhost:5000/annual", employee_Id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)
        } catch (err) {
            console.log(err)
        }

    }
    const calculateSick = async (employeeId) => {
        const employee_Id={
            employee_id:employeeId
        }
        try {
            const response = await axios.post("http://localhost:5000/sick", employee_Id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)
         
        } catch (err) {
            console.log(err)
        }

    }
    if(employee){
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
                hasMore={data.length < 3}
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

                    <Badge status="processing" text="Running" />
                </Descriptions.Item>
                <Descriptions.Item label="Annual Vacations">{employee.annual_vacations.annual_days}</Descriptions.Item>
                <Descriptions.Item label="Sick Vacations">{employee.sick_vacations.sick_days}</Descriptions.Item>
                <Descriptions.Item label="Salary">$60.00</Descriptions.Item>
                <Descriptions.Item label="HR Actions">
                    Data disk type: MongoDB
                    <br />
                    Database version: 3.4
                    <br />
                    Package: dds.mongo.mid
                    <br />
                    Storage space: 10 GB
                    <br />
                    Replication factor: 3
                    <br />
                    Region: East China 1
                    <br />
                </Descriptions.Item>
            </Descriptions>
            </div>}

        </div>
    </div>
) }

export default Manager