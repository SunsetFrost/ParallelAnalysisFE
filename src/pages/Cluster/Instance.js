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

let socket;
const Step = Steps.Step;
const { Option } = Select;
const FormItem = Form.Item;
const pageSize = 12;

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

    socket = socketClient(`http://${setting.backEndDB.ip}:${setting.backEndDB.port}`);
    socket.on('INSTANCE_PROG', data => {
      console.log(data);
      dispatch({
        type: 'instance/getInstance',
        payload: data,
      });
    });
  }

  componentWillUnmount() {
    console.log('instance component unmount');
    socket.close();
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

  getStyleByStatus = (status, type) => {
    if (status == 'INIT') {
      if (type == 'progress') {
        return '#fff1b8';
      } else if (type == 'icon') {
        return 'caret-right';
      } else if (type == 'tooltip') {
        return 'Start instance';
      }
    } else if (status == 'START_PENDING') {
      if (type == 'progress') {
        return '#fff1b8';
      } else if (type == 'icon') {
        return 'loading';
      } else if (type == 'tooltip') {
        return 'Submit instance';
      }
    } else if (status == 'RUNNING') {
      if (type == 'progress') {
        return 'default';
      } else if (type == 'icon') {
        return 'delete';
      } else if (type == 'tooltip') {
        return 'Delete instance';
      }
    } else if (status == 'FINISHED_SUCCEED') {
      if (type == 'progress') {
        return '#52c41a';
      } else if (type == 'icon') {
        return 'delete';
      } else if (type == 'tooltip') {
        return 'Delete instance';
      }
    }
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
        strokeColor={this.getStyleByStatus(status, 'progress')}
        style={{ width: '100%', marginTop: '10px' }}
      />
    );

    const onCreInstance = () => {
      router.push('/cluster/create/model-cfg');
    };

    return (
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
                  <Tooltip title={this.getStyleByStatus(item.status, 'tooltip')}>
                    <Button
                      type="default"
                      shape="circle"
                      icon={this.getStyleByStatus(item.status, 'icon')}
                      size="small"
                      onClick={() => this.onStartClick(item._id, item.status)}
                    />
                  </Tooltip>,
                  <Tooltip title="Detail">
                    <Button type="default" shape="circle" icon="bars" size="small" />
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
