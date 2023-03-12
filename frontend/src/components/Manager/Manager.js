import React from 'react'
import "./Manager.css"
import { Avatar, Divider, List, Skeleton } from 'antd';
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
    const [employee, setEmployee] = useState({})
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
            console.log(response)

        } catch (err) {
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
                                {employee._id === clickId && <p>hello</p>}
                                <div>{employee.phoneNumber}</div>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>

            </div>
            <div>
                {employee && <p>{employee.name}</p>}
            </div>
        </div>
    )
}

export default Manager