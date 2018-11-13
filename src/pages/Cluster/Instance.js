import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Form,
  Card,
  Select,
  Button,
  Icon,
  Avatar,
  List,
  Tooltip,
  Dropdown,
  Menu,
  Progress,
  Modal,
  Steps,
} from 'antd';

import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import socketClient from 'socket.io-client';

import styles from './Instance.less';
import { stat } from 'fs';
import router from 'umi/router';
import setting from '@/defaultSettings';

let socket = socketClient(`http://${setting.backEndDB.ip}:${setting.backEndDB.port}`);
const Step = Steps.Step;
const { Option } = Select;
const FormItem = Form.Item;
const pageSize = 12;


const getStyleByStatus = (status) => {
  if (status == 'INIT') {
    return {
      progress: '#fff1b8',
      icon: 'caret-right',
      tooltip: 'Start instance'
    }
  } else if (status == 'START_PENDING') {
    return {
      progress: '#fff1b8',
      icon: 'loading',
      tooltip: 'Submit instance'
    }
  } else if (status == 'RUNNING') {
    return {
      progress: 'default',
      icon: 'delete',
      tooltip: 'Delete instance'
    }
  } else if (status == 'FINISHED_SUCCEED') {
    return {
      progress: '#52c41a',
      icon: 'delete',
      tooltip: 'Delete instance'
    }
  }
};

@Form.create()
@connect(({ instance, loading }) => ({
  instance,
  loading: loading.effects['instance/fetchInstance'],
}))
export default class Instance extends PureComponent {
  componentDidMount() {
    console.log('instance component didmount');
    const { dispatch } = this.props;

    dispatch({
      type: 'instance/fetchInstance',
    });

    
    socket.on('INSTANCE_PROG', data => {
      //console.log(data);
      dispatch({
        type: 'instance/getInstance',
        payload: data,
      });
    });
  }

  componentWillUnmount() {
    console.log('instance component unmount');
    //socket.close();
  }

  handlePageChange = (page, pageSize) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'mesos/fetchFrameworksByPage',
      payload: {
        currentPage: page,
        pageSize: pageSize,
      },
    });
  };

  percentageFormat = (percent, successPercent) => {
    return (
      percent + '%'
      //'Task 343/1000' + percent + '%'
    );
  };

  onStartClick = (id, status) => {
    if (status == 'INIT') {
      const { dispatch } = this.props;
      console.log('click start');
      dispatch({
        type: 'instance/start',
        payload: {
          id: id,
        },
      });
    }
  };

  onDetailClick = (id) => {
    router.push({
      pathname: '/cluster/instance-detail',
      query: {
        id: id,
      }
    })
  };

  render() {
    const {
      form,
      instance: { list },
      loading,
    } = this.props;
    //const { list, pagination } = mesos.frameworks;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    // const paginationProps = {
    //   pageSize: pageSize,
    //   total: pagination.total,
    //   onChange: this.handlePageChange,
    // };

    const CardInfo = ({ activeUser, newUser }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>CPU</p>
          <p>{activeUser}</p>
        </div>
        <div>
          <p>Agent</p>
          <p>{newUser}</p>
        </div>
      </div>
    );

    function progressNumber(status, totalNum, completeNum) {
      if (status == 'INIT' || status == 'START_PENDING') {
        return 0;
      } else if (status == 'RUNNING') {
        //console.log(`${completeNum}    ${totalNum}`)
        return Number(Math.round((completeNum / totalNum) * 100));
      } else if (status == 'FINISHED_SUCCEED') {
        return 100;
      }
    }

    const InstanceProgress = ({ status, totalNum, completeNum }) => (
      <Progress
        percent={progressNumber(status, totalNum, completeNum)}
        strokeWidth={6}
        strokeColor={getStyleByStatus(status).progress}
        style={{ width: '100%', marginTop: '10px' }}
      />
    );

    const onCreInstance = () => {
      router.push('/cluster/create/model-cfg');
    };

    return (
      <div>
        <div className={styles.filterCardList}>
          <Card bordered={false}>
            <Form layout="inline">
              <StandardFormRow title="Model" block style={{ paddingBottom: 11 }}>
                <FormItem>
                  {getFieldDecorator('category')(
                    <TagSelect onChange={this.handleFormSubmit}>
                      <TagSelect.Option value="cat1">IBIS</TagSelect.Option>
                      <TagSelect.Option value="cat2">LPJ</TagSelect.Option>
                      <TagSelect.Option value="cat3">BIOME-BGC</TagSelect.Option>
                    </TagSelect>
                  )}
                </FormItem>
              </StandardFormRow>
              <StandardFormRow title="Option" grid last>
                <Row gutter={16}>
                  <Col lg={8} md={10} sm={10} xs={24}>
                    <FormItem {...formItemLayout} label="Status">
                      {getFieldDecorator('author', {})(
                        <Select
                          onChange={this.handleFormSubmit}
                          placeholder="All"
                          style={{ maxWidth: 200, width: '100%' }}
                        >
                          <Option value="run">Running</Option>
                          <Option value="finish">Finish</Option>
                          <Option value="error">Error</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={8} md={10} sm={10} xs={24}>
                    <FormItem {...formItemLayout} label="Invoker">
                      {getFieldDecorator('rate', {})(
                        <Select
                          onChange={this.handleFormSubmit}
                          placeholder="All"
                          style={{ maxWidth: 200, width: '100%' }}
                        >
                          <Option value="good">OGMS</Option>
                          <Option value="normal">ZhongShan</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            </Form>
          </Card>
        </div>
        <Button
          className={styles.btnCreate}
          type="primary"
          icon="plus"
          size="large"
          onClick={onCreInstance}
        >
          Create Instance
        </Button>
        <List
          rowKey="id"
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          loading={loading}
          //pagination={paginationProps}
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card
                hoverable
                bodyStyle={{ paddingBottom: 20 }}
                actions={[
                  <Tooltip title={getStyleByStatus(item.status).tooltip}>
                    <Button
                      type="default"
                      shape="circle"
                      icon={getStyleByStatus(item.status).icon}
                      size="small"
                      onClick={() => this.onStartClick(item._id, item.status)}
                    />
                  </Tooltip>,
                  <Tooltip title="Detail">
                    <Button
                      type="default" 
                      shape="circle" 
                      icon="bars" 
                      size="small" 
                      onClick={() => this.onDetailClick(item._id)}/>
                  </Tooltip>,
                  <Tooltip title="Copy instance">
                    <Button type="default" shape="circle" icon="copy" size="small" />
                  </Tooltip>,
                  <Tooltip title="View Data">
                    <Button type="default" shape="circle" icon="area-chart" size="small" />
                  </Tooltip>,
                ]}
              >
                <Card.Meta
                  avatar={
                    <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
                      B
                    </Avatar>
                  }
                  title={item.name}
                />
                <div className={styles.cardItemContent}>
                  <CardInfo activeUser={'1GHz'} newUser="2" />
                </div>
                <div>
                  <InstanceProgress
                    status={item.status}
                    totalNum={item.numTasks.total}
                    completeNum={item.numTasks.completed}
                  />
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
