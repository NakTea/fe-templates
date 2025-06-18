import { Layout } from 'antd';
import PageNav from './components/PageNav';
import HeaderContent from './components/Header';
// import Footer from './components/Footer';
import s from './index.module.css';

const { Header, Content, Sider } = Layout;

export default function BasicLayout(props: { children: React.ReactNode; pathname: string; langInfo: object }) {
  const { children, pathname, langInfo } = props;

  return (
    <Layout>
      <Header className={s.header}>
        <HeaderContent lang={langInfo?.locale} setLocle={langInfo?.setLocle} />
      </Header>
      <Layout className={s.layout}>
        <Sider width={200} className={s.slider}>
          <PageNav pathname={pathname} />
        </Sider>
        {/* <Layout style={{ padding: '0 24px 24px' }}> */}
        <Layout className={s.main}>
          {children}
          {/* <Footer /> */}
        </Layout>
      </Layout>
    </Layout>
  );
}
