import React, { useEffect, useState } from 'react'
import { Layout, theme, Table, Button, DatePicker, Row, Col } from 'antd'
import { BarsOutlined, BlockOutlined, DownloadOutlined, UserAddOutlined } from '@ant-design/icons'
import { CSVLink } from 'react-csv'
import Sidebar from '../layout/Sidebar'
import Headers from '../layout/Headers'
import dayjs from 'dayjs'
import "dayjs/locale/th"
import buddhistEra from 'dayjs/plugin/buddhistEra'
import {
    getAllLineFriends,
    getLastFriends,
    getSumBroadcast,
    getMonthLineFriends
} from '../Functions/LineFriends'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTowerBroadcast } from '@fortawesome/free-solid-svg-icons'
import Chart from 'react-apexcharts';


dayjs.extend(buddhistEra);
const { Content } = Layout;
const { RangePicker } = DatePicker;
const style = {
    background: '#0092ff',
    padding: '8px 0',
};

function UsingLine() {
    //Valiable
    const [collapsed, setCollapsed] = useState(false)
    const [loadingAllLineFriends, setLoadingAllLineFriends] = useState(false)
    const [allLineFriendData, setAllLineFriendData] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [sumBroadcast, setSumBroadcast] = useState([])
    const [lastRows, setLastRows] = useState([])
    const [monthLineFriends, setMonthLineFriends] = useState([])
    const [liffMonthData, setLiffMonthData] = useState([])

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    //Load AllLineFriends Data
    useEffect(() => {
        loadData1()
    }, [])

    const loadData1 = () => {
        setLoadingAllLineFriends(true)
        getAllLineFriends()
            .then(res => {
                setAllLineFriendData(res.data)
                setSearchQuery(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoadingAllLineFriends(false))
    }

    const handleFilter = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery(allLineFriendData.filter(f => f.date_ymd >= startDate && f.date_ymd <= endDate))
    }


    //Get last values
    useEffect(() => {
        getLastFriends()
            .then(res => {
                setLastRows(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const contacts = lastRows.map((l) => l.contacts)
    const targetReaches = lastRows.map((tr) => tr.targetReaches)
    const blocks = lastRows.map((b) => b.blocks)


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

    const broadcast = sumBroadcast.map((bc) => bc.broadcast)


    //Zone for Chart
    useEffect(() => {
        getMonthLineFriends()
            .then(res => {
                setMonthLineFriends(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const lf_date = monthLineFriends.map((lf) => dayjs(lf.date_ymd).locale('th').format('MMM'))
    const af_values = monthLineFriends.map((lf) => parseInt(lf.contacts))
    const tr_values = monthLineFriends.map((lf) => parseInt(lf.targetReaches))
    const bk_values = monthLineFriends.map((lf) => parseInt(lf.blocks))


    //Options for Add Line Friend
    const options_af = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: lf_date,
        },
        colors: ['#39a32b'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        }
    }
    //Series for Add line Friends
    const series_af = [
        {
            name: "จำนวนการ Add Friends",
            data: af_values,
        }
    ];


    //Options for TargerReaches
    const options_tr = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: lf_date,
        },
        colors: ['#11c8f9'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        }
    }
    //Series for TargerReaches
    const series_tr = [
        {
            name: "จำนวนผู้ติดตาม Line OA",
            data: tr_values,
        }
    ];

    //Options for TargerReaches
    const options_bk = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: lf_date,
        },
        colors: ['#f9c411'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        }
    }
    //Series for TargerReaches
    const series_bk = [
        {
            name: "จำนวนการ Blocks",
            data: bk_values,
        }
    ];


    //Load Liff Data
    useEffect(() => {
        getLiffTotalMonth()
            .then(res => {
                setLiffMonthData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const liff_month = liffMonthData.map((ld) => dayjs(ld.month_lf).locale('th').format('MMM'))
    const user_pageview = liffMonthData.map((up) => parseInt(up.users_pageview))
    const user_firstvisit = liffMonthData.map((uf) => parseInt(uf.users_firstvisit))
    const event_pageview = liffMonthData.map((evp) => parseInt(evp.event_pageview))
    const event_scroll = liffMonthData.map((evsc) => parseInt(evsc.event_scroll))
    const event_sesionstart = liffMonthData.map((evse) => parseInt(evse.event_sesionstart))
    const event_engagement = liffMonthData.map((eve) => parseInt(eve.event_engagement))

    //Options for Page_view
    const options_pv = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: liff_month,
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#39a32b'],
        plotOptions: {
            bar: {
                // borderRadius: 10,
                columnWidth: '30%',
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 0.85,
                stops: [50, 0, 100]
            },
        }
    }
    //Series for Page_view
    const series_pv = [
        {
            name: "จำนวนผู้ใช้รวม page_view",
            data: user_pageview,
        }
    ];

    //Options for First_visit
    const options_fv = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: liff_month,
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#11c8f9'],
        plotOptions: {
            bar: {
                // borderRadius: 10,
                columnWidth: '30%',
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 0.85,
                stops: [50, 0, 100]
            },
        }
    }
    //Series for First_visit
    const series_fv = [
        {
            name: "จำนวนผู้ใช้รวม first_visit",
            data: user_firstvisit,
        }
    ];

    //Options for Event_Pageview
    const options_epv = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: liff_month,
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#f9c411'],
        plotOptions: {
            bar: {
                // borderRadius: 10,
                columnWidth: '30%',
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 0.85,
                stops: [50, 0, 100]
            },
        }
    }
    //Series for Event_pageview
    const series_epv = [
        {
            name: "จำนวนครั้ง page_view",
            data: event_pageview,
        }
    ];

    //Options for Event_scroll
    const options_evs = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: liff_month,
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#e4477d'],
        plotOptions: {
            bar: {
                // borderRadius: 10,
                columnWidth: '30%',
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 0.85,
                stops: [50, 0, 100]
            },
        }
    }
    //Series for Event_scroll
    const series_evs = [
        {
            name: "จำนวนครั้ง scroll",
            data: event_scroll,
        }
    ];

    //Options for Event_sessionstart
    const options_evse = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: liff_month,
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#c462f8'],
        plotOptions: {
            bar: {
                // borderRadius: 10,
                columnWidth: '30%',
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 0.85,
                stops: [50, 0, 100]
            },
        }
    }
    //Series for Event_sessionstart
    const series_evse = [
        {
            name: "จำนวนครั้ง sessionstart",
            data: event_sesionstart,
        }
    ];

    //Options for Event_sessionstart
    const options_eve = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: liff_month,
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#ac8854'],
        plotOptions: {
            bar: {
                // borderRadius: 10,
                columnWidth: '30%',
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 0.85,
                stops: [50, 0, 100]
            },
        }
    }
    //Series for Event_engagement
    const series_eve = [
        {
            name: "จำนวนครั้ง engagement",
            data: event_engagement,
        }
    ];


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
                        <h3 className='text-center'>สถิติการใช้งาน LINE OA หมอพร้อม</h3>
                        <h6 className='text-center'>ข้อมูลรหะว่างเดือนมกราคม ถีง กรกฎาคม ปี พ.ศ. 2567</h6>
                        <div>
                            <div className='row' style={{ margin: '10px' }}>
                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '18vh',
                                            margin: '10px',
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
                                                <UserAddOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h5
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Add Friend
                                        </h5>
                                        <h2
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#39a32b', }}
                                        >
                                            {contacts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </h2>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '18vh',
                                            margin: '10px',
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
                                                <BarsOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h5
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            TargetReaches
                                        </h5>
                                        <h2
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#11c8f9', }}
                                        >
                                            {targetReaches.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </h2>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '18vh',
                                            margin: '10px',
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
                                                <BlockOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h5
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Blocks
                                        </h5>
                                        <h2
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#f9c411', }}
                                        >
                                            {blocks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </h2>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '18vh',
                                            margin: '10px',
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
                                                <FontAwesomeIcon icon={faTowerBroadcast} style={{ fontSize: '24px', color: '#fff' }} />
                                                {/* <BlockOutlined style={{ fontSize: '24px', color: '#fff' }} /> */}
                                            </div>
                                        </div>
                                        <h5
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Broadcast
                                        </h5>
                                        <h2
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#e4477d', }}
                                        >
                                            {broadcast.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row' style={{ margin: '10px' }}>
                            <div className='card bg-white border rounded col m-1'>
                                <h4 className='text-center' style={{ margin: '10px' }}>Add Friends</h4>
                                <div
                                    style={{
                                        justifyContent: 'center',
                                        marginLeft: 'auto',
                                        marginRight: 'auto'
                                    }}
                                >
                                    <Button
                                        shape='round'
                                        size='small'
                                        style={{ width: '120px', textDecoration: 'none' }}
                                        href='/all-line-using'
                                        target='_blank'
                                    >
                                        ดูข้อมูลเพิ่มเติม
                                    </Button>
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
                                        options={options_af}
                                        series={series_af}
                                        type="area"
                                        height={300}
                                        width="100%"
                                        style={{
                                            margin: '20px',
                                            alignItem: 'center'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='card bg-white border rounded col m-1'>
                                <h4 className='text-center' style={{ margin: '10px' }}>TargetReaches </h4>
                                <div
                                    style={{
                                        justifyContent: 'center',
                                        marginLeft: 'auto',
                                        marginRight: 'auto'
                                    }}
                                >
                                    <Button
                                        shape='round'
                                        size='small'
                                        style={{ width: '120px', textDecoration: 'none' }}
                                        href='/all-line-using'
                                        target='_blank'
                                    >
                                        ดูข้อมูลเพิ่มเติม
                                    </Button>
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
                                        options={options_tr}
                                        series={series_tr}
                                        type="area"
                                        height={300}
                                        width="100%"
                                        style={{
                                            margin: '20px',
                                            alignItem: 'center'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='card bg-white border rounded col m-1'>
                                <h4 className='text-center' style={{ margin: '10px' }}>Blocks </h4>
                                <div
                                    style={{
                                        justifyContent: 'center',
                                        marginLeft: 'auto',
                                        marginRight: 'auto'
                                    }}
                                >
                                    <Button
                                        shape='round'
                                        size='small'
                                        style={{ width: '120px', textDecoration: 'none' }}
                                        href='/all-line-using'
                                        target='_blank'
                                    >
                                        ดูข้อมูลเพิ่มเติม
                                    </Button>
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
                                        options={options_bk}
                                        series={series_bk}
                                        type="area"
                                        height={300}
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
                                <h4 className='text-center' style={{ margin: '10px' }}>จำนวนผู้ใช้รวม Page view </h4>
                                <div
                                    style={{
                                        justifyContent: 'center',
                                        marginLeft: 'auto',
                                        marginRight: 'auto'
                                    }}
                                >
                                    <Button
                                        shape='round'
                                        size='small'
                                        style={{ width: '120px', textDecoration: 'none' }}
                                        href='/all-liff-using'
                                        target='_blank'
                                    >
                                        ดูข้อมูลเพิ่มเติม
                                    </Button>
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
                                        options={options_pv}
                                        series={series_pv}
                                        type="bar"
                                        height={300}
                                        width="100%"
                                        style={{
                                            margin: '20px',
                                            alignItem: 'center'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='card bg-white border rounded col m-1'>
                                <h4 className='text-center' style={{ margin: '10px' }}>จำนวนผู้ใช้รวม First visit </h4>
                                <div
                                    style={{
                                        justifyContent: 'center',
                                        marginLeft: 'auto',
                                        marginRight: 'auto'
                                    }}
                                >
                                    <Button
                                        shape='round'
                                        size='small'
                                        style={{ width: '120px', textDecoration: 'none' }}
                                        href='/all-line-using'
                                        target='_blank'
                                    >
                                        ดูข้อมูลเพิ่มเติม
                                    </Button>
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
                                        options={options_fv}
                                        series={series_fv}
                                        type="bar"
                                        height={300}
                                        width="100%"
                                        style={{
                                            margin: '20px',
                                            alignItem: 'center'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='card bg-white border rounded col m-1'>
                                <h4 className='text-center' style={{ margin: '10px' }}>จำนวนครั้ง Page view </h4>
                                <div
                                    style={{
                                        justifyContent: 'center',
                                        marginLeft: 'auto',
                                        marginRight: 'auto'
                                    }}
                                >
                                    <Button
                                        shape='round'
                                        size='small'
                                        style={{ width: '120px', textDecoration: 'none' }}
                                        href='/all-line-using'
                                        target='_blank'
                                    >
                                        ดูข้อมูลเพิ่มเติม
                                    </Button>
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
                                        type="bar"
                                        height={300}
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
                                <h4 className='text-center' style={{ margin: '10px' }}>จำนวนครั้ง Scroll </h4>
                                <div
                                    style={{
                                        justifyContent: 'center',
                                        marginLeft: 'auto',
                                        marginRight: 'auto'
                                    }}
                                >
                                    <Button
                                        shape='round'
                                        size='small'
                                        style={{ width: '120px', textDecoration: 'none' }}
                                        href='/all-line-using'
                                        target='_blank'
                                    >
                                        ดูข้อมูลเพิ่มเติม
                                    </Button>
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
                                        options={options_evs}
                                        series={series_evs}
                                        type="bar"
                                        height={300}
                                        width="100%"
                                        style={{
                                            margin: '20px',
                                            alignItem: 'center'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='card bg-white border rounded col m-1'>
                                <h4 className='text-center' style={{ margin: '10px' }}>จำนวนครั้ง Session start </h4>
                                <div
                                    style={{
                                        justifyContent: 'center',
                                        marginLeft: 'auto',
                                        marginRight: 'auto'
                                    }}
                                >
                                    <Button
                                        shape='round'
                                        size='small'
                                        style={{ width: '120px', textDecoration: 'none' }}
                                        href='/all-line-using'
                                        target='_blank'
                                    >
                                        ดูข้อมูลเพิ่มเติม
                                    </Button>
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
                                        options={options_evse}
                                        series={series_evse}
                                        type="bar"
                                        height={300}
                                        width="100%"
                                        style={{
                                            margin: '20px',
                                            alignItem: 'center'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='card bg-white border rounded col m-1'>
                                <h4 className='text-center' style={{ margin: '10px' }}>จำนวนครั้ง Engagement </h4>
                                <div
                                    style={{
                                        justifyContent: 'center',
                                        marginLeft: 'auto',
                                        marginRight: 'auto'
                                    }}
                                >
                                    <Button
                                        shape='round'
                                        size='small'
                                        style={{ width: '120px', textDecoration: 'none' }}
                                        href='/all-line-using'
                                        target='_blank'
                                    >
                                        ดูข้อมูลเพิ่มเติม
                                    </Button>
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
                                        options={options_eve}
                                        series={series_eve}
                                        type="bar"
                                        height={300}
                                        width="100%"
                                        style={{
                                            margin: '20px',
                                            alignItem: 'center'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <div>
                            <div
                                className='card'
                                style={{ margin: '10px' }}
                            >
                                <div>
                                    <h4 className='text-center mt-3'>ตารางแสดงข้อมูลการใช้งาน Line OA หมอพร้อม</h4>
                                    <div style={{ margin: '10px', float: 'left', clear: 'both' }}>
                                        <Button shape='round' icon={<DownloadOutlined />}>
                                            <CSVLink
                                                filename={"LINE_OA_USING_All.csv"}
                                                data={dataSource}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                Export to CSV
                                            </CSVLink>
                                        </Button>
                                        &nbsp;&nbsp;<strong>  จำนวนทั้งหมด {searchQuery.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} รายการ</strong>
                                    </div>
                                    <div style={{ margin: '10px', float: 'right' }}>
                                        <strong>ค้นหาตามช่วงเวลา : </strong> <RangePicker onChange={handleFilter} allowClear={true} />
                                    </div>
                                </div>
                                <Table
                                    dataSource={dataSource}
                                    columns={columns}
                                    style={{ padding: '10px' }}
                                    size='small'
                                />
                            </div>
                        </div> */}
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default UsingLine