import React, { PureComponent, Component } from 'react';
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
  Steps
} from 'antd';

import TagSelect from 'components/TagSelect';
import StandardFormRow from 'components/StandardFormRow';

import styles from '../List/Applications.less';
import myStyles from './Monitor.less'
import { stat } from 'fs';
import { reverse } from 'lodash';
import Success from '../Result/Success';

const Step = Steps.Step;
const { Option } = Select;
const FormItem = Form.Item;
const pageSize = 12;

@Form.create()
@connect(({ mesos, loading }) => ({
  mesos,
  loading: loading.effects['mesos/fetchFrameworksByPage'],
}))
export default class Monitor extends Component {
  state = {
    visibleModalDetail: false,
  };

  showDetailModal = () => {
    this.setState({
      visibleModalDetail: true,
    });
  };

  handleModalCancel = () => {
    this.setState({
      visibleModalDetail: false,
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'mesos/fetchFrameworksByPage',
      payload: {
        currentPage: 1,
        pageSize: pageSize,
      },
    });
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
    return(
      percent + '%'
      //'Task 343/1000' + percent + '%'
    ) 
  };

  render() {
    const { form, mesos, loading } = this.props;
    const { list, pagination } = mesos.frameworks;

    const { getFieldDecorator } = form;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const paginationProps = {
      pageSize: pageSize,
      total: pagination.total,
      onChange: this.handlePageChange,
    };

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

    return (
      <div className={styles.filterCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="Group" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect onChange={this.handleFormSubmit}>
                    <TagSelect.Option value="cat1">IBIS</TagSelect.Option>
                    <TagSelect.Option value="cat2">LPJ</TagSelect.Option>
                    <TagSelect.Option value="cat3">BIOME</TagSelect.Option>
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
        <List
          rowKey="id"
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          loading={loading}
          pagination={paginationProps}
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card
                hoverable
                bodyStyle={{ paddingBottom: 20 }}
                actions={[
                  <Tooltip title="Detail">
                    <Button
                      type="default"
                      shape="circle"
                      icon="bars"
                      size="small"
                      onClick={this.showDetailModal}
                    />
                  </Tooltip>,
                  <Tooltip title="Add Agent">
                    <Button type="default" shape="circle" icon="plus" size="small" />
                  </Tooltip>,
                  <Tooltip title="Reduce Agent">
                    <Button type="default" shape="circle" icon="minus" size="small" />
                  </Tooltip>,
                  <Tooltip title="View Data">
                    <Button type="default" shape="circle" icon="area-chart" size="small" />
                  </Tooltip>,
                ]}
              >
                <Card.Meta
                  avatar={
                    <Avatar size="small" style={{ backgroundColor: '#87d068' }}>
                      W
                    </Avatar>
                  }
                  title={item.name}
                />
                <div className={styles.cardItemContent}>
                  <CardInfo activeUser={item.used_resources.cpus + 'GHz'} newUser="2" />
                </div>
                <div>
                  <Progress
                    percent={Number('100')}
                    status="active"
                    strokeWidth={6}
                    style={{ width: 200 }}
                  />
                </div>
              </Card>
              <Card>

              </Card>
            </List.Item>
          )}
        />
        <Modal
          title="ParallelProgramTest"
          visible={this.state.visibleModalDetail}
          footer={null}
          onCancel={this.handleModalCancel}
          width={800}
        >
          <section className={myStyles.instanceList}>
            <div className={myStyles.instanceInfo}>
              <Row>
                <Col span={6}>
                  <div className={myStyles.instanceTitle}>
                    Agent A
                  </div>
                </Col>
                <Col span={18}>
                  <Row>
                    <Col span={12}>
                      Create Time: XXXXXXX
                    </Col>
                    <Col span={12}>
                      IP: XXXXXXXXXX
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      CPU: 2GHz
                    </Col>
                    <Col span={12}>
                      Mem: 3GHz
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      TaskNum: 1000
                    </Col>
                    <Col span={12}>
                      CompleteTask: 36
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className={myStyles.instanceInner}>
              <Steps size="small" current={1}>
                <Step title="Staging" />
                                                                                                                    <Step title="Stage One" />
                <Step title="Stage Two" />
                <Step title="Stage Three"/>
              </Steps>
            </div>
            <div>
              <Progress 
                percent={30} 
                format={this.percentageFormat}
                //status="success "
                style={{ 
                  // width: 200 
                  // .ant-progress-text {
                  //   width: 10em;
                  // }
                }}
              />
            </div>
          </section>
          <section className={myStyles.instanceList}>
            <div className={myStyles.instanceInfo}>
              <Row>
                <Col span={6}>
                  <div className={myStyles.instanceTitle}>
                    Agent B
                  </div>
                </Col>
                <Col span={18}>
                  <Row>
                    <Col span={12}>
                      Create Time: XXXXXXX
                    </Col>
                    <Col span={12}>
                      IP: XXXXXXXXXX
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      CPU: 2GHz
                    </Col>
                    <Col span={12}>
                      Mem: 3GHz
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      TaskNum: 1000
                    </Col>
                    <Col span={12}>
                      CompleteTask: 36
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className={myStyles.instanceInner}>
              <Steps size="small" current={2}>
                <Step title="Staging" />
                <Step title="Stage One" />
                <Step title="Stage Two" />
                <Step title="Stage Three"/>
              </Steps>
            </div>
            <div>
              <Progress 
                percent={60} 
                format={this.percentageFormat}
                //status="success "
                style={{ 
                  // width: 200 
                  // .ant-progress-text {
                  //   width: 10em;
                  // }
                }}
              />
            </div>
          </section>
        </Modal>
      </div>
    );
  }
}
