import React, { useEffect, useState } from 'react'
import { Layout, theme, DatePicker } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUsersViewfinder,
    faHandPointer, faClock,
    faMessage,
    faTowerBroadcast,
    faSignal
} from '@fortawesome/free-solid-svg-icons'
import { LoadingOutlined } from '@ant-design/icons'
import Sidebar from '../layout/Sidebar'
import Headers from '../layout/Headers'
import dayjs from 'dayjs'
import "dayjs/locale/th"
import buddhistEra from 'dayjs/plugin/buddhistEra'
import { getGreetingMessage, getResultSumGreetingMessage } from '../Functions/AllMessage'
import Chart from 'react-apexcharts';
import { faReadme } from '@fortawesome/free-brands-svg-icons'


dayjs.extend(buddhistEra);
const { Content } = Layout;
const { RangePicker } = DatePicker;

function SendMessageNewFriend() {
    const [collapsed, setCollapsed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [greetingMS, setGreetingMS] = useState([])
    const [resultSumGreetingMS, setResultSumGreetingMS] = useState([])
    const [greetingImpress, setGreetingImpress] = useState([])

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    //Result Sum Greeting Message
    useEffect(() => {
        setLoading(true)
        getResultSumGreetingMessage()
            .then(res => {
                setResultSumGreetingMS(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }, [])

    const sum_usr_ms = resultSumGreetingMS.map((item) => parseInt(item.sum_usr_ms))
    const sum_usr_read_ms = resultSumGreetingMS.map((item) => parseInt(item.sum_usr_read_ms))
    const rate_op_ms = resultSumGreetingMS.map((item) => parseFloat(item.rate_op_ms))
    const sum_usr_click_ms = resultSumGreetingMS.map((item) => parseInt(item.sum_usr_click_ms))
    const rate_usr_click = resultSumGreetingMS.map((item) => parseFloat(item.rate_usr_click))

    //Greeting Message
    useEffect(() => {
        setLoading(true)
        getGreetingMessage()
            .then(res => {
                setGreetingMS(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }, [])

    const m_greeting = greetingMS.map((item) => dayjs(item.m_message).locale('th').format('MMM BB'))
    const user_recieve_message = greetingMS.map((item) => parseInt(item.user_recieve_message))
    const user_open_read = greetingMS.map((item) => parseInt(item.user_open_read))
    const rate_open_read = greetingMS.map((item) => parseFloat(item.rate_open_read))
    const user_click_message = greetingMS.map((item) => parseInt(item.user_click_message))
    const rate_user_click_message = greetingMS.map((item) => parseFloat(item.rate_user_click_message))

    //User Recieve Message
    const options_urms = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_greeting,
        },
        colors: ['#39a32b'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Message',
            align: 'left'
        }
    }
    const series_urms = [
        {
            name: "ข้อความ",
            data: user_recieve_message,
        }
    ]


    //User Open Read
    const options_uor = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_greeting,
        },
        colors: ['#11c8f9'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Message',
            align: 'left'
        }
    }
    const series_uor = [
        {
            name: "User Open Message",
            data: user_open_read,
        }
    ]


    //Rate Open Read
    const options_ror = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_greeting,
        },
        colors: ['#f9c411'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Rate',
            align: 'left'
        }
    }
    const series_ror = [
        {
            name: "Rate Open Read",
            data: rate_open_read,
        }
    ]


    //User Click Message
    const options_ucm = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_greeting,
        },
        colors: ['#e4477d'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Message',
            align: 'left'
        }
    }
    const series_ucm = [
        {
            name: "User Click Message",
            data: user_click_message,
        }
    ]


    //Rate User Click Message
    const options_rucm = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_greeting,
        },
        colors: ['#c462f8'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Rate',
            align: 'left'
        }
    }
    const series_rucm = [
        {
            name: "Rate User Click",
            data: rate_user_click_message,
        }
    ]


    return (
        <>
            <Layout>
                <Sidebar collapsed={collapsed} />
                <Layout>
                    <Headers collapsed={collapsed} setCollapsed={setCollapsed} />
                    <Content
                        className='content'
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG
                        }}
                    >
                        <h3 className='text-center'>สถิติข้อมูล GREETING MESSAGE</h3>
                        <h6 className='text-center'>ข้อมูลรหะว่างเดือนพฤษภาคม ถีง กรกฎาคม ปี พ.ศ. 2567</h6>

                        <div>
                            <div className='row' style={{ margin: '5px' }}>
                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '18vh',
                                            margin: '5px',
                                            justifyContent: 'center',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            borderColor: '#39a32b'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div
                                                style={{
                                                    border: '1px solid #39a32b',
                                                    borderRadius: '50%',
                                                    width: '40px',
                                                    height: '40px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#39a32b',
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faMessage} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            จำนวนผู้ใช้ที่ได้รับข้อความ
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#39a32b', }}
                                        >
                                            {sum_usr_ms.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </h3>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '18vh',
                                            margin: '5px',
                                            justifyContent: 'center',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            borderColor: '#11c8f9'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div
                                                style={{
                                                    border: '1px solid #11c8f9',
                                                    borderRadius: '50%',
                                                    width: '40px',
                                                    height: '40px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#11c8f9',
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faReadme} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            จำนวนผู้ใช้ที่เปิดอ่านข้อความ
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#11c8f9', }}
                                        >
                                            {sum_usr_read_ms.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </h3>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '18vh',
                                            margin: '5px',
                                            justifyContent: 'center',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            borderColor: '#f9c411'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div
                                                style={{
                                                    border: '1px solid #f9c411',
                                                    borderRadius: '50%',
                                                    width: '40px',
                                                    height: '40px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#f9c411',
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faSignal} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            อัตราผู้ใช้ที่เปิดอ่านข้อความ
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#f9c411', }}
                                        >
                                            {rate_op_ms}
                                        </h3>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '18vh',
                                            margin: '5px',
                                            justifyContent: 'center',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            borderColor: '#e4477d'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div
                                                style={{
                                                    border: '1px solid #e4477d',
                                                    borderRadius: '50%',
                                                    width: '40px',
                                                    height: '40px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#e4477d',
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faHandPointer} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            จำนวนผู้ใช้ที่คลิกข้อความ
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#e4477d', }}
                                        >
                                            {sum_usr_click_ms.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </h3>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '18vh',
                                            margin: '5px',
                                            justifyContent: 'center',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            borderColor: '#c462f8'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div
                                                style={{
                                                    border: '1px solid #c462f8',
                                                    borderRadius: '50%',
                                                    width: '40px',
                                                    height: '40px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#c462f8',
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faSignal} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            อัตราผู้ใช้ที่คลิกข้อความ
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#c462f8', }}
                                        >
                                            {rate_usr_click}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            loading
                                ?
                                <h1 className='text-center' style={{ marginTop: '30px' }}>Loading...<LoadingOutlined /></h1>
                                :
                                <>
                                    <div
                                        className='border rounded'
                                        style={{
                                            marginTop: '30px'
                                        }}
                                    >
                                        <h4
                                            className='text-center'
                                            style={{
                                                fontWeight: 'bold',
                                                margin: '15px'
                                            }}
                                        >
                                            <u>ข้อมูลข้อความทักเพื่อนใหม่</u>
                                        </h4>
                                        <div 
                                            className='row' 
                                            style={{
                                                margin: '10px'
                                            }}
                                        >
                                            <div className='card bg-white border rounded col m-1'>
                                                <div>
                                                    <div>
                                                        <h4 className='text-center' style={{ margin: '10px' }}>จำนวนผู้ใช้ที่ได้รับข้อความทักทาย</h4>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        justifyContent: 'center',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto'
                                                    }}
                                                >
                                                </div>
                                                <div
                                                    className='card bg-white border rounded'
                                                    style={{
                                                        justifyContent: 'center',
                                                        margin: '5px',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto',
                                                        width: '95%'
                                                    }}
                                                >
                                                    <Chart
                                                        options={options_urms}
                                                        series={series_urms}
                                                        type="area"
                                                        height={350}
                                                        width="100%"
                                                        style={{
                                                            margin: '20px',
                                                            alignItem: 'center'
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className='card bg-white border rounded col m-1'>
                                                <div>
                                                    <div>
                                                        <h4 className='text-center' style={{ margin: '10px' }}>จำนวนผู้ใช้ที่เปิดอ่าน</h4>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        justifyContent: 'center',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto'
                                                    }}
                                                >
                                                </div>
                                                <div
                                                    className='card bg-white border rounded'
                                                    style={{
                                                        justifyContent: 'center',
                                                        margin: '5px',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto',
                                                        width: '95%'
                                                    }}
                                                >
                                                    <Chart
                                                        options={options_uor}
                                                        series={series_uor}
                                                        type="area"
                                                        height={350}
                                                        width="100%"
                                                        style={{
                                                            margin: '20px',
                                                            alignItem: 'center'
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className='card bg-white border rounded col m-1'>
                                                <div>
                                                    <div>
                                                        <h4 className='text-center' style={{ margin: '10px' }}>อัตราการเปิดอ่าน</h4>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        justifyContent: 'center',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto'
                                                    }}
                                                >
                                                </div>
                                                <div
                                                    className='card bg-white border rounded'
                                                    style={{
                                                        justifyContent: 'center',
                                                        margin: '5px',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto',
                                                        width: '95%'
                                                    }}
                                                >
                                                    <Chart
                                                        options={options_ror}
                                                        series={series_ror}
                                                        type="area"
                                                        height={350}
                                                        width="100%"
                                                        style={{
                                                            margin: '20px',
                                                            alignItem: 'center'
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        <div className='row' style={{ margin: '10px' }}>
                                            <div className='card bg-white border rounded col m-1'>
                                                <div>
                                                    <div>
                                                        <h4 className='text-center' style={{ margin: '10px' }}>จำนวนผู้ใช้ที่คลิกข้อความ</h4>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        justifyContent: 'center',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto'
                                                    }}
                                                >
                                                </div>
                                                <div
                                                    className='card bg-white border rounded'
                                                    style={{
                                                        justifyContent: 'center',
                                                        margin: '5px',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto',
                                                        width: '95%'
                                                    }}
                                                >
                                                    <Chart
                                                        options={options_ucm}
                                                        series={series_ucm}
                                                        type="area"
                                                        height={350}
                                                        width="100%"
                                                        style={{
                                                            margin: '20px',
                                                            alignItem: 'center'
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className='card bg-white border rounded col m-1'>
                                                <div>
                                                    <div>
                                                        <h4 className='text-center' style={{ margin: '10px' }}>อัตราการคลิกข้อความ</h4>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        justifyContent: 'center',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto'
                                                    }}
                                                >
                                                </div>
                                                <div
                                                    className='card bg-white border rounded'
                                                    style={{
                                                        justifyContent: 'center',
                                                        margin: '5px',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto',
                                                        width: '95%'
                                                    }}
                                                >
                                                    <Chart
                                                        options={options_rucm}
                                                        series={series_rucm}
                                                        type="area"
                                                        height={350}
                                                        width="100%"
                                                        style={{
                                                            margin: '20px',
                                                            alignItem: 'center'
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className='col m-1'></div>

                                        </div>
                                    </div>

                                </>
                        }

                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default SendMessageNewFriend