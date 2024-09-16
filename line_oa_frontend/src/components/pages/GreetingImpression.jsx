import React, { useEffect, useState } from 'react'
import { Layout, theme, DatePicker } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUsersViewfinder,
    faHandPointer, faClock,
    faMessage,
    faTowerBroadcast,
    faSignal,
    faMobile
} from '@fortawesome/free-solid-svg-icons'
import { LoadingOutlined } from '@ant-design/icons'
import Sidebar from '../layout/Sidebar'
import Headers from '../layout/Headers'
import dayjs from 'dayjs'
import "dayjs/locale/th"
import buddhistEra from 'dayjs/plugin/buddhistEra'
import { getGreetingImpression, getSumGreetingImpression } from '../Functions/AllMessage'
import Chart from 'react-apexcharts';
import { faReadme } from '@fortawesome/free-brands-svg-icons'



dayjs.extend(buddhistEra);
const { Content } = Layout;

function GreetingImpression() {

    const [collapsed, setCollapsed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [greetingImpression, setGreetingImpression] = useState([])
    const [sumgreetingImpression, setSumgreetingImpression] = useState([])

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    useEffect(() => {
        setLoading(true)
        getGreetingImpression()
            .then(res => {
                setGreetingImpression(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }, [])

    const data1 = greetingImpression.filter(item => item.send_number == '1')
    const data2 = greetingImpression.filter(item => item.send_number == '2')
    console.log('data1 : ', data1)

    const m_data1 = data1.map((item) => dayjs(item.m_impression).locale('th').format('MMM BB'))
    const d1_impression = data1.map((item) => parseInt(item.impression))
    const d2_impression = data2.map((item) => parseInt(item.impression))
    const d1_impression_click = data1.map((item) => parseInt(item.impression_click))
    const d2_impression_click = data2.map((item) => parseInt(item.impression_click))
    const d1_rate_impression_click = data1.map((item) => parseFloat(item.rate_impression_click))
    const d2_rate_impression_click = data2.map((item) => parseFloat(item.rate_impression_click))
    const d1_impression_user_click = data1.map((item) => parseInt(item.impression_user_click))
    const d2_impression_user_click = data2.map((item) => parseInt(item.impression_user_click))


    useEffect(() => {
        getSumGreetingImpression()
            .then(res => {
                setSumgreetingImpression(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const total_impression = sumgreetingImpression.map((item) => parseInt(item.impression))
    const total_impression_click = sumgreetingImpression.map((item) => parseInt(item.impression_click))
    const total_rate_impression_click = sumgreetingImpression.map((item) => parseFloat(item.rate_impression_click))
    const total_impression_user_click = sumgreetingImpression.map((item) => parseInt(item.impression_user_click))

    //message
    const options_imp = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_data1,
        },
        colors: ['#39a32b', '#11c8f9'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Impression',
            align: 'left'
        }
    }
    const series_imp = [
        {
            name: "Impression Number1",
            data: d1_impression,
        },
        {
            name: "Impression Number2",
            data: d2_impression,
        }
    ]

    //total broadcast
    const options_impc = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_data1,
        },
        colors: ['#39a32b', '#11c8f9'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Impression',
            align: 'left'
        }
    }
    const series_impc = [
        {
            name: "Impression Click Number1",
            data: d1_impression_click,
        },
        {
            name: "Impression Click Number2",
            data: d2_impression_click,
        }
    ]

    //target broadcast
    const options_rimp = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_data1,
        },
        colors: ['#39a32b', '#11c8f9'],
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
    const series_rimp = [
        {
            name: "Rate Impression Number1",
            data: d1_rate_impression_click,
        },
        {
            name: "Rate Impression Number2",
            data: d2_rate_impression_click,
        }
    ]

    //Auto send message
    const options_imuc = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_data1,
        },
        colors: ['#39a32b', '#11c8f9'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Impression',
            align: 'left'
        }
    }
    const series_imuc = [
        {
            name: "Impresion User Click Number1",
            data: d1_impression_user_click
        },
        {
            name: "Impresion User Click Number2",
            data: d2_impression_user_click
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
                        <h3 className='text-center'>สถิติข้อมูล GREETING MESSAGE IMPRESSION</h3>
                        <h6 className='text-center'>ข้อมูลรหะว่างเดือนพฤษภาคม ถีง กรกฎาคม ปี พ.ศ. 2567</h6>

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
                                        จำนวนครั้งอิมเพรสชัน
                                    </h6>
                                    <h3
                                        className='text-center'
                                        style={{ fontWeight: 'bold', color: '#39a32b', }}
                                    >
                                        {total_impression.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                            <FontAwesomeIcon icon={faMobile} style={{ fontSize: '24px', color: '#fff' }} />
                                        </div>
                                    </div>
                                    <h6
                                        className='text-center'
                                        style={{ fontWeight: 'bold', margin: '10px' }}
                                    >
                                        จำนวนครั้งที่ผู้ใช้คลิกลิงก์
                                    </h6>
                                    <h3
                                        className='text-center'
                                        style={{ fontWeight: 'bold', color: '#11c8f9', }}
                                    >
                                        {total_impression_click.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                        อัตราการคลิกลิงก์
                                    </h6>
                                    <h3
                                        className='text-center'
                                        style={{ fontWeight: 'bold', color: '#f9c411', }}
                                    >
                                        {total_rate_impression_click}
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
                                        จำนวนผู้ใช้ที่คลิกลิงก์
                                    </h6>
                                    <h3
                                        className='text-center'
                                        style={{ fontWeight: 'bold', color: '#e4477d', }}
                                    >
                                        {total_impression_user_click.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {
                            loading
                                ?
                                <h1 className='text-center' style={{ marginTop: '30px' }}>Loading...<LoadingOutlined /></h1>
                                :
                                <>
                                    <div className='row' style={{ margin: '10px' }}>
                                        <div className='card bg-white border rounded col m-1'>
                                            <div>
                                                <div>
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนครั้งอิมเพรสชัน</h4>
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
                                                    options={options_imp}
                                                    series={series_imp}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนครั้งที่ผู้ใช้คลิกลิงก์</h4>
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
                                                    options={options_impc}
                                                    series={series_impc}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>อัตราการคลิกลิงก์</h4>
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
                                                    options={options_rimp}
                                                    series={series_rimp}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนผู้ใช้ที่คลิกลิงก์</h4>
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
                                                    options={options_imuc}
                                                    series={series_imuc}
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

                                </>
                        }


                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default GreetingImpression