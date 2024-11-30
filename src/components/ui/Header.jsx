"use client";

import { Layout, Row, Dropdown, Button, Space, Avatar, Switch } from 'antd';
import { useRouter } from 'next/navigation';
import { UserOutlined } from '@ant-design/icons';
import { getUserInfo, logoutUser } from '@/service/auth.service';
import { authKey } from '@/constants/authKey';
import { useState } from 'react';
import { ConfigProvider } from 'antd';

const { Header: AntHeader } = Layout;

const Header = () => {
  const { role, ...userData } = getUserInfo();
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  const logout = () => {
    logoutUser(authKey);
    router.push('/login');
  };

  const items = [
    {
      key: '0',
      label: (
        <Button onClick={logout} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];

  return (
    <ConfigProvider theme={{ mode: darkMode ? 'dark' : 'light' }}>
      <AntHeader style={{ background: darkMode ? '#001529' : '#fff' }}>
        <Row justify={'end'} align="middle" style={{ height: '100%' }}>
          <p
            style={{
              marginRight: '10px',
              fontWeight: 'bold',
              color: darkMode ? '#fff' : '#000',
            }}
          >
            {role}
          </p>

          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            checkedChildren="🌙"
            unCheckedChildren="☀️"
            style={{ marginRight: '10px' }}
          />

          <Dropdown menu={{ items }}>
            <Space wrap size={16}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Space>
          </Dropdown>
        </Row>
      </AntHeader>
    </ConfigProvider>
  );
};

export default Header;
