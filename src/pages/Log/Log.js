import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Badge,
  Form,
  Select,
} from 'antd';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './Log.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;
const FormItem = Form.Item;

@Form.create()
@connect(({ log, loading }) => ({
  log,
  loading: loading.effects['log/fetchLogs'],
}))
export default class Log extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'log/fetchLogs',
    });
  }

  render() {
    const { log: { list }, loading, form } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all" onChange={this.radioOnChange}>
          <RadioButton value="all">All</RadioButton>
          <RadioButton value="server">Server</RadioButton>
          <RadioButton value="instance">Instance</RadioButton>
          <RadioButton value="data">Data</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="log type"
          onSearch={() => {}}
        >
        </Search>
      </div>
    );

    const ListContent = ({log}) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Type</span>
          <p>{log.type}</p>
        </div>
        {/* <div className={styles.listContentItem}>
          <span>Target</span>
          <p>{'Instance110654'}</p>
        </div> */}
        <div className={styles.listContentItem}>
          <span>Action</span>
          <p>{log.action}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>User</span>
          <p>{log.user}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Time</span>
          <p>{moment(log.time).format('YYYY-MM-DD')}</p>
        </div>
      </div>
    )

    return (
      <div>
        <div className={styles.filterCardList}>
          <Card bordered={false}>
            <Form layout="inline">
              <StandardFormRow title="Type" block style={{ paddingBottom: 11 }}>
                <FormItem>
                  {getFieldDecorator('category')(
                    <TagSelect onChange={this.handleFormSubmit}>
                      <TagSelect.Option value="cat1">Server</TagSelect.Option>
                      <TagSelect.Option value="cat2">Instance</TagSelect.Option>
                      <TagSelect.Option value="cat3">Data</TagSelect.Option>
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
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="Log Info"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            //extra={ extraContent }
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
                        src={'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png'}
                        shape="square"
                        size="large"
                      />
                    }
                    title={ moment(item.time).format('YYYY-MM-DD hh-mm-ss') }
                    description='No detail information'
                  />
                  <ListContent log={ item } />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    )

  }
}
