import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Badge, Card, Row, Col, Table } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ButtonGroup from 'antd/lib/button/button-group';

import moment from 'moment';
import styles from './DataDetail.less';

const { Description } = DescriptionList;

@connect(({ net, loading }) => ({
  net,
  loading: loading.effects['net/fetchNetById'],
}))
class DataDetail extends PureComponent {
  componentDidMount() {}

  render() {
    const {
      data: { detail },
      loading,
    } = this.props;

    /*
      头部组件
    */
    const headerContent = item => (
      <DescriptionList className={styles.headerList} size="middle" col="2">
        <Description term="ID">{item._id}</Description>
        <Description term="名称">{item.name}</Description>
        <Description term="网段">10.36.0.0/16</Description>
        <Description term="创建时间">2019-01-03</Description>
        <Description term="描述">
          <a>编辑</a>
        </Description>
      </DescriptionList>
    );

    const action = (
      <Fragment>
        <Button type="primary">加入</Button>
        <ButtonGroup>
          <Button>查看计算集群</Button>
          <Button>查看数据集群</Button>
          <Button>返回</Button>
        </ButtonGroup>
      </Fragment>
    );

    const extra = (status, pcNum) => (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>状态</div>
          <div className={styles.heading}>{status}</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>计算机</div>
          <div className={styles.heading}>{pcNum}</div>
        </Col>
      </Row>
    );

    /*
    表格组件
  */
    const columns = [
      {
        title: 'ID',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: '名称',
        dataIndex: 'hostname',
        key: 'hostname',
      },
      {
        title: 'IP',
        dataIndex: 'ip',
        key: 'ip',
      },
      {
        title: '处理器',
        dataIndex: 'cpu',
        key: 'cpu',
      },
      {
        title: '内存',
        dataIndex: 'mem',
        key: 'mem',
      },
      {
        title: '加入时间',
        dataIndex: 'join_time',
        key: 'join_time',
      },
      // {
      //   title: 'Status',
      //   dataIndex: 'status',
      //   key: 'status',
      //   render: status =>
      //     status === 'success' ? (
      //       <Badge status="success" text="success" />
      //     ) : (
      //       <Badge status="error" text="error" />
      //     ),
      // },
    ];

    return (
      <PageHeaderWrapper
        title={detail.name}
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        content={headerContent(detail)}
        action={action}
        extraContent={extra('可用', '12台')}
        hiddenBreadcrumb
      >
        <Card title="PC" style={{ marginBottom: 24 }}>
          <Table pagination={false} dataSource={detail.pcs} columns={columns} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
