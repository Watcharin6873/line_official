import React, { useEffect, useState } from 'react'
import { Layout, theme, DatePicker } from 'antd'
import Sidebar from '../layout/Sidebar'
import Headers from '../layout/Headers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointer } from '@fortawesome/free-solid-svg-icons'
import { AppstoreOutlined, LoadingOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import "dayjs/locale/th"
import buddhistEra from 'dayjs/plugin/buddhistEra'
import Chart from 'react-apexcharts';
import {
    getAllLineVoom,
    getMonthLineVoom,
    getTotalLineVoom
} from '../Functions/LineVoom'
import { AccessTime, MoreTime, Videocam } from '@mui/icons-material'


dayjs.extend(buddhistEra);
const { Content } = Layout;
const { RangePicker } = DatePicker;

function LineVoom() {
    const [collapsed, setCollapsed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [allDataLineVoom, setAllDataLineVoom] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [monthDataLineVoom, setMonthDataLineVoom] = useState([])
    const [totalDataLineVoom, setTotalDataLineVoom] = useState([])

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    //Total Line voom
    useEffect(() => {
        //Code
        getTotalLineVoom()
            .then(res => {
                setTotalDataLineVoom(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const total_impression = totalDataLineVoom.map((item) => parseInt(item.impression))
    const total_avg_impression = totalDataLineVoom.map((item) => parseFloat(item.avg_impression))
    const total_click = totalDataLineVoom.map((item) => parseInt(item.click))
    const total_avg_click = totalDataLineVoom.map((item) => parseFloat(item.avg_click))
    const total_watch_vdo_3sec_or_more = totalDataLineVoom.map((item) => parseInt(item.watch_vdo_3sec_or_more))
    const total_avg_watch_vdo_sec = totalDataLineVoom.map((item) => parseFloat(item.avg_watch_vdo_sec))
    const total_watch_vdo_hour = totalDataLineVoom.map((item) => parseInt(item.total_watch_vdo_hour))


    //All data line voom
    useEffect(() => {
        //Code
        getAllLineVoom()
            .then(res => {
                setAllDataLineVoom(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    //Month data line voom
    useEffect(() => {
        //Code
        getMonthLineVoom()
            .then(res => {
                setMonthDataLineVoom(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })

    const m_post = monthDataLineVoom.map((item) => dayjs(item.m_post).locale('th').format('MMM BB'))
    const impression = monthDataLineVoom.map((item) => parseInt(item.impression))
    const avg_impression = monthDataLineVoom.map((item) => parseFloat(item.avg_impression))
    const click = monthDataLineVoom.map((item) => parseInt(item.click))
    const avg_click = monthDataLineVoom.map((item) => parseFloat(item.avg_click))
    const watch_vdo_3sec_or_more = monthDataLineVoom.map((item) => parseInt(item.watch_vdo_3sec_or_more))
    const avg_watch_vdo_sec = monthDataLineVoom.map((item) => parseFloat(item.avg_watch_vdo_sec))
    const watch_vdo_hour = monthDataLineVoom.map((item) => parseInt(item.total_watch_vdo_hour))


    //IMPRESSION
    const options_imp = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_post,
        },
        colors: ['#39a32b'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'ครั้ง',
            align: 'left'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
    }
    const series_imp = [
        {
            name: "อิมเพรชชัน",
            data: impression,
        }
    ]


    //AVG_IMPRESSION
    const options_avg_imp = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_post,
        },
        colors: ['#11c8f9'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'ครั้ง',
            align: 'left'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
    }
    const series_avg_imp = [
        {
            name: "ค่าเฉลี่ยอิมเพรชชัน",
            data: avg_impression,
        }
    ]


    //CLICK
    const options_clk = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_post,
        },
        colors: ['#f9c411'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'ครั้ง',
            align: 'left'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
    }
    const series_clk = [
        {
            name: "จำนวนการคลิก",
            data: click,
        }
    ]

    //AVG_CLICK
    const options_avg_clk = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_post,
        },
        colors: ['#e4477d'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'ครั้ง',
            align: 'left'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
    }
    const series_avg_clk = [
        {
            name: "ค่าเฉลี่ยการคลิก",
            data: avg_click,
        }
    ]

    //Watch_video_3sec_or_more
    const options_3sec_or_more = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_post,
        },
        colors: ['#c462f8'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'ครั้ง',
            align: 'left'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
    }
    const series_3sec_or_more = [
        {
            name: "ดูวิดีโอ 3 วินาทีขึ้นไป",
            data: watch_vdo_3sec_or_more,
        }
    ]

    //AVG_WATCH_VIDEO_SEC
    const options_avg_watch_vdo_sec = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_post,
        },
        colors: ['#ac8854'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'วินาที',
            align: 'left'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
    }
    const series_avg_watch_vdo_sec = [
        {
            name: "เวลาเฉลี่ยดูวิดีโอ",
            data: avg_watch_vdo_sec,
        }
    ]

    //WATCH_VDO_HOUR
    const options_watch_vdo_hour = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: m_post,
        },
        colors: ['#abb2b9'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'ชั่วโมง',
            align: 'left'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
    }
    const series_watch_vdo_hour = [
        {
            name: "รวมเวลาการดูวิดีโอ",
            data: watch_vdo_hour,
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

                        <h3 className='text-center'>สถิติข้อมูลการเข้าถึงโพสต์ใน LINE VOOM</h3>
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
                                                <AppstoreOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            จำนวนอิมเพรสชัน
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
                                                <AppstoreOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            ค่าเฉลี่ยอิมเพรสชัน
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#11c8f9', }}
                                        >
                                            {total_avg_impression.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                            จำนวนการคลิก
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#f9c411', }}
                                        >
                                            {total_click.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                            ค่าเฉลี่ยการคลิก
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#e4477d', }}
                                        >
                                            {total_avg_click.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <Videocam style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', marginTop: '10px' }}
                                        >
                                            ดูวิดีโอ 3 วินาทีขึ้นไป
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#c462f8', }}
                                        >
                                            {total_watch_vdo_3sec_or_more.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <AccessTime style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', marginTop: '10px' }}
                                        >
                                            เวลาเฉลี่ยการดูวิดีโอ (วิ)
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#ac8854', }}
                                        >
                                            {total_avg_watch_vdo_sec.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <MoreTime style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', marginTop: '10px' }}
                                        >
                                            รวมเวลาการดูวิดีโอ (ชม.)
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#abb2b9', }}
                                        >
                                            {total_watch_vdo_hour.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนอิมเพรสชัน</h4>
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
                                                    type="bar"
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>ค่าเฉลี่ยอิมเพรสชัน</h4>
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
                                                    options={options_avg_imp}
                                                    series={series_avg_imp}
                                                    type="bar"
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนการคลิก</h4>
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
                                                    options={options_clk}
                                                    series={series_clk}
                                                    type="bar"
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>ค่าเฉลี่ยการคลิก</h4>
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
                                                    options={options_avg_clk}
                                                    series={series_avg_clk}
                                                    type="bar"
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนครั้งในการดูวิดีโอตั้งแต่ 3 วินาทีขึ้นไป</h4>
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
                                                    options={options_3sec_or_more}
                                                    series={series_3sec_or_more}
                                                    type="bar"
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>เวลาเฉลี่ยการดูวิดีโอ (วินาที)</h4>
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
                                                    options={options_avg_watch_vdo_sec}
                                                    series={series_avg_watch_vdo_sec}
                                                    type="bar"
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>รวมเวลาการดูวิดีโอ (ชั่วโมง)</h4>
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
                                                    options={options_watch_vdo_hour}
                                                    series={series_watch_vdo_hour}
                                                    type="bar"
                                                    height={350}
                                                    width="100%"
                                                    style={{
                                                        margin: '20px',
                                                        alignItem: 'center'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className='bg-white col m-1'></div>
                                            

                                    </div>


                                </>
                        }

                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default LineVoom