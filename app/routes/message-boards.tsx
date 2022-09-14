import { Outlet } from '@remix-run/react';
import Layout from '../components/Layout';

export default function MessageBoards() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
