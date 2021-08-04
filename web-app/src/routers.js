import React from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { FatherWithHOC } from './Pages/father/Father';
import { LoginWithHOC } from './Pages/login/LoginContainer';
import { CartDetailsWithHOC } from './Pages/father/CartDetails';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

export const Routes = [
    {
        path: '/father',
        component: FatherWithHOC
    },
    {
        path: '/cartdetails',
        component: CartDetailsWithHOC
    }
];

export const renderRouter = () => (
    <div>
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginWithHOC></LoginWithHOC>
                </Route>
                <Layout className="layout">
                    <Header>
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Product']}>
                            {['Dashboard', 'Product'].map((res) => {
                                return <Menu.Item key={res}>{res}</Menu.Item>;
                            })}
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                            <Breadcrumb.Item>Product</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-content">
                            {Routes.map((x, index) => <Route key={index} path={x.path} component={x.component} />)}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>PhucNT18</Footer>
                </Layout>,
            </Switch>
        </Router>
    </div>
)
