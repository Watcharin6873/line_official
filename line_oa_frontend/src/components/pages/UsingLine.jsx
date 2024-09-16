import React, { useEffect, useState } from 'react'
import { Layout, theme, Table, Button, DatePicker, Row, Col } from 'antd'
import { BarsOutlined, BlockOutlined, DownloadOutlined, LoadingOutlined, UserAddOutlined } from '@ant-design/icons'
import { CSVLink } from 'react-csv'
import Sidebar from '../layout/Sidebar'
import Headers from '../layout/Headers'
import dayjs from 'dayjs'
import "dayjs/locale/th"
import buddhistEra from 'dayjs/plugin/buddhistEra'
import {
    getAllLineFriends,
    getLastFriends,
} from '../Functions/LineFriends'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTowerBroadcast } from '@fortawesome/free-solid-svg-icons'
import { CircularProgress } from '@mui/material'
import Chart from 'react-apexcharts';


dayjs.extend(buddhistEra);
const { Content } = Layout;
const { RangePicker } = DatePicker;


function UsingLine() {
    //Valiable
    const [loading, setLoading] = useState(false)
    const [collapsed, setCollapsed] = useState(false)
    const [allLineFriendsData, setAllLineFriendData] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [searchQuery2, setSearchQuery2] = useState([])
    const [searchQuery3, setSearchQuery3] = useState([])
    const [searchQuery4, setSearchQuery4] = useState([])
    const [searchQuery5, setSearchQuery5] = useState([])
    const [searchQuery6, setSearchQuery6] = useState([])
    const [lastRows, setLastRows] = useState([])

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    //Get all line friends data
    useEffect(() => {
        setLoading(true)
        getAllLineFriends()
            .then(res => {
                setAllLineFriendData(res.data)
                setSearchQuery(res.data)
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

    const handleFilter = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery(allLineFriendsData.filter(f => f.date_ymd >= startDate && f.date_ymd <= endDate))
    }

    const handleFilter2 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery2(allLineFriendsData.filter(f => f.date_ymd >= startDate && f.date_ymd <= endDate))
    }

    const handleFilter3 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery3(allLineFriendsData.filter(f => f.date_ymd >= startDate && f.date_ymd <= endDate))
    }

    const handleFilter4 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery4(allLineFriendsData.filter(f => f.date_ymd >= startDate && f.date_ymd <= endDate))
    }

    const handleFilter5 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery5(allLineFriendsData.filter(f => f.date_ymd >= startDate && f.date_ymd <= endDate))
    }

    const handleFilter6 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery6(allLineFriendsData.filter(f => f.date_ymd >= startDate && f.date_ymd <= endDate))
    }

    //Data For Charts
    const lineDate = searchQuery.map((ld) => dayjs(ld.date_ymd).locale('th').format('DD MMM BB'))
    const lineDate2 = searchQuery2.map((ld) => dayjs(ld.date_ymd).locale('th').format('DD MMM BB'))
    const lineDate3 = searchQuery3.map((ld) => dayjs(ld.date_ymd).locale('th').format('DD MMM BB'))
    const lineDate4 = searchQuery4.map((ld) => dayjs(ld.date_ymd).locale('th').format('DD MMM BB'))
    const lineDate5 = searchQuery5.map((ld) => dayjs(ld.date_ymd).locale('th').format('DD MMM BB'))
    const lineDate6 = searchQuery6.map((ld) => dayjs(ld.date_ymd).locale('th').format('DD MMM BB'))
    const lineContacts = searchQuery.map((lc) => parseInt(lc.contacts))
    const targetReaches_cht = searchQuery2.map((tgr) => parseInt(tgr.targetReaches))
    const blocks_cht = searchQuery3.map((bl) => parseInt(bl.blocks))
    const contacts_difference = searchQuery4.map((item) => parseInt(item.contacts_difference))
    const targetReaches_difference = searchQuery5.map((item) => parseInt(item.targetReaches_difference))
    const blocks_difference = searchQuery6.map((item) => parseInt(item.blocks_difference))

    //Sum difference
    const sum_contracts_diff = allLineFriendsData.map((item) => parseInt(item.contacts_difference)).reduce((a, b) => a + b, 0)
    const sum_targetReaches_diff = allLineFriendsData.map((item) => parseInt(item.targetReaches_difference)).reduce((a,b) => a + b, 0)
    const sum_blocks_diff = allLineFriendsData.map((item) => parseInt(item.blocks_difference)).reduce((a,b) => a + b, 0)

    console.log(sum_targetReaches_diff)


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


    //Options for Add Line Friend
    const options_af = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: lineDate,
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
            data: lineContacts,
        }
    ];

    //Options for Add Line Friend
    const options_tr = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: lineDate2,
        },
        colors: ['#11c8f9'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        }
    }
    //Series for Add line Friends
    const series_tr = [
        {
            name: "จำนวนผู้ติดตาม TargetReachs",
            data: targetReaches_cht,
        }
    ];

    //Options for blocks
    const options_bl = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: lineDate3,
        },
        colors: ['#f9c411'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        }
    }
    //Series for Add line Friends
    const series_bl = [
        {
            name: "จำนวนการ blocks",
            data: blocks_cht,
        }
    ];


    //Options for contacts difference
    const options_scd = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: lineDate4,
        },
        colors: ['#ac8854'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        }
    }
    const series_scd = [
        {
            name: "contacts_difference",
            data: contacts_difference,
        }
    ];


    //Options for targetReaches difference
    const options_tgrd = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: lineDate5,
        },
        colors: ['#ac8854'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        }
    }
    const series_tgrd = [
        {
            name: "targetReaches_difference",
            data: targetReaches_difference,
        }
    ];


    //Options for targetReaches difference
    const options_bd = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: lineDate6,
        },
        colors: ['#ac8854'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        }
    }
    const series_bd = [
        {
            name: "blocks_difference",
            data: blocks_difference,
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
                            <div className='row' style={{ margin: '' }}>
                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '20vh',
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
                                                <UserAddOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Add Friend Total
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#39a32b', }}
                                        >
                                            {contacts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </h3>
                                        <h6 className='text-center' style={{color: '#39a32b'}}>ข้อมูลสะสมทั้งหมด</h6>
                                    </div>
                                </div>

                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '20vh',
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
                                                <UserAddOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Add Friend Daily
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#ac8854', }}
                                        >
                                            {sum_contracts_diff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </h3>
                                        <h6 className='text-center' style={{color:'#ac8854'}}>ข้อมูลสะสมรายวัน</h6>
                                    </div>
                                </div>


                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '20vh',
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
                                                <BarsOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            TargetReaches Total
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#11c8f9', }}
                                        >
                                            {targetReaches.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </h3>
                                        <h6 className='text-center' style={{color:'#11c8f9'}}>ข้อมูลสะสมทั้งหมด</h6>
                                    </div>
                                </div>

                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '20vh',
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
                                                <BarsOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            TargetReaches Daily
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#ac8854', }}
                                        >
                                            {sum_targetReaches_diff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </h3>
                                        <h6 className='text-center' style={{color:'#ac8854'}}>ข้อมูลสะสมรายวัน</h6>
                                    </div>
                                </div>


                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '20vh',
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
                                                <BlockOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Blocks Total
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#f9c411', }}
                                        >
                                            {blocks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </h3>
                                        <h6 className='text-center' style={{color:'#f9c411'}}>ข้อมูลสะสมทั้งหมด</h6>
                                    </div>
                                </div>


                                <div className='col'>
                                    <div
                                        className='card bg-white rounded'
                                        style={{
                                            width: '100%',
                                            height: '20vh',
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
                                                <BlockOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            Blocks Daily
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#ac8854', }}
                                        >
                                            {sum_blocks_diff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </h3>
                                        <h6 className='text-center' style={{color:'#ac8854'}}>ข้อมูลสะสมรายวัน</h6>
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

                                    <div className='row' style={{ margin: '' }}>

                                        <div className='card bg-white border rounded col m-1'>
                                            <div>
                                                <div>
                                                    <h4 className='text-center' style={{ margin: '10px' }}>ข้อมูลการ Add Friends สะสมทั้งหมด</h4>
                                                </div>
                                                <div style={{ marginRight: '20px', float: 'right' }}>
                                                    <strong>ค้นหาตามช่วงเวลา : </strong> <RangePicker onChange={handleFilter} allowClear={true} />
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
                                                    options={options_af}
                                                    series={series_af}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>ข้อมูลการ Add Friends สะสมรายวัน</h4>
                                                </div>
                                                <div style={{ marginRight: '20px', float: 'right' }}>
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
                                                    options={options_scd}
                                                    series={series_scd}
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

                                    <div className='row' style={{ margin: '' }}>
                                        <div className='card bg-white border rounded col m-1'>
                                            <div>
                                                <div>
                                                    <h4 className='text-center' style={{ margin: '10px' }}>ข้อมูลผู้ติดตาม TargetReachs สะสมทั้งหมด</h4>
                                                </div>
                                                <div style={{ marginRight: '20px', float: 'right' }}>
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
                                                    options={options_tr}
                                                    series={series_tr}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>ข้อมูลผู้ติดตาม TargetReachs สะสมรายวัน</h4>
                                                </div>
                                                <div style={{ marginRight: '20px', float: 'right' }}>
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
                                                    options={options_tgrd}
                                                    series={series_tgrd}
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

                                    <div className='row' style={{ margin: '' }}>
                                        <div className='card bg-white border rounded col m-1'>
                                            <div>
                                                <div>
                                                    <h4 className='text-center' style={{ margin: '10px' }}>ข้อมูลการ Blocks สะสมทั้งหมด</h4>
                                                </div>
                                                <div style={{ marginRight: '20px', float: 'right' }}>
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
                                                    options={options_bl}
                                                    series={series_bl}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>ข้อมูลการ Blocks สะสมรายวัน</h4>
                                                </div>
                                                <div style={{ marginRight: '20px', float: 'right' }}>
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
                                                    options={options_bd}
                                                    series={series_bd}
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

export default UsingLine