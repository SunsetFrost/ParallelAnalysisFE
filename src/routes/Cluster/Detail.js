import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Badge,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../List/BasicList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ mesos, loading }) => ({
  mesos,
  //loading: loading.effects['servers/fetchServers'],
  loading: loading.effects['mesos/fetchAgents'],
}))
export default class Details extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'mesos/fetchMaster',
    });
    dispatch({
      type: 'mesos/fetchAgents',
    });
  }

  render() {
    const { mesos, loading } = this.props;
    // const list = [];
    // console.log(mesos);
    const list = mesos.agents.length !== 0 ? mesos.agents.get_agents.agents : [];

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">All</RadioButton>
          <RadioButton value="election">Election</RadioButton>
          <RadioButton value="master">Master</RadioButton>
          <RadioButton value="agent">Agent</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="Server name or Ip"
          onSearch={() => ({})}
        />
      </div>
    );

    const ListContent = ({ data: { agent_info: { hostname }, registered_time, active } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Group</span>
          <p>IBIS</p>
        </div>
        <div className={styles.listContentItem}>
          <span>IP</span>
          <p>{hostname}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>CreateTime</span>
          <p>{moment(registered_time).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={styles.listContentStateItem}>
          <span>Status</span>
          <p>
            <Badge status="success" text={active} />
          </p>
        </div>
      </div>
    );

    return (
      <div className={styles.standardList}>
        <Card bordered={false}>
          <Row>
            <Col sm={8} xs={24}>
              <Info title="Election" value="1 Server" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="Master" value="1 Server" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="Agent" value={list.length + ' Server'} />
            </Col>
          </Row>
        </Card>

        <Card
          className={styles.listCard}
          bordered={false}
          title="Server"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraContent}
        >
          <List
            size="large"
            rowKey="id"
            loading={loading}
            dataSource={list}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png'}
                      shape="square"
                      size="large"
                    />
                  }
                  title={<a href={item.href}>{item.agent_info.hostname}</a>}
                  description={item.pid}
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}
