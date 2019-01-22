import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Badge, Card, Row, Col, Table } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ButtonGroup from 'antd/lib/button/button-group';
import router from 'umi/router';

import moment from 'moment';
import styles from './NetDetail.less';

const { Description } = DescriptionList;

const statusMapUI = ['warning', 'success', 'processing', 'warning', 'error'];
const statusMapText = ['未认证', '可用', '部署中', '断开', '不可用'];

@connect(({ net, loading }) => ({
  net,
  loading: loading.effects['net/fetchById'],
}))
class NetDetail extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      net: {
        detail: { _id },
      },
    } = this.props;
    dispatch({
      type: 'net/fetchById',
      payload: _id,
    });
  }

  onReturnClick() {
    router.push({
      pathname: '/cluster/net',
    });
  }

  onJoinClick = () => {
    const {
      dispatch,
      net: { detail },
    } = this.props;
    dispatch({
      type: 'net/saveCreate',
      payload: {
        type: 'join',
        value: detail,
      },
    });
    router.push({
      pathname: '/cluster/net-create/net-cfg',
      query: {
        id: detail._id,
      },
    });
  };

  render() {
    const {
      net: { detail },
      loading,
    } = this.props;

    /*
      头部组件
    */
    const headerContent = item => (
      <DescriptionList className={styles.headerList} size="middle" col="2">
        <Description term="ID">{item._id}</Description>
        <Description term="名称">{item.name}</Description>
        <Description term="网段">{item.ip}</Description>
        <Description term="创建时间">
          {moment(Number(item.create_time)).format('YYYY-MM-DD HH:mm')}
        </Description>
        <Description term="描述">{item.desc ? item.desc : <a>编辑</a>}</Description>
      </DescriptionList>
    );

    const action = (
      <Fragment>
        <Button type="primary" onClick={this.onJoinClick}>
          加入
        </Button>
        <ButtonGroup>
          <Button>查看计算集群</Button>
          <Button>查看数据集群</Button>
          <Button onClick={this.onReturnClick}>返回</Button>
        </ButtonGroup>
      </Fragment>
    );

    const extra = (status, pcNum) => (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>状态</div>
          <div className={styles.heading}>{statusMapText[status]}</div>
        </Col>
        <Col xs={24} sm={10}>
          <div className={styles.textSecondary}>计算机</div>
          <div className={styles.heading}>{`${pcNum}台`}</div>
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
        render: val => `${val}GHz`,
      },
      {
        title: '内存',
        dataIndex: 'mem',
        key: 'mem',
        render: val => `${val}G`,
      },
      {
        title: '加入时间',
        dataIndex: 'join_time',
        key: 'join_time',
        render: val => <span>{moment(Number(val)).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render(val) {
          return <Badge status={statusMapUI[val]} text={statusMapText[val]} />;
        },
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
        extraContent={extra(detail.status, detail.pcs.length)}
        hiddenBreadcrumb
      >
        <Card title="PC" style={{ marginBottom: 24 }}>
          <Table pagination={false} dataSource={detail.pcs} columns={columns} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default NetDetail;
