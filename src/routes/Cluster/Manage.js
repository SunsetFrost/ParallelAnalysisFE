import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar } from 'antd';

import styles from '../Dashboard/Workplace.less';

@connect(({ server, loading }) => ({
  server,
  loading: loading.effects['server/fetchAgentLog'],
}))
export default class Manage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'server/fetchAgentLog',
    });
  }

  renderList() {
    const { server } = this.props;
    const agentlog = server.agentlog;
    if (agentlog) {
      return agentlog.map(item => {
        return (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar style={{ backgroundColor: '#87d068' }}>U</Avatar>}
              title={
                <span>
                  <a className={styles.username}>{item.name}</a>
                  &nbsp;
                  <span className={styles.event}>{item.action + ' by ' + item.desc}</span>
                </span>
              }
              description={
                <span className={styles.datetime} title={item.date}>
                  {moment(item.date).fromNow()}
                </span>
              }
            />
          </List.Item>
        );
      });
    } else {
      return null;
    }
  }

  render() {
    const { loading } = this.props;

    return (
      <div>
        <Row gutter={24}>
          <Col>
            <Card
              bodyStyle={{ padding: 0 }}
              boreder={false}
              className={styles.activeCard}
              title="Agent Log"
              loading={loading}
            >
              <List loading={loading} size="large">
                <div className={styles.activitiesList}>{this.renderList()}</div>
              </List>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
