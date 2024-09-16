import React, { useEffect, useState } from 'react'
import { Layout, theme, DatePicker } from 'antd'
import Sidebar from '../layout/Sidebar'
import Headers from '../layout/Headers'
import { LoadingOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import "dayjs/locale/th"
import buddhistEra from 'dayjs/plugin/buddhistEra'
import Chart from 'react-apexcharts';
import { getActivityF, getSumActivityF } from '../Functions/RichMenu'
import { LayersOutlined, TrendingUpOutlined } from '@mui/icons-material'


dayjs.extend(buddhistEra);
const { Content } = Layout;
const { RangePicker } = DatePicker;

function Activity_f() {
    const [collapsed, setCollapsed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [activityF, setActivityF] = useState([])
    const [searchQuery1, setSearchQuery1] = useState([])
    const [searchQuery2, setSearchQuery2] = useState([])
    const [searchQuery3, setSearchQuery3] = useState([])
    const [searchQuery4, setSearchQuery4] = useState([])
    const [searchQuery5, setSearchQuery5] = useState([])
    const [sumActivityF, setSumActivityF] = useState([])

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        getSumActivityF()
            .then(res => {
                setSumActivityF(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const sum_imp_F = sumActivityF.map((item) => parseInt(item.imp_F))
    const sum_impUU_F = sumActivityF.map((item) => parseInt(item.impUU_F))
    const sum_click_F = sumActivityF.map((item) => parseInt(item.click_F))
    const sum_clickUU_F = sumActivityF.map((item) => parseInt(item.clickUU_F))
    const sum_clickUURate_F = sumActivityF.map((item) => parseFloat(item.clickUURate_F))


    useEffect(() => {
        setLoading(true)
        getActivityF()
            .then(res => {
                setActivityF(res.data)
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
        setSearchQuery1(activityF.filter(f => f.rich_date >= startDate && f.rich_date <= endDate))
    }

    const handleFilter2 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery2(activityF.filter(f => f.rich_date >= startDate && f.rich_date <= endDate))
    }

    const handleFilter3 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery3(activityF.filter(f => f.rich_date >= startDate && f.rich_date <= endDate))
    }

    const handleFilter4 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery4(activityF.filter(f => f.rich_date >= startDate && f.rich_date <= endDate))
    }

    const handleFilter5 = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery5(activityF.filter(f => f.rich_date >= startDate && f.rich_date <= endDate))
    }

    const rich_date1 = searchQuery1.map((item) => dayjs(item.rich_date).locale('th').format('DD MMM BB'))
    const rich_date2 = searchQuery2.map((item) => dayjs(item.rich_date).locale('th').format('DD MMM BB'))
    const rich_date3 = searchQuery3.map((item) => dayjs(item.rich_date).locale('th').format('DD MMM BB'))
    const rich_date4 = searchQuery4.map((item) => dayjs(item.rich_date).locale('th').format('DD MMM BB'))
    const rich_date5 = searchQuery5.map((item) => dayjs(item.rich_date).locale('th').format('DD MMM BB'))
    const imp_F = searchQuery1.map((item) => item.imp_F)
    const impUU_F = searchQuery2.map((item) => parseInt(item.impUU_F))
    const click_F = searchQuery3.map((item) => parseInt(item.click_F))
    const clickUU_F = searchQuery4.map((item) => parseInt(item.clickUU_F))
    const clickUURate_F = searchQuery5.map((item) => parseFloat(item.clickUURate_F))


    //imp_ALL
    const options_imp = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: rich_date1,
        },
        colors: ['#39a32b'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        }
    }
    const series_imp = [
        {
            name: "อิมเพรชชัน",
            data: imp_F,
        }
    ]

    //impUU_ALL
    const options_impUU = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: rich_date2,
        },
        colors: ['#11c8f9'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        }
    }
    const series_impUU = [
        {
            name: "ผู้ใช้ที่เข้าถึง",
            data: impUU_F,
        }
    ]

    //click_ALL
    const options_click = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: rich_date3,
        },
        colors: ['#f9c411'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        }
    }
    const series_click = [
        {
            name: "คลิก",
            data: click_F,
        }
    ]

    //clickUU_ALL
    const options_clickUU = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: rich_date4,
        },
        colors: ['#e4477d'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        }
    }
    const series_clickUU = [
        {
            name: "ผู้ใช้ที่คลิก",
            data: clickUU_F,
        }
    ]

    //Push
    const options_clickRate = {
        xaxis: {
            labels: {
                rotate: -45
            },
            categories: rich_date5,
        },
        colors: ['#c462f8'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        }
    }
    const series_clickRate = [
        {
            name: "อัตราการคลิก",
            data: clickUURate_F,
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
                        
                        <h3 className='text-center'>สถิติข้อมูล RICH MENU บัญชีผู้ใช้งานและอื่นๆ</h3>
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
                                                <LayersOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            อิมเพรชชัน
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#39a32b', }}
                                        >
                                            {sum_imp_F.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <LayersOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            ผู้ใช้ที่เข้าถึง
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#11c8f9', }}
                                        >
                                            {sum_impUU_F.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <LayersOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            คลิก
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#f9c411', }}
                                        >
                                            {sum_click_F.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <LayersOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            ผู้ใช้ที่คลิก
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#e4477d', }}
                                        >
                                            {sum_clickUU_F.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                <TrendingUpOutlined style={{ fontSize: '24px', color: '#fff' }} />
                                            </div>
                                        </div>
                                        <h6
                                            className='text-center'
                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                        >
                                            อัตราการคลิก
                                        </h6>
                                        <h3
                                            className='text-center'
                                            style={{ fontWeight: 'bold', color: '#c462f8', }}
                                        >
                                            {sum_clickUURate_F}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนครั้งที่แสดง RICH MENU บัญชีผู้ใช้งานและอื่นๆ</h4>
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
                                    </div>

                                    <div className='row' style={{ margin: '10px' }}>
                                        <div className='card bg-white border rounded col m-1'>
                                            <div>
                                                <div>
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนผู้ใช้ที่มีการเข้าถึง RICH MENU บัญชีผู้ใช้งานและอื่นๆ</h4>
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
                                                    options={options_impUU}
                                                    series={series_impUU}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนครั้งที่มีการคลิก RICH MENU บัญชีผู้ใช้งานและอื่นๆ</h4>
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
                                                    options={options_click}
                                                    series={series_click}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>จำนวนผู้ใช้ที่คลิก RICH MENU บัญชีผู้ใช้งานและอื่นๆ</h4>
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
                                                    options={options_clickUU}
                                                    series={series_clickUU}
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
                                                    <h4 className='text-center' style={{ margin: '10px' }}>อัตราการคลิก RICH MENU บัญชีผู้ใช้งานและอื่นๆ</h4>
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
                                                    options={options_clickRate}
                                                    series={series_clickRate}
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

export default Activity_f