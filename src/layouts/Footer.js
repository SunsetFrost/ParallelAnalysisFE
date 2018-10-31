import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'OGMS',
          title: 'OGMS Platform',
          href: 'http://geomodeling.njnu.edu.cn/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/SunsetFrost/ParallelAnalysisFE',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'LandModel Compare',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> Nanjng Normal University
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
