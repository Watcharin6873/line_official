import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Layout, Row, Table, theme, DatePicker, Divider, Select } from 'antd'
import { CSVLink } from 'react-csv'
import Sidebar from '../layout/Sidebar'
import Headers from '../layout/Headers'
import {
    getSumTransections,
    getListHospMophAlert,
    getTransectionMophAlert,
    getSumMonthTrans
} from '../Functions/MophAlert'
import dayjs from 'dayjs'
import "dayjs/locale/th"
import buddhistEra from 'dayjs/plugin/buddhistEra'
import { DownloadOutlined } from '@ant-design/icons'
import { CircularProgress } from '@mui/material'
import Chart from 'react-apexcharts';

dayjs.extend(buddhistEra);

const { Content } = Layout;
const { RangePicker } = DatePicker;

function MophAlert() {
    //Valiable 
    const [transections, setTransections] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChart, setLoadingChart] = useState(false)
    const [loadingMonthData, setLoadingMonthData] = useState(false)
    const [searchQuery, setSearchQuery] = useState([]);
    const [collapsed, setCollapsed] = useState(false)
    const [listHosp, setListHosp] = useState([])
    const [dataForChart, setDataForChart] = useState([])
    const [monthData, setMonthData] = useState([])


    //Background content
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    //Sum Month moph alert
    useEffect(() => {
        setLoadingMonthData(true)
        getSumMonthTrans()
            .then(res => {
                setMonthData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoadingMonthData(false))
    }, [])

    //month chart
    const m_data = monthData.map((md) => md.m_short_eng)
    const m_value = monthData.map((mv) => parseInt(mv.t_tran))

    const option_m = {
        chart: {
            type: 'bar',
            hieght: '450'
        },
        xaxis: {
            categories: m_data
        },
        plotOptions: {
            bar: { horizontal: true }
        }
    }
    const serie_m = [
        {
            name: "จำนวนการส่งข้อความผ่าน MOPH Alerting",
            data: m_value
        }
    ]


    //Load Hospital
    useEffect(() => {
        getListHospMophAlert()
            .then(res => {
                setListHosp(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    
    //options hospital
    const optionsHosp = listHosp.map((itemHosp) => ({
        value: itemHosp.hospital_code,
        label: itemHosp.hospital_name + " [" + itemHosp.hospital_code + "]"
    }))

    //RangePicker Rules
    const rangeConfig = {
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Please select time!',
            },
        ],
    };


    const handleSubmit = (fieldValue) => {
        const rangeValue = fieldValue['range_picker'];
        const value = {
            ...fieldValue,
            'hospital_code': fieldValue['hospital_code'],
            'range_picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
        }

        var hospital_code = value.hospital_code;
        var startDate = value.range_picker[0];
        var endDate = value.range_picker[1];

        console.log('Value: ', hospital_code, startDate, endDate)
        setLoadingChart(true)
        getTransectionMophAlert({ hospital_code, startDate, endDate })
            .then(res => {
                // console.log(res.data)
                setDataForChart(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoadingChart(false))
    }

    const c_date = dataForChart.map((c) => dayjs(c.created_at).format('D'))
    const t_value = dataForChart.map((t) => parseInt(t.transection))
    const sum_transection = dataForChart.map((s) => parseInt(s.transection)).reduce((a, b) => a + b, 0)
    const sumAll = transections.map((al) => parseInt(al.transection)).reduce((a, b) => a + b, 0)

    const options = {
        xaxis: {
            categories: c_date
        }
    };
    const series = [
        {
            name: "จำนวนการส่งข้อความผ่าน MOPH Alerting",
            data: t_value
        }
    ];


    //Load all Data
    useEffect(() => {
        loadData1()
    }, [])

    const loadData1 = () => {
        setLoading(true)
        getSumTransections()
            .then(res => {
                setTransections(res.data)
                setSearchQuery(res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }

    const handleFilter = (e) => {
        const startDate = e[0].format('YYYY-MM-DD');
        const endDate = e[1].format('YYYY-MM-DD');
        setSearchQuery(transections.filter(f => f.created_at >= startDate && f.created_at <= endDate))
    }

    const dataSource = searchQuery.map((item) => ({
        ...item
    }))


    const columns = [
        {
            title: 'เขตสุขภาพ',
            dataIndex: 'zone',
            key: 'zone',
            align: 'center',
        },
        {
            title: 'จังหวัด',
            dataIndex: 'provname',
            key: 'provname',
            align: 'center',
        },
        {
            title: 'หน่วยบริการ',
            dataIndex: 'hospital',
            align: 'center',
            render: (text, record) =>
                <>
                    {record.hospital_name + " [" + record.hospital_code + "]"}
                </>

        },
        {
            title: 'วันที่',
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'center',
            render: (created_at) =>
                <>
                    {dayjs(created_at).locale('th').format('DD MMM BB')}
                </>
        },
        {
            title: 'จำนวนครั้ง',
            dataIndex: 'transection',
            key: 'transection',
            align: 'center',
            render: (transection) =>
                <>
                    {transection.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </>
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
                        <h3 className='text-center'>สถิติการส่งข้อความแจ้งเตือนผ่านระบบ MOPH ALERTING</h3>
                        <h6 className='text-center'>ข้อมูลรหะว่างเดือนมกราคม ถีง กรกฎาคม ปี พ.ศ. 2567</h6>
                        <div>
                            <div>
                                {
                                    loadingMonthData
                                        ?
                                        <h1 className='text-center' style={{ marginTop: '30px' }}>Loading...<CircularProgress /></h1>
                                        :
                                        <>
                                            <div className='card' style={{ marginTop: '20px' }}>
                                                <div
                                                    className='card bg-white border rounded'
                                                    style={{
                                                        width: '300px',
                                                        margin: '10px',
                                                        justifyContent: 'center',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto'
                                                    }}
                                                >
                                                    <h5
                                                        className='text-center'
                                                        style={{ fontWeight: 'bold', margin: '10px' }}
                                                    >
                                                        จำนวนครั้งในการส่งรวมทั้งหมด
                                                    </h5>
                                                    <h2
                                                        className='text-center'
                                                        style={{ fontWeight: 'bold', color: '#018d18', }}
                                                    >
                                                        {sumAll.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    </h2>
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
                                                        options={option_m}
                                                        series={serie_m}
                                                        type="bar"
                                                        height={450}
                                                        width="100%"
                                                        style={{
                                                            margin: '20px',
                                                            alignItem: 'center'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </>

                                }

                            </div>
                        </div>
                        <div>
                            <div>
                                <div className='card' style={{ marginTop: '20px' }}>
                                    <h4 className='text-center' style={{ margin: '10px' }}>ข้อมูลการส่งข้อความผ่านระบบ MOPH ALERTING แยกหน่วยบริการ ตามช่วงเวลาที่กำหนด</h4>
                                    <div className='center'>
                                        <Form
                                            name='form-chart'
                                            layout='inline'
                                            onFinish={handleSubmit}
                                            style={{ margin: '10px' }}
                                        >
                                            <Form.Item
                                                name='hospital_code'
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'กรุณาระบุรหัสหน่วยบริการ 5 หลัก !'
                                                    }
                                                ]}
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder='กรุณาระบุรหัสหน่วยบริการ 5 หลัก'
                                                    optionFilterProp="label"
                                                    filterSort={(optionA, optionB) =>
                                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                    }
                                                    options={optionsHosp}
                                                    style={{ width: 300 }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name='range_picker'
                                                {...rangeConfig}
                                            >
                                                <RangePicker />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type='primary' htmlType='submit'>Search</Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div className='center'>
                                        <div>
                                            <Row>
                                                <Col style={{ margin: '5px' }}>

                                                </Col>
                                                <Col style={{ margin: '5px' }}>
                                                    <div
                                                        className='card bg-white border rounded'
                                                        style={{
                                                            width: '250px'
                                                        }}
                                                    >
                                                        <h5
                                                            className='text-center'
                                                            style={{ fontWeight: 'bold', margin: '10px' }}
                                                        >
                                                            จำนวนรวมจากการค้นหา
                                                        </h5>
                                                        <h2
                                                            className='text-center'
                                                            style={{ fontWeight: 'bold', color: '#04bbfa', }}
                                                        >
                                                            {sum_transection.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                        </h2>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>

                                    {
                                        loadingChart
                                            ?
                                            <h1 className='text-center' style={{ marginTop: '30px' }}>Loading...<CircularProgress /></h1>
                                            :
                                            <>
                                                {
                                                    dataSource.length > 0
                                                        ?
                                                        <>
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
                                                                    options={options}
                                                                    series={series}
                                                                    type="area"
                                                                    height={450}
                                                                    width="100%"
                                                                    style={{
                                                                        margin: '20px',
                                                                        alignItem: 'center'
                                                                    }}
                                                                />
                                                            </div>
                                                        </>
                                                        :
                                                        <h6 className='text-center' style={{ fontWeight: 'bold', margin: '20px' }}>ไม่พบข้อมูล กรุณาเลือกรายการค้นหาใหม่อีกครั้ง!</h6>

                                                }
                                            </>
                                    }


                                </div>
                            </div>
                        </div>

                        <div className='card' style={{ marginTop: '20px' }}>
                            <div>
                                <h4 className='text-center' style={{ margin: '10px' }}>ตารางข้อมูลการส่งข้อความผ่านระบบ MOPH ALERTING</h4>
                                <div style={{ margin: '10px', float: 'left', clear: 'both' }}>
                                    <Button shape='round' icon={<DownloadOutlined />}>
                                        <CSVLink
                                            filename={"SumTransection_All.csv"}
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
                                {
                                    !loading
                                        ?
                                        <Table
                                            dataSource={dataSource}
                                            columns={columns}
                                            style={{ padding: '10px' }}
                                            size='small'
                                        />
                                        :
                                        <h1 className='text-center' style={{ marginTop: '30px' }}>Loading...<CircularProgress /></h1>
                                }

                            </div>

                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default MophAlert