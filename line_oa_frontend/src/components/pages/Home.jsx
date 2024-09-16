import React, { useState } from 'react'
import { Layout,theme } from 'antd'
import Sidebar from '../layout/Sidebar'
import Headers from '../layout/Headers'


const { Content } = Layout;

function Home() {

    const [collapsed, setCollapsed] = useState(false)

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

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
                        Home page
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default Home