
import {
  CreditCardOutlined,
  ThunderboltOutlined,
  ScheduleOutlined,
  AppstoreOutlined,
  TableOutlined,
  OrderedListOutlined,
  FileTextOutlined,
  CalculatorOutlined,
  StockOutlined,
  WomanOutlined
} from '@ant-design/icons';
import Link from 'next/link';

export const sidebarItems = (role) => {

  const commonAdminSidebarItems= [
    {
      label:<Link href={`/notes`}>Notes</Link>,
      icon: <TableOutlined />,
      key:`/notes`
    },
  ]

  return commonAdminSidebarItems
}

