import React, { useEffect, useState } from 'react'
import { Layout, theme, DatePicker, Button } from 'antd'
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons'
import Sidebar from '../layout/Sidebar'
import Headers from '../layout/Headers'
import dayjs from 'dayjs'
import "dayjs/locale/th"
import buddhistEra from 'dayjs/plugin/buddhistEra'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUsersViewfinder,
    faWindowMaximize,
    faHandPointer, faClock, faHeart
} from '@fortawesome/free-solid-svg-icons'
import { getAllLiffData, getLiffUsers, getAllLiffUsers } from '../Functions/Liff';
import Chart from 'react-apexcharts';
import { CSVLink } from 'react-csv'


dayjs.extend(buddhistEra);
const { Content } = Layout;
const { RangePicker } = DatePicker;

function Liif() {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [loading, setLoading] = useState(false)
    const [collapsed, setCollapsed] = useState(false)
    const [liffUsers, setLiffUsers] = useState([])
    const [allLiffUsers, setAllLiffUsers] = useState([])
    const [allLiffData1, setAllLiffData1] = useState([])
    const [searchQuery1, setSearchQuery1] = useState([])
    const [searchQuery2, setSearchQuery2] = useState([])
    const [searchQuery3, setSearchQuery3] = useState([])
    const [searchQuery4, setSearchQuery4] = useState([])
    const [searchQuery5, setSearchQuery5] = useState([])
    const [searchQuery6, setSearchQuery6] = useState([])
    const [searchQueryLiff, setSearchQueryLiff] = useState([])

    //Data user page view
    useEffect(() => {
        setLoading(true)
        getAllLiffData()
            .then(res => {
                setAllLiffData1(res.data)
                setSearchQuery1(res.data)
                setSearchQuery2(res.data)
                setSearchQuery3(res.data)
                setSearchQuery4(res.data)
                setSearchQuery5(res.data)
                setSearchQuery6(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }, [])


    //Liff User
    useEffect(() => {
        //Code
        getLiffUsers()
            .then(res => {
                setLiffUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    //AllLiff User
    useEffect(() => {
        //Code
        getAllLiffUsers()
            .then(res => {
                setAllLiffUsers(res.data)
                setSearchQueryLiff(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const handleFilter1 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery1(allLiffData1.filter(f => f.ld_date >= startDate && f.ld_date <= endDate))
    }

    const handleFilter2 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery2(allLiffData1.filter(f => f.ld_date >= startDate && f.ld_date <= endDate))
    }

    const handleFilter3 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery3(allLiffData1.filter(f => f.ld_date >= startDate && f.ld_date <= endDate))
    }

    const handleFilter4 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery4(allLiffData1.filter(f => f.ld_date >= startDate && f.ld_date <= endDate))
    }

    const handleFilter5 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery5(allLiffData1.filter(f => f.ld_date >= startDate && f.ld_date <= endDate))
    }

    const handleFilter6 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery6(allLiffData1.filter(f => f.ld_date >= startDate && f.ld_date <= endDate))
    }

    const sumTotalUserPageView = allLiffData1.map((aupv) => parseInt(aupv.total_user_page_view)).reduce((a, b) => a + b, 0)
    const sumTotalUserFirstVisit = allLiffData1.map((aufv) => parseInt(aufv.total_user_first_visit)).reduce((a, b) => a + b, 0)
    const sumTotalEventPageView = allLiffData1.map((aepv) => parseInt(aepv.total_event_page_view)).reduce((a, b) => a + b, 0)
    const sumTotalEventScroll = allLiffData1.map((esc) => parseInt(esc.total_event_scroll)).reduce((a, b) => a + b, 0)
    const sumTotalSessionStart = allLiffData1.map((asst) => parseInt(asst.total_event_session_start)).reduce((a, b) => a + b, 0)
    const sumTotalUserEngagement = allLiffData1.map((aueg) => parseInt(aueg.total_event_user_engagement)).reduce((a, b) => a + b, 0)

    const liffDate1 = searchQuery1.map((ld) => dayjs(ld.ld_date).locale('th').format('DD MMM BB'))
    const liffDate2 = searchQuery2.map((ld) => dayjs(ld.ld_date).locale('th').format('DD MMM BB'))
    const liffDate3 = searchQuery3.map((ld) => dayjs(ld.ld_date).locale('th').format('DD MMM BB'))
    const liffDate4 = searchQuery4.map((ld) => dayjs(ld.ld_date).locale('th').format('DD MMM BB'))
    const liffDate5 = searchQuery5.map((ld) => dayjs(ld.ld_date).locale('th').format('DD MMM BB'))
    const liffDate6 = searchQuery6.map((ld) => dayjs(ld.ld_date).locale('th').format('DD MMM BB'))


    const liffUserPageView = searchQuery1.map((item) => parseInt(item.total_user_page_view))
    const liffUserFirstVisit = searchQuery2.map((item) => parseInt(item.total_user_first_visit))
    const liffEventPageView = searchQuery3.map((item) => parseInt(item.total_event_page_view))
    const liffEventScroll = searchQuery4.map((item) => parseInt(item.total_event_scroll))
    const liffEventSessionStart = searchQuery5.map((item) => parseInt(item.total_event_session_start))
    const liffEventUserEngagement = searchQuery6.map((item) => parseInt(item.total_event_user_engagement))


    //Liff Users
    const m_liff = liffUsers.map((item) => dayjs(item.m_liff).locale('th').format('MMM BB'))
    const w_liff = liffUsers.map((item) => item.w_liff)
    const u_liff = liffUsers.map((item) => parseInt(item.u_liff))
    const total_u_liff = liffUsers.map((item) => parseInt(item.u_liff)).reduce((a, b) => a + b, 0)

    const handleFilterLiff = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQueryLiff(allLiffUsers.filter(f => f.d_liff >= startDate && f.d_liff <= endDate))
    }

    const d_liff_user = searchQueryLiff.map((item) => dayjs(item.d_liff).locale('th').format('DD MMM BB'))
    const liff_user = searchQueryLiff.map((item) => parseInt(item.u_liff))


    //user page view
    const options_lupv = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: w_liff,
            group: {
                style: {
                    fontWeight: 700
                },
                groups: [
                    { title: 'ม.ค.67', cols: 5 },
                    { title: 'ก.พ.67', cols: 5 },
                    { title: 'มี.ค.67', cols: 6 },
                    { title: 'เม.ย.67', cols: 5 },
                    { title: 'พ.ค.67', cols: 5 },
                    { title: 'มิ.ย.67', cols: 6 },
                    { title: 'ก.ค.67', cols: 7 }
                ]
            }
        },
        colors: ['#39a32b'],
        plotOptions: {
            bar: {
                columnWidth: '60%',
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'ผู้ใช้งาน',
            align: 'left'
        },
        tooltip: {
            x: {
                formatter: function (val) {
                    return 'สัปดาห์ที่ ' + val
                }
            }
        }
    }
    const series_lupv = [
        {
            name: "จำนวนผู้ใช้ Liff",
            data: u_liff
        }
    ]


    //All liff user daily
    const options_lu = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: d_liff_user,
        },
        colors: ['#39a32b'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'ผู้ใช้งาน',
            align: 'left'
        }
    }
    const series_lu = [
        {
            name: "จำนวนผู้ใช้ที่อยู่หน้า Liff รายวัน",
            data: liff_user,
        }
    ]


    //user first visit
    const options_fvs = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: liffDate2,
        },
        colors: ['#11c8f9'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'จำนวนผู้ใช้งาน',
            align: 'left'
        }
    }
    const series_fvs = [
        {
            name: "จำนวนผู้ใช้ Liff first visit",
            data: liffUserFirstVisit,
        }
    ]

    //event page view
    const options_epv = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: liffDate3,
        },
        colors: ['#f9c411'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'จำนวนครั้ง',
            align: 'left'
        }
    }
    const series_epv = [
        {
            name: "จำนวนครั้ง Page view",
            data: liffEventPageView,
        }
    ]

    //event scroll
    const options_esc = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: liffDate4,
        },
        colors: ['#e4477d'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'จำนวนครั้ง',
            align: 'left'
        }
    }
    const series_esc = [
        {
            name: "จำนวนครั้ง Scroll",
            data: liffEventScroll,
        }
    ]

    //event session start
    const options_esst = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: liffDate5,
        },
        colors: ['#c462f8'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'จำนวนครั้ง',
            align: 'left'
        }
    }
    const series_esst = [
        {
            name: "จำนวนครั้ง Session start",
            data: liffEventSessionStart,
        }
    ]

    //event session start
    const options_euen = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: liffDate6,
        },
        colors: ['#ac8854'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'จำนวนครั้ง',
            align: 'left'
        }
    }
    const series_euen = [
        {
            name: "จำนวนครั้ง User engagement",
            data: liffEventUserEngagement,
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
                        <h3 className='text-center'>สถิติการใช้งาน LIFF (Line Front-end Framework)</h3>
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
                                                <FontAwesomeIcon icon={faUsersViewfinder} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', marginTop: '10px' }}
                                        >
                                            ผู้ใช้ที่ใช้งานอยู่ที่หน้า LIFF
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#39a32b', }}
                                        >
                                            {total_u_liff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <FontAwesomeIcon icon={faUsersViewfinder} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', marginTop: '10px' }}
                                        >
                                            ผู้ใช้ที่เข้าหน้า LIFF ครั้งแรก
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#11c8f9', }}
                                        >
                                            {sumTotalUserFirstVisit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <FontAwesomeIcon icon={faWindowMaximize} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', marginTop: '10px' }}
                                        >
                                            จำนวนครั้งที่เข้าหน้า LIFF
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#f9c411', }}
                                        >
                                            {sumTotalEventPageView.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                            style={{ fontWeight: 'bold', marginTop: '10px' }}
                                        >
                                            การเลื่อนหน้า (Scroll) LIFF
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#e4477d', }}
                                        >
                                            {sumTotalEventScroll.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <FontAwesomeIcon icon={faClock} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', marginTop: '10px' }}
                                        >
                                            การเริ่มต้นเข้าหน้า LIFF
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#c462f8', }}
                                        >
                                            {sumTotalSessionStart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <FontAwesomeIcon icon={faHeart} style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', marginTop: '10px' }}
                                        >
                                            การมีส่วนร่วมของผู้ใช้
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#ac8854', }}
                                        >
                                            {sumTotalUserEngagement.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                    {/* <div className='row' style={{ margin: '10px' }}>
                                        <div className='card bg-white border rounded col m-1'>
                                            <div>
                                                <div>
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนผู้ใช้งานที่เข้าถึง LIFF (Line Front-end Framework) รายสัปดาห์</h4>
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
                                                    options={options_lupv}
                                                    series={series_lupv}
                                                    type="bar"
                                                    height={400}
                                                    width="100%"
                                                    style={{
                                                        margin: '20px',
                                                        alignItem: 'center'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className='row' style={{ margin: '10px' }}>
                                        <div className='card bg-white border rounded col m-1'>
                                            <div>
                                                <div>
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนผู้ใช้งานที่เข้าถึง LIFF (Line Front-end Framework) รายวัน</h4>
                                                </div>
                                                <div style={{ marginRight: '40px', float: 'right' }}>
                                                    <strong>ค้นหาตามช่วงเวลา : </strong> <RangePicker onChange={handleFilterLiff} allowClear={true} />
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
                                                    options={options_lu}
                                                    series={series_lu}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนผู้ใช้ที่เยี่ยมชมเป็นครั้งแรกที่เข้าหน้า LIFF (First Visit)</h4>
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
                                                    options={options_fvs}
                                                    series={series_fvs}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนครั้งการดูหน้าเว็บที่เข้าหน้า LIFF ของเว็บหมอพร้อมบนไลน์ (Page View)</h4>
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
                                                    options={options_epv}
                                                    series={series_epv}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนครั้งการเลื่อนหน้าเว็บที่เข้าหน้า LIFF ของเว็บหมอพร้อมบนไลน์ (Scroll)</h4>
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
                                                    options={options_esc}
                                                    series={series_esc}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนครั้งการเริ่มต้นการเข้าชมเว็บที่เข้าหน้า LIFF ของเว็บหมอพร้อมบนไลน์ (Session Start)</h4>
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
                                                    options={options_esst}
                                                    series={series_esst}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนครั้งการมีส่วนร่วมของผู้ใช้ที่เข้าหน้า LIFF ของเว็บหมอพร้อมบนไลน์ (User Engagement)</h4>
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
                                                    options={options_euen}
                                                    series={series_euen}
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

export default Liif