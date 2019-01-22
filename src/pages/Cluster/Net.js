import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Badge, Button, Card, Divider, Row, Col, Radio, Input, Avatar, List } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import _ from 'lodash';

import styles from './Net.less';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { Search } = Input;

const statusMapUI = ['warning', 'success', 'processing', 'warning', 'error'];
const statusMapText = ['未认证', '可用', '部署中', '断开', '不可用'];

@connect(({ net, loading }) => ({
  net,
  loading: loading.effects['net/fetchByParam'],
}))
class Net extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'net/fetchByParam',
    });
  }

  onCreateClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'net/saveCreate',
      payload: {
        type: 'create',
      },
    });
    router.push({
      pathname: '/cluster/net-create/net-cfg',
    });
  };

  onJoinClick = id => {
    const {
      dispatch,
      net: { list },
    } = this.props;
    dispatch({
      type: 'net/saveCreate',
      payload: {
        type: 'join',
        // value: {
        //   net: list.filter(item => (item._id === id ? true : false))[0],
        // },
      },
    });
    router.push({
      pathname: '/cluster/net-create/net-cfg',
      query: {
        id,
      },
    });
  };

  onRadioChange = e => {
    const type = e.target.value === 'all' ? {} : e.target.value;
    const { dispatch } = this.props;
    dispatch({
      type: 'net/fetchByParam',
      payload: {
        type,
      },
    });
  };

  onSearch = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'net/fetchByParam',
      payload: {
        name: value,
      },
    });
  };

  render() {
    const {
      net: { list },
      loading,
    } = this.props;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <Row type="flex" justify="end" gutter={16}>
        <Col>
          <Button type="primary" onClick={this.onCreateClick}>
            创建网络
          </Button>
        </Col>
        <Col>
          <RadioGroup defaultValue="all" onChange={this.onRadioChange}>
            <RadioButton value="all">全部</RadioButton>
            <RadioButton value="public">公有云</RadioButton>
            <RadioButton value="private">私有云</RadioButton>
          </RadioGroup>
        </Col>
        <Col>
          <Search
            className={styles.extraContentSearch}
            placeholder="网络名"
            onSearch={this.onSearch}
          />
        </Col>
      </Row>
    );

    const ListCount = (type, list) => {
      const countObj = _.countBy(list, item => {
        return item.type;
      });

      if (type === 'public') {
        return countObj.public ? countObj.public : 0;
      } else if (type === 'private') {
        return countObj.private ? countObj.private : 0;
      } else if (type === 'pc') {
        return _.reduce(
          list,
          (sum, item) => {
            return sum + item.pcs.length;
          },
          0
        );
      }
    };

    const ListContent = ({ data: { _id, ip, type, status } }) => (
      <Row gutter={2} className={styles.listContent}>
        <Col span={6}>
          <span>地址</span>
          <p>{ip}</p>
        </Col>
        <Col span={6}>
          <span>网络类型</span>
          <p>{type === 'public' ? '公网' : '内网'}</p>
        </Col>
        <Col span={6}>
          <span>状态</span>
          <p>
            <Badge status={statusMapUI[status]} text={statusMapText[status]} />
          </p>
        </Col>
        <Col>
          <span>操作</span>
          <p>
            <Fragment>
              <Link to={`/cluster/net-detail?id=${_id}`}>查看</Link>
              <a onClick={() => this.onJoinClick(_id)}>加入</a>
            </Fragment>
          </p>
        </Col>
      </Row>
    );

    return (
      <div className={styles.standardList}>
        <Card bordered={false}>
          <Row>
            <Col sm={8} xs={24}>
              <Info title="公网集群" value={`${ListCount('public', list)}个网络集群`} bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="内网集群" value={`${ListCount('private', list)}个网络集群`} bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="计算机" value={`${ListCount('pc', list)}台物理计算机`} />
            </Col>
          </Row>
        </Card>
        <Card
          className={styles.listCard}
          bordered={false}
          title="网络集群"
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
              <List.Item key={item._id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"
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

export default Net;
