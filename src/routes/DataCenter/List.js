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

import styles from '../List/BasicList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ data, loading }) => ({
  data,
  loading: loading.effects['data/fetchData'],
}))
export default class Details extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'data/fetchData',
    });
  }

  render() {
    const { data: { list }, loading } = this.props;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <Search
          className={styles.extraContentSearch}
          placeholder="Data name or resolution"
          onSearch={() => ({})}
        />
      </div>
    );

    const ListContent = ({ data: { temporal, spatial, beginDate, endDate } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Temporal</span>
          <p>{temporal}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Spatial</span>
          <p>{spatial}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Begin Date</span>
          <p>{moment(beginDate).format('YYYY-MM-DD')}</p>
        </div>
        {/* <div className={styles.listContentItem}>
          <span>End Date</span>
          <p>{moment(endDate).format('YYYY-MM-DD')}</p>
        </div> */}
        <div className={styles.listContentItem}>
          <Button type="primary">Download</Button>
        </div>
      </div>
    );

    return (
      <div className={styles.standardList}>
        <Card
          className={styles.listCard}
          bordered={false}
          title="Data"
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
                  title={<a href="">{item.name}</a>}
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
