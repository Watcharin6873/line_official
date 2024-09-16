import React, { useState } from 'react'
import { Layout } from 'antd'
import Logo from './Logo'
import MenuList from './MenuList'
import ToggleThemeButton from './ToggleThemeButton'

const { Sider } = Layout;

function Sidebar({collapsed}) {

    const [darkTheme, setDarkTheme] = useState(true)

    const toggleTheme = () => {
        setDarkTheme(!darkTheme)
    }

    return (
        <Sider
            width={250}
            collapsed={collapsed}
            collapsible
            trigger={null}
            theme={darkTheme ? 'dark' : 'light'}
            className='sidebar'
        >
            <Logo />
            <MenuList darkTheme={darkTheme} />
            {/* <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} /> */}
        </Sider>
    )
}

export default Sidebar