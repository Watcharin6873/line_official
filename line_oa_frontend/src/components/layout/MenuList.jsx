import React, { useEffect, useState } from 'react'
import { Menu, Tooltip } from 'antd'
import { AppstoreAddOutlined, AreaChartOutlined, HomeOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { BroadcastOnHome, Message, MenuOutlined, VibrationOutlined } from '@mui/icons-material'
import { faLine } from '@fortawesome/free-brands-svg-icons'


function MenuList({ darkTheme }) {
    const location = useLocation()
    const [current, setCurrent] = useState(location.pathname)

    const handleclick = (e) => {
        setCurrent(e.key)
    }

    useEffect(() => {
        if (location) {
            if (current !== location.pathname) {
                setCurrent(location.pathname)
            }
        }
    }, [location, current])


    return (
        <>
            <Menu
                theme={darkTheme ? 'dark' : 'light'}
                mode='inline'
                className='menu-bar'
                onClick={handleclick}
                selectedKeys={[current]}
            >
                {/* <Menu.Item key="/line_oa_report" icon={<HomeOutlined />}>
                    <Link to='/line_oa_report' /> หน้าแรก
                </Menu.Item> */}
                <Menu.Item key="/using-line" icon={<AppstoreAddOutlined />}>
                    <Link to='/using-line' /> สถิติการใช้งาน
                </Menu.Item>
                <Menu.Item key="/liff" icon={<AppstoreAddOutlined />}>
                    <Link to='/liff' /> การเข้าถึง LIFF
                </Menu.Item>
                {/* <Menu.SubMenu key="tasks" icon={<BarsOutlined />} title="Tasks">
                    <Menu.Item key="task-1">Task 1</Menu.Item>
                    <Menu.Item key="task-2">Task 2</Menu.Item>
                    <Menu.SubMenu key="sub-tasks" title="Subtasks">
                        <Menu.Item key="subtask-1">Subtask 1</Menu.Item>
                        <Menu.Item key="subtask-2">Subtask 2</Menu.Item>
                    </Menu.SubMenu>
                </Menu.SubMenu> */}
                <Menu.Item key="/send-message" icon={<SendOutlined />}>
                    <Link to='/send-message' /> สถิติการส่งข้อความ
                </Menu.Item>
                <Menu.Item key="/broadcast" icon={<BroadcastOnHome />}>
                    <Link to='/broadcast' /> สถิติ BROADCAST
                </Menu.Item>
                <Menu.SubMenu key="tasks" icon={<Message />} title="ข้อความทักทาย">
                    <Menu.Item key="/greeting-message" icon={<MessageOutlined />}>
                        <Link to='/greeting-message' /> MESSAGE
                    </Menu.Item>
                    <Menu.Item key="/greeting-ms-impression" icon={<MessageOutlined />}>
                        <Link to='/greeting-ms-impression' /> IMPRESSION
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="task2" icon={<MenuOutlined />} title='ข้อมูล RICH MENU'>
                    <Menu.Item key="/activity-a" icon={<FontAwesomeIcon icon={faCircle} />}>
                        <Link to='/activity-a' /> นัดหมายออนไลน์
                    </Menu.Item>
                    <Menu.Item key="/activity-b" icon={<FontAwesomeIcon icon={faCircle} />}>
                        <Link to='/activity-b' /> ประวัติสุขภาพ
                    </Menu.Item>
                    <Menu.Item key="/activity-c" icon={<FontAwesomeIcon icon={faCircle} />}>
                        <Link to='/activity-c' /> บริจาคดวงตา อวัยวะ
                    </Menu.Item>
                    <Menu.Item key="/activity-d" icon={<FontAwesomeIcon icon={faCircle} />}>
                        <Link to='/activity-d' /> ใบสั่งยา/ใบสั่งแล็บ/ผลแล็บ/ใบรับรองแพทย์
                    </Menu.Item>
                    <Menu.Item key="/activity-e" icon={<FontAwesomeIcon icon={faCircle} />}>
                        <Link to='/activity-e' /> ค้นหาหน่วยบริการที่เข้าร่วม
                    </Menu.Item>
                    <Menu.Item key="/activity-f" icon={<FontAwesomeIcon icon={faCircle} />}>
                        <Link to='/activity-f' /> บัญชีผู้ใช้งานและอื่นๆ
                    </Menu.Item>
                    <Menu.Item key="/activity-all" icon={<FontAwesomeIcon icon={faCircle} />}>
                        <Link to='/activity-all' /> รวมทั้งหมด
                    </Menu.Item>
                </Menu.SubMenu>

                <Menu.Item key="/line-voom" icon={<FontAwesomeIcon icon={faLine} />}>
                    <Link to='/line-voom' /> ข้อมูล LINE VOOM
                </Menu.Item>
                <Menu.Item key="/moph-alert" icon={<VibrationOutlined />}>
                    <Link to='/moph-alert' /> ข้อมูล MOPH-ALERT
                </Menu.Item>
            </Menu>
        </>
    )
}

export default MenuList