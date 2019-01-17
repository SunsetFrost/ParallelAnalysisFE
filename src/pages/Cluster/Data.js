import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Badge, Button, Card, Row, Col, Radio, Input, Avatar, List } from 'antd';
import Link from 'umi/link';

import styles from './Data.less';
import { render } from 'react-dom';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const { Search } = Input;

@connect(({ data, loading }) => ({
  data,
  loading: loading.effects['data/fetchDatas'],
}))
class Data extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'data/fetchDatas',
    });
  }

  render() {
    const {
      data: { list },
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
          <Button type="primary">创建</Button>
        </Col>
        <Col span={12}>
          <RadioGroup defaultValue="all" onChange={this.radioOnChange}>
            <RadioButton value="all">全部</RadioButton>
            <RadioButton value="public">公网</RadioButton>
            <RadioButton value="private">内网</RadioButton>
            <RadioButton value="mix">混合</RadioButton>
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
            <a>加入</a>
          </p>
        </Col>
      </Row>
    );

    return (
      <div className={styles.standardList}>
        <Card border={false}>
          <Row>
            <Col sm={8} xs={24}>
              <Info title="公网集群" value="6个数据集群" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="内网集群" value="3个数据集群" bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="混合集群" value="2个数据集群" />
            </Col>
          </Row>
        </Card>
        <Card
          className={styles.listCard}
          bordered={false}
          title="数据集群"
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
                  description="公网并行数据集群"
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

export default Data;
