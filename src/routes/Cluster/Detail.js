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

@connect(({ server, loading }) => ({
  server,
  //loading: loading.effects['servers/fetchServers'],
  loading: loading.effects['server/fetchServer'],
}))
export default class Details extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'server/fetchServer',
    });
  }

  render() {
    const { server, loading } = this.props;
    const list = server.list;

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
          <RadioButton value="progress">Running</RadioButton>
          <RadioButton value="waiting">Waiting</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="Server name or Ip"
          onSearch={() => ({})}
        />
      </div>
    );

    const ListContent = ({ data: { group, ip, startTime, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Group</span>
          <p>{group}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>IP</span>
          <p>{ip}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>CreateTime</span>
          <p>{moment(startTime).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={styles.listContentStateItem}>
          <span>Status</span>
          <p>
            <Badge status={status} text={status} />
          </p>
        </div>
      </div>
    );

    return (
      <div className={styles.standardList}>
        <Card bordered={false}>
          <Row>
            <Col sm={8} xs={24}>
              <Info title="Manager" value="1 Server" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="Master" value="1 Server" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="Agent" value="3 Server" />
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
                  title={<a href={item.href}>{item.name}</a>}
                  description={item.desc}
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
