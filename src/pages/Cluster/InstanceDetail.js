import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
    Button,
    Icon,
    Card,
    Row,
    Col,
    Divider,
    Progress,
    Table,
    Badge,
} from 'antd';
import router from 'umi/router';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from './InstanceDetail.less';
import ButtonGroup from 'antd/lib/button/button-group';

const { Description } = DescriptionList;

const headerContent = (detail) => (
    <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="Model">{detail.modelCfg.models[0]}</Description>
        <Description term="Creator">{detail.user}</Description>
        <Description term="Start">{moment(detail.time.start).format('YYYY-MM-DD H:m')}</Description>
        <Description term="During">{moment(detail.time.end).format('YYYY-MM-DD H:m')}</Description>
        <Description term="Data">DataA</Description>
        <Description term="Parallel mode">Standalone</Description>
        <Description term="Completed Task">{detail.numTasks.completed}</Description>
        <Description term="Failed Task">{detail.numTasks.failed}</Description>
    </DescriptionList>
);

const extra = (status, taskNum) => (
    <Row>
      <Col xs={24} sm={12}>
        <div className={styles.textSecondary}>Status</div>
        <div className={styles.heading}>{status}</div>
      </Col>
      <Col xs={24} sm={12}>
        <div className={styles.textSecondary}>Tasks</div>
        <div className={styles.heading}>{taskNum}</div>
      </Col>
    </Row>
);

const server = (server) => {
    return (
    <DescriptionList size="small" style={{ marginBottom: 16 }} title={server.name}>
        <Description term="Total Task">{server.task.total}</Description>
        <Description term="Complete Task">{server.task.complete}</Description>
        <Description term="Failed Task">{server.task.failed}</Description>
        <Description term="Host">{server.hostport}</Description>
        <Description term="CPU">{server.resource.cpu}</Description>
        <Description term="Memory">{server.resource.memory}</Description>
        <Progress
          percent={Number(Math.round((server.task.complete / server.task.total) * 100))}
          strokeWidth={6}
          style={{ width: '90%', margin: '2px 10px' }}
        ></Progress>
    </DescriptionList>)
}

const getStatus = (status) => {
    if(status == 'FINISHED_SUCCEED') {
        return 'Succeed';
    }
    return status;
}

const advancedOperation1 = [
    {
      id: '1',
      host: '172.21.212.122',
      server: 'OGMS_ubuntu_slave1',
      status: 'success',
      time: '2017-10-03  19:23:12',
    },
    {
        id: '2',
        host: '172.21.212.122',
        server: 'OGMS_ubuntu_slave1',
        status: 'success',
        time: '2017-10-03  19:23:12',
    },
    {
        id: '3',
        host: '172.21.212.122',
        server: 'OGMS_ubuntu_slave1',
        status: 'success',
        time: '2017-10-03  19:23:12',
    },
    {
        id: '4',
        host: '172.21.212.122',
        server: 'OGMS_ubuntu_slave1',
        status: 'success',
        time: '2017-10-03  19:23:12',
    },
    {
        id: '5',
        host: '172.21.212.122',
        server: 'OGMS_ubuntu_slave1',
        status: 'success',
        time: '2017-10-03  19:23:12',
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Host',
      dataIndex: 'host',
      key: 'host',
    },
    {
      title: 'Server Name',
      dataIndex: 'server',
      key: 'server',
    },
    {
      title: 'Create Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status =>
      status === 'success' ? (
        <Badge status="success" text="success" />
      ) : (
        <Badge status="error" text="error" />
      ),
    },
  ];

@connect(({ instance, loading }) => ({
    instance,
    loading: loading.effects['instance/fetchInstanceById'],
}))
export default class InstanceDetail extends PureComponent {
    onBack = () => {
        router.push('/cluster/instance');
    };

    render() {
        const { instance: { detail, list }, loading } = this.props;
        const newDetail = list.filter(item => {
            if(item._id === detail.id) {
                return true;
            } else {
                return false;
            }
        })[0]

        const action = (
            <Fragment>
                <ButtonGroup>
                    <Button>Delete</Button>
                    <Button onClick={() => {this.onBack()}}>Back to Instance</Button>
                </ButtonGroup>
                <Button type="primary">Run Again</Button>
            </Fragment>
        )

        return (
            <PageHeaderWrapper
              title={newDetail.name}
              logo={
                <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
              }
              content={headerContent(newDetail)}
              action={action}
              extraContent={extra(getStatus(newDetail.status), newDetail.numTasks.total)}
              hiddenBreadcrumb={true}
            >
              <Card title="Server" style={{ marginBottom: 24 }}>
                {server(newDetail.server[0])}
                <Divider style={{ margin: '28px 0' }} />
                {server(newDetail.server[1])}
                <Divider style={{ margin: '28px 0' }} />
                {server(newDetail.server[2])}
              </Card>
              <Card title="Task">
                <Table
                    pagination={false}
                    dataSource={advancedOperation1}
                    columns={columns}
                />
              </Card>
            </PageHeaderWrapper>
        )
    }
}