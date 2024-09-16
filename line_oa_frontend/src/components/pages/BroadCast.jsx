import React, { useEffect, useState } from 'react'
import { Layout, theme, DatePicker } from 'antd'
import Sidebar from '../layout/Sidebar'
import Headers from '../layout/Headers'
import dayjs from 'dayjs'
import "dayjs/locale/th"
import buddhistEra from 'dayjs/plugin/buddhistEra'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHandPointer
} from '@fortawesome/free-solid-svg-icons'
import { getAllBroadcast, getSumBroadcast } from '../Functions/Broadcast'
import Chart from 'react-apexcharts';
import { LoadingOutlined, MobileOutlined, PlayCircleOutlined, SendOutlined } from '@ant-design/icons'
import { faFileVideo } from '@fortawesome/free-regular-svg-icons'


dayjs.extend(buddhistEra);
const { Content } = Layout;
const { RangePicker } = DatePicker;

function BroadCast() {
    const [collapsed, setCollapsed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [allBroadcast, setAllBroadcast] = useState([])
    const [sumBroadcast, setSumBroadcast] = useState([])
    const [searchQuery1, setSearchQuery1] = useState([])
    const [searchQuery2, setSearchQuery2] = useState([])
    const [searchQuery3, setSearchQuery3] = useState([])
    const [searchQuery4, setSearchQuery4] = useState([])
    const [searchQuery5, setSearchQuery5] = useState([])

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    //Sum Broadcast 
    useEffect(() => {
        getSumBroadcast()
            .then(res => {
                setSumBroadcast(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const sum_send_broadcast = sumBroadcast.map((item) => parseInt(item.send_broadcast))
    const sum_open_broadcast = sumBroadcast.map((item) => parseInt(item.open_broadcast))
    const sum_user_click = sumBroadcast.map((item) => parseInt(item.user_click))
    const sum_user_watch = sumBroadcast.map((item) => parseInt(item.user_watch))
    const sum_user_watch_end = sumBroadcast.map((item) => parseInt(item.user_watch_end))

    //All Broadcast
    useEffect(() => {
        setLoading(true)
        getAllBroadcast()
            .then(res => {
                setAllBroadcast(res.data)
                setSearchQuery1(res.data)
                setSearchQuery2(res.data)
                setSearchQuery3(res.data)
                setSearchQuery4(res.data)
                setSearchQuery5(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }, [])


    const handleFilter1 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery1(allBroadcast.filter(f => f.date_send >= startDate && f.date_send <= endDate))
    }


    const handleFilter2 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery2(allBroadcast.filter(f => f.date_send >= startDate && f.date_send <= endDate))
    }

    const handleFilter3 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery3(allBroadcast.filter(f => f.date_send >= startDate && f.date_send <= endDate))
    }

    const handleFilter4 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery4(allBroadcast.filter(f => f.date_send >= startDate && f.date_send <= endDate))
    }

    const handleFilter5 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery5(allBroadcast.filter(f => f.date_send >= startDate && f.date_send <= endDate))
    }


    const date_send1 = searchQuery1.map((item) => dayjs(item.date_send).locale('th').format('DD MMM BB'))
    const date_send2 = searchQuery2.map((item) => dayjs(item.date_send).locale('th').format('DD MMM BB'))
    const date_send3 = searchQuery3.map((item) => dayjs(item.date_send).locale('th').format('DD MMM BB'))
    const date_send4 = searchQuery4.map((item) => dayjs(item.date_send).locale('th').format('DD MMM BB'))
    const date_send5 = searchQuery5.map((item) => dayjs(item.date_send).locale('th').format('DD MMM BB'))
    const send_broadcast = searchQuery1.map((item) => parseInt(item.send_broadcast))
    const open_broadcast = searchQuery2.map((item) => parseInt(item.open_broadcast))
    const user_click = searchQuery3.map((item) => parseInt(item.user_click))
    const user_watch = searchQuery4.map((item) => parseInt(item.user_watch))
    const user_watch_end = searchQuery5.map((item) => parseInt(item.user_watch_end))


    //Send Broadcast
    const options_sbc = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: date_send1,
        },
        colors: ['#39a32b'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Broradcast',
            align: 'left'
        }
    }
    const series_sbc = [
        {
            name: "Send Broadcast",
            data: send_broadcast,
        }
    ]

    //Open broadcast
    const options_obc = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: date_send2,
        },
        colors: ['#11c8f9'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Broadcast',
            align: 'left'
        }
    }
    const series_obc = [
        {
            name: "Open Broadcast",
            data: open_broadcast,
        }
    ]

    //User Click
    const options_usc = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: date_send3,
        },
        colors: ['#f9c411'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'User',
            align: 'left'
        }
    }
    const series_usc = [
        {
            name: "User Click",
            data: user_click,
        }
    ]

    //User Watch
    const options_usw = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: date_send4,
        },
        colors: ['#e4477d'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'User',
            align: 'left'
        }
    }
    const series_usw = [
        {
            name: "User Watch",
            data: user_watch,
        }
    ]

    //User Watch End
    const options_uswe = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: date_send5,
        },
        colors: ['#c462f8'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'User',
            align: 'left'
        }
    }
    const series_uswe = [
        {
            name: "User Watch End",
            data: user_watch_end,
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
                        <h3 className='text-center'>สถิติการส่งบรอดแคสต์ (Broadcast)</h3>
                        <h6 className='text-center'>ข้อมูลรหะว่างเดือนมกราคม ถีง กรกฎาคม ปี พ.ศ. 2567</h6>

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
                                                <SendOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Send Broadcast
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#39a32b', }}
                                        >
                                            {sum_send_broadcast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <MobileOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Open Broadcast
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#11c8f9', }}
                                        >
                                            {sum_open_broadcast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <FontAwesomeIcon icon={faHandPointer} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            User Click
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#f9c411', }}
                                        >
                                            {sum_user_click.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <PlayCircleOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            User Watch
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#e4477d', }}
                                        >
                                            {sum_user_watch.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <FontAwesomeIcon icon={faFileVideo} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            User Watch End
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#c462f8', }}
                                        >
                                            {sum_user_watch_end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                    <div className='row' style={{ margin: '10px' }}>
                                        <div className='card bg-white border rounded col m-1'>
                                            <div>
                                                <div>
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนส่งโพส/วิดีโอบรอดแคสต์</h4>
                                                </div>
                                                <div style={{ marginRight: '40px', float: 'right' }}>
                                                    <strong>ค้นหาตามช่วงเวลา : </strong> <RangePicker onChange={handleFilter1} allowClear={true} />
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
                                                    options={options_sbc}
                                                    series={series_sbc}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนการเปิดโพส/วิดีโอบรอดแคสต์</h4>
                                                </div>
                                                <div style={{ marginRight: '40px', float: 'right' }}>
                                                    <strong>ค้นหาตามช่วงเวลา : </strong> <RangePicker onChange={handleFilter2} allowClear={true} />
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
                                                    options={options_obc}
                                                    series={series_obc}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>ผู้ใช้ที่คลิกโพส/วิดีโอบรอดแคสต์</h4>
                                                </div>
                                                <div style={{ marginRight: '40px', float: 'right' }}>
                                                    <strong>ค้นหาตามช่วงเวลา : </strong> <RangePicker onChange={handleFilter3} allowClear={true} />
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
                                                    options={options_usc}
                                                    series={series_usc}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>ผู้ใช้ที่เริ่มดูวิดีโอบรอดแคสต์</h4>
                                                </div>
                                                <div style={{ marginRight: '40px', float: 'right' }}>
                                                    <strong>ค้นหาตามช่วงเวลา : </strong> <RangePicker onChange={handleFilter4} allowClear={true} />
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
                                                    options={options_usw}
                                                    series={series_usw}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>ผู้ใช้ที่ดูวิดีโอบรอดแคสต์จนจบ</h4>
                                                </div>
                                                <div style={{ marginRight: '40px', float: 'right' }}>
                                                    <strong>ค้นหาตามช่วงเวลา : </strong> <RangePicker onChange={handleFilter5} allowClear={true} />
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
                                                    options={options_uswe}
                                                    series={series_uswe}
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

export default BroadCast