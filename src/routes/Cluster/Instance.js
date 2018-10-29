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
  Steps,
} from 'antd';

import TagSelect from 'components/TagSelect';
import StandardFormRow from 'components/StandardFormRow';

import styles from '../List/Applications.less';
import myStyles from './Instance.less';
import { stat } from 'fs';
import { reverse } from 'lodash';
import Success from '../Result/Success';

const Step = Steps.Step;
const { Option } = Select;
const FormItem = Form.Item;
const pageSize = 12;

@Form.create()
@connect(({ instance, loading }) => ({
  instance,
  loading: loading.effects['instance/fetchInstance'],
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
      type: 'instance/fetchInstance',
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
    return (
      percent + '%'
      //'Task 343/1000' + percent + '%'
    );
  };

  render() {
    const { form, instance, loading } = this.props;
    //const { list, pagination } = mesos.frameworks;
    const list = instance.list;

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
          //pagination={paginationProps}
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
                  <CardInfo activeUser={item.cpu + 'GHz'} newUser="2" />
                </div>
                <div>
                  <Progress
                    percent={Number('100')}
                    status="active"
                    strokeWidth={6}
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                </div>
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
                <Col span={8}>
                  <div className={myStyles.instanceTitle}>OGMS_ubuntu_slave1</div>
                </Col>
                <Col span={16}>
                  <Row>
                    <Col span={12}>Create Time: 2018-04-18 13:53</Col>
                    <Col span={12}>IP: 172.21.212.122</Col>
                  </Row>
                  <Row>
                    <Col span={12}>CPU: 0GHz</Col>
                    <Col span={12}>Mem: 0GHz</Col>
                  </Row>
                  <Row>
                    <Col span={12}>TaskNum: 30</Col>
                    <Col span={12}>CompleteTask: 30</Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className={myStyles.instanceInner}>
              <Steps size="small" current={3}>
                <Step title="Staging" />
                <Step title="Stage One" />
                <Step title="Stage Three" />
                <Step title="Stage Three" />
              </Steps>
            </div>
            <div>
              <Progress
                percent={100}
                //format={this.percentageFormat}

                //status="success "
                style={{
                  // width: 200
                  // .ant-progress-text {
                  //   width: 10em;
                  margin: '12px 0px',
                }}
              />
            </div>
          </section>
          <section className={myStyles.instanceList}>
            <div className={myStyles.instanceInfo}>
              <Row>
                <Col span={8}>
                  <div className={myStyles.instanceTitle}>OGMS_ubuntu_slave2</div>
                </Col>
                <Col span={16}>
                  <Row>
                    <Col span={12}>Create Time: 2018-04-18 13:54</Col>
                    <Col span={12}>IP: 172.21.213.117</Col>
                  </Row>
                  <Row>
                    <Col span={12}>CPU: 0GHz</Col>
                    <Col span={12}>Mem: 0GHz</Col>
                  </Row>
                  <Row>
                    <Col span={12}>TaskNum: 30</Col>
                    <Col span={12}>CompleteTask: 30</Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className={myStyles.instanceInner}>
              <Steps size="small" current={3}>
                <Step title="Staging" />
                <Step title="Stage One" />
                <Step title="Stage Two" />
                <Step title="Stage Three" />
              </Steps>
            </div>
            <div>
              <Progress
                percent={100}
                //format={this.percentageFormat}
                //status="success "
                style={
                  {
                    //width: 220px
                    // .ant-progress-text {
                    //   width: 10em;
                    // }
                  }
                }
              />
            </div>
          </section>
        </Modal>
      </div>
    );
  }
}
