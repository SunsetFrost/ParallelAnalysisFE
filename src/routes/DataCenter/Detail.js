import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import classNames from 'classnames';
import DescriptionList from 'components/DescriptionList';
import styles from '../Profile/AdvancedProfile.less';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const download = (
  <Fragment>
    <ButtonGroup>
      <Button>Delete</Button>
      {/* <Button>操作</Button> */}
      {/* <Dropdown overlay={menu} placement="bottomRight">
        <Button>
          <Icon type="ellipsis" />
        </Button>
      </Dropdown> */}
    </ButtonGroup>
    <Button type="primary">Download</Button>
  </Fragment>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="Date Range">1980-01-01 to 2016-02-39</Description>
    <Description term="Spatial Region">-180, -90, 180, 90</Description>
    <Description term="Variables">tmax, tmin, tavg</Description>
    <Description term="Related Compute">
      <a href="">IBIS</a>
    </Description>
    <Description term="File Format">NetCDF</Description>
    <Description term="Description">This is the very detail of data</Description>
  </DescriptionList>
);

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const extra = (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>Status</div>
      <div className={styles.heading}>Avalible</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>Download Amount</div>
      <div className={styles.heading}>14</div>
    </Col>
  </Row>
);

const tabList = [
  {
    key: 'detail',
    tab: 'Detail',
  },
];

export default class DataDetail extends Component {
  render() {
    return (
      <PageHeaderLayout
        title="Global Tmax Data"
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        action={download}
        content={description}
        extraContent={extra}
        tabList={tabList}
      >
        <Card title="download">Download Record</Card>
      </PageHeaderLayout>
    );
  }
}
