import React, { Component } from 'react';
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
} from 'antd';
import Ellipsis from 'components/Ellipsis';
import moment from 'moment';

import TagSelect from 'components/TagSelect';
import StandardFormRow from 'components/StandardFormRow';

import styles from '../List/Applications.less';
import stylesProject from '../List/Projects.less';

const { Option } = Select;
const FormItem = Form.Item;

@Form.create()
@connect(({ notebook, loading }) => ({
  notebook,
  loading: loading.effects['notebook/fetchNotebook'],
}))
export default class DataAnalysis extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'notebook/fetchNotebook',
    });
  }

  render() {
    const { form, loading, notebook: { list } } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const cardList = list ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              className={stylesProject.card}
              hoverable
              cover={
                <img
                  alt={item.name}
                  src={'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png'}
                  height={154}
                />
              }
            >
              <Card.Meta
                title={
                  <a href={item.href} target="view_notebook">
                    {item.name}
                  </a>
                }
                description={<Ellipsis lines={2}>{item.desc}</Ellipsis>}
              />
              <div className={stylesProject.cardItemContent}>
                <span>{moment(item.date).fromNow()}</span>
                <div className={stylesProject.avatarList}>
                  {item.author}
                  {/* <AvatarList size="mini">
                          {item.members.map((member, i) => (
                            <AvatarList.Item
                              key={`${item.id}-avatar-${i}`}
                              src={member.avatar}
                              tips={member.name}
                            />
                          ))}
                        </AvatarList> */}
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    ) : null;

    return (
      <div className={stylesProject.coverCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="Language" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect onChange={this.handleFormSubmit}>
                    <TagSelect.Option value="cat1">Python</TagSelect.Option>
                    <TagSelect.Option value="cat2">R</TagSelect.Option>
                    <TagSelect.Option value="cat3">Scala</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="Option" grid last>
              <Row gutter={16}>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="OrderBy">
                    {getFieldDecorator('author', {})(
                      <Select
                        onChange={this.handleFormSubmit}
                        placeholder="All"
                        style={{ maxWidth: 200, width: '100%' }}
                      >
                        <Option value="run">Popular</Option>
                        <Option value="finish">Name</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col lg={8} md={10} sm={10} xs={24}>
                  <FormItem {...formItemLayout} label="Author">
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
        <div className={stylesProject.cardList}>{cardList}</div>
      </div>
    );
  }
}
