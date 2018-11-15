import React, { PureComponent } from 'react';
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

import styles from './Server.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ server, loading }) => ({
  server,
  loading: loading.effects['server/fetchServers'],
}))
export default class Server extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'server/fetchServers',
    });
  }

  radioOnChange = e => {
    const value = e.target.value;

    if (value === 'all') {
      this.props.dispatch({
        type: 'server/fetchServers',
      });
    } else {
      this.props.dispatch({
        type: 'server/fetchServerByType',
        payload: value,
      });
    }
  };

  render() {
    const {
      server: { list },
      loading,
    } = this.props;

    //console.log(list);
    //const list = mesos.agents.length !== 0 ? mesos.agents.get_agents.agents : [];

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all" onChange={this.radioOnChange}>
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

    const ListContent = ({ data: { ip, type, startTime, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>IP</span>
          <p>{ip}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>CreateTime</span>
          <p>{moment(startTime).format('YYYY-MM-DD')}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Type</span>
          <p>{type}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Status</span>
          <p>
            <Badge status="success" text={status} />
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
              <Info title="Agent" value={'4 Server'} />
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
                  title={<a href={item.ip}>{item.name}</a>}
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
