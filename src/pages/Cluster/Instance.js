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

import styles from './Instance.less';
import { stat } from 'fs';
import router from 'umi/router';

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
    const { dispatch } = this.props;
    console.log('dispath works');
    dispatch({
      type: 'instance/fetchInstance',
    });
    // dispatch({
    //   type: 'instance/changeInstanceOrder',
    //   payload: 'createTime', 
    // });
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

  getProgressStyleByStatus = (status) => {
    if(status == 'INIT') {
      return '#ff7a45';
    }
  }

  render() {
    const { form, instance: { list }, loading } = this.props;
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

    const InstanceProgress = ({ status, totalNum, completeNum}) => (
      <Progress
        percent={Number('23')}
        strokeWidth={6}
        strokeColor={this.getProgressStyleByStatus(status)}
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
        <Button className={ styles.btnCreate } type="primary" icon="plus" size='large' onClick={onCreInstance} >Create Instance</Button>
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
                  <CardInfo activeUser={'1GHz'} newUser="2" />
                </div>
                <div>
                  <InstanceProgress status='INIT' totalNum={100} completeNum={10} />
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}