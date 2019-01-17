import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Badge, Button, Card, Row, Col, Radio, Input, Avatar, List } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
// import moment from 'moment';

import styles from './Net.less';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { Search } = Input;

@connect(({ net, loading }) => ({
  net,
  loading: loading.effects['net/fetch'],
}))
class Net extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'net/fetch',
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
      pathname: '/cluster/net-create',
    });
  };

  onJoinClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'net/saveCreate',
      payload: {
        type: 'join',
      },
    });
    router.push({
      pathname: '/cluster/net-create',
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
      <Row gutter={16}>
        <Col span={4}>
          <Button type="primary" onClick={this.onCreateClick}>
            创建网络
          </Button>
        </Col>
        <Col span={12}>
          <RadioGroup defaultValue="all" onChange={this.radioOnChange}>
            <RadioButton value="all">全部</RadioButton>
            <RadioButton value="public">公有云</RadioButton>
            <RadioButton value="private">私有云</RadioButton>
          </RadioGroup>
        </Col>
        <Col span={8}>
          <Search
            className={styles.extraContentSearch}
            placeholder="集群名或IP"
            onSearch={() => ({})}
          />
        </Col>
      </Row>
    );

    // const CollapseContent = ({ data: { ip }}) => (
    //   <p>{ip}</p>
    // )

    const ListContent = ({ data: { _id, ip, type } }) => (
      <Row gutter={2} className={styles.listContent}>
        <Col span={6}>
          <span>地址</span>
          <p>{ip}</p>
        </Col>
        <Col span={6}>
          <span>网络类型</span>
          <p>{type}</p>
        </Col>
        <Col span={6}>
          <span>状态</span>
          <p>
            <Badge status="success" text="可用" />
          </p>
        </Col>
        <Col>
          <span>操作</span>
          <p>
            <Link to={`/cluster/net-detail?id=${_id}`}>查看</Link>
            <a onClick={this.onJoinClick}>加入</a>
          </p>
        </Col>
      </Row>
    );

    return (
      <div className={styles.standardList}>
        <Card bordered={false}>
          <Row>
            <Col sm={8} xs={24}>
              <Info title="计算机" value="6台物理计算机" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="公网集群" value="3个网络集群" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="内网集群" value="2个网络集群" />
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
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"
                      shape="square"
                      size="large"
                    />
                  }
                  title={<a href={item.ip}>{item.name}</a>}
                  description="南京师范大学虚拟地理实验室服务器-陈旻"
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
