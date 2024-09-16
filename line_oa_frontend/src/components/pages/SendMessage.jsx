import React, { useEffect, useState } from 'react'
import { Layout, theme, DatePicker } from 'antd'
import Sidebar from '../layout/Sidebar'
import Headers from '../layout/Headers'
import dayjs from 'dayjs'
import "dayjs/locale/th"
import buddhistEra from 'dayjs/plugin/buddhistEra'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUsersViewfinder,
    faWindowMaximize,
    faHandPointer, faClock, faHeart,
    faMessage,
    faTowerBroadcast,
    faReply,
    faShareAlt
} from '@fortawesome/free-solid-svg-icons'
import { getMessageAlldata, getSumMessageData } from '../Functions/AllMessage'
import Chart from 'react-apexcharts';
import { LoadingOutlined } from '@ant-design/icons'

dayjs.extend(buddhistEra);
const { Content } = Layout;
const { RangePicker } = DatePicker;

function SendMessage() {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingSum, setLoadingSum] = useState(false)
    const [sumMessageData, setSumMessageData] = useState([])
    const [allMessageData1, setAllMessageData1] = useState([])
    const [searchQuery1, setSearchQuery1] = useState([])
    const [searchQuery2, setSearchQuery2] = useState([])
    const [searchQuery3, setSearchQuery3] = useState([])
    const [searchQuery4, setSearchQuery4] = useState([])
    const [searchQuery5, setSearchQuery5] = useState([])
    const [searchQuery6, setSearchQuery6] = useState([])
    const [searchQuery7, setSearchQuery7] = useState([])

    //Sum Message Data
    useEffect(() => {
        setLoadingSum(true)
        getSumMessageData()
            .then(res => {
                console.log(res.data)
                setSumMessageData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoadingSum(false))
    }, [])

    const messages = sumMessageData.map((item) => parseInt(item.messages))
    const friend_broadcast = sumMessageData.map((item) => parseInt(item.friend_broadcast))
    const target_broadcast = sumMessageData.map((item) => parseInt(item.target_broadcast))
    const first_message_for_first_using = sumMessageData.map((item) => parseInt(item.first_message_for_first_using))
    const push = sumMessageData.map((item) => parseInt(item.push))
    const multicast = sumMessageData.map((item) => parseInt(item.multicast))
    const reply = sumMessageData.map((item) => parseInt(item.reply))

    //All message data
    useEffect(() => {
        setLoading(true)
        getMessageAlldata()
            .then(res => {
                setAllMessageData1(res.data)
                setSearchQuery1(res.data)
                setSearchQuery2(res.data)
                setSearchQuery3(res.data)
                setSearchQuery4(res.data)
                setSearchQuery5(res.data)
                setSearchQuery6(res.data)
                setSearchQuery7(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }, [])

    const handleFilter1 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery1(allMessageData1.filter(f => f.sm_date >= startDate && f.sm_date <= endDate))
    }

    const handleFilter2 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery2(allMessageData1.filter(f => f.sm_date >= startDate && f.sm_date <= endDate))
    }

    const handleFilter3 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery3(allMessageData1.filter(f => f.sm_date >= startDate && f.sm_date <= endDate))
    }

    const handleFilter4 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery4(allMessageData1.filter(f => f.sm_date >= startDate && f.sm_date <= endDate))
    }

    const handleFilter5 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery5(allMessageData1.filter(f => f.sm_date >= startDate && f.sm_date <= endDate))
    }

    const handleFilter6 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery6(allMessageData1.filter(f => f.sm_date >= startDate && f.sm_date <= endDate))
    }

    const handleFilter7 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery7(allMessageData1.filter(f => f.sm_date >= startDate && f.sm_date <= endDate))
    }

    const sm_date1 = searchQuery1.map((item) => dayjs(item.sm_date).locale('th').format('DD MMM BB'))
    const sm_date2 = searchQuery2.map((item) => dayjs(item.sm_date).locale('th').format('DD MMM BB'))
    const sm_date3 = searchQuery3.map((item) => dayjs(item.sm_date).locale('th').format('DD MMM BB'))
    const sm_date4 = searchQuery4.map((item) => dayjs(item.sm_date).locale('th').format('DD MMM BB'))
    const sm_date5 = searchQuery5.map((item) => dayjs(item.sm_date).locale('th').format('DD MMM BB'))
    const sm_date6 = searchQuery6.map((item) => dayjs(item.sm_date).locale('th').format('DD MMM BB'))
    const sm_date7 = searchQuery7.map((item) => dayjs(item.sm_date).locale('th').format('DD MMM BB'))
    const sm_messages = searchQuery1.map((item) => parseInt(item.messages))
    const sm_friend_broadcast = searchQuery2.map((item) => parseInt(item.friend_broadcast))
    const sm_target_broadcast = searchQuery3.map((item) => parseInt(item.target_broadcast))
    const sm_first_message_for_first_using = searchQuery4.map((item) => parseInt(item.first_message_for_first_using))
    const sm_push = searchQuery5.map((item) => parseInt(item.push))
    const sm_multicast = searchQuery6.map((item) => parseInt(item.multicast))
    const sm_reply = searchQuery7.map((item) => parseInt(item.reply))

    //message
    const options_ms = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: sm_date1,
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
    const series_ms = [
        {
            name: "ข้อความ",
            data: sm_messages,
        }
    ]

    //total broadcast
    const options_tbc = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: sm_date2,
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
    const series_tbc = [
        {
            name: "Message Broadcast",
            data: sm_friend_broadcast,
        }
    ]

    //target broadcast
    const options_mbc = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: sm_date3,
        },
        colors: ['#f9c411'],
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
    const series_mbc = [
        {
            name: "Target Broadcast",
            data: sm_target_broadcast,
        }
    ]

    //Auto send message
    const options_auts = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: sm_date4,
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
    const series_auts = [
        {
            name: "Auto Message",
            data: sm_first_message_for_first_using,
        }
    ]

    //Push
    const options_push = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: sm_date5,
        },
        colors: ['#c462f8'],
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
    const series_push = [
        {
            name: "Push",
            data: sm_push,
        }
    ]

    //Multicast
    const options_mtc = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: sm_date6,
        },
        colors: ['#ac8854'],
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
    const series_mtc = [
        {
            name: "Multicast",
            data: sm_multicast,
        }
    ]

    //Reply
    const options_rp = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: sm_date7,
        },
        colors: ['#abb2b9'],
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
    const series_rp = [
        {
            name: "Reply",
            data: sm_reply,
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
                        <h3 className='text-center'>สถิติการส่งข้อความบน Line OA หมอพร้อม</h3>
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
                                                <FontAwesomeIcon icon={faMessage} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Total Message
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#39a32b', }}
                                        >
                                            {messages.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <FontAwesomeIcon icon={faTowerBroadcast} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Total Broadcast
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#11c8f9', }}
                                        >
                                            {friend_broadcast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <FontAwesomeIcon icon={faUsersViewfinder} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Target Broadcast
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#f9c411', }}
                                        >
                                            {target_broadcast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <FontAwesomeIcon icon={faClock} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Auto Message
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#e4477d', }}
                                        >
                                            {first_message_for_first_using.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <FontAwesomeIcon icon={faHandPointer} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Push
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#c462f8', }}
                                        >
                                            {push.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                            borderColor: '#ac8854'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div
                                                style={{
                                                    border: '1px solid #ac8854',
                                                    borderRadius: '50%',
                                                    width: '40px',
                                                    height: '40px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#ac8854',
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faShareAlt} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Multicast
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#ac8854', }}
                                        >
                                            {multicast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                            borderColor: '#abb2b9'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div
                                                style={{
                                                    border: '1px solid #abb2b9',
                                                    borderRadius: '50%',
                                                    width: '40px',
                                                    height: '40px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#abb2b9',
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faReply} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Reply
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#abb2b9', }}
                                        >
                                            {reply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>ข้อความที่ถูกส่งทั้งหมด</h4>
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
                                                    options={options_ms}
                                                    series={series_ms}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>การส่งข้อความแบบบรอดแคสต์ (เพื่อนทั้งหมด)</h4>
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
                                                    options={options_tbc}
                                                    series={series_tbc}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>การส่งข้อความแบบบรอดแคสต์ไปยังกลุ่มเป้าหมายที่กำหนดไว้ล่วงหน้า (ระบุกลุ่มเป้าหมาย)</h4>
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
                                                    options={options_mbc}
                                                    series={series_mbc}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>ข้อความอัตโนมัติที่ถูกส่งไปยังผู้ใช้เมื่อผู้ใช้เริ่มแชทครั้งแรกกับบัญชี LINE</h4>
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
                                                    options={options_auts}
                                                    series={series_auts}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>การส่งข้อความแบบพุช (Push)</h4>
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
                                                    options={options_push}
                                                    series={series_push}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>การส่งข้อความหลากหลายผู้ใช้ (Multicast)</h4>
                                                </div>
                                                <div style={{ marginRight: '40px', float: 'right' }}>
                                                    <strong>ค้นหาตามช่วงเวลา : </strong> <RangePicker onChange={handleFilter6} allowClear={true} />
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
                                                    options={options_mtc}
                                                    series={series_mtc}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>ข้อมูลที่ถูกส่งกลับไปยังผู้ใช้เมื่อผู้ใช้ส่งข้อความมาหาบัญชี LINE (Reply)</h4>
                                                </div>
                                                <div style={{ marginRight: '40px', float: 'right' }}>
                                                    <strong>ค้นหาตามช่วงเวลา : </strong> <RangePicker onChange={handleFilter7} allowClear={true} />
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
                                                    options={options_rp}
                                                    series={series_rp}
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

export default SendMessage