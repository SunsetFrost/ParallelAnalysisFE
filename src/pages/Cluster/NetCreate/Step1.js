import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker } from 'antd';
import router from 'umi/router';

import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ net }) => ({
  create: net.create,
}))
@Form.create()
class NetStep1 extends React.PureComponent {
  render() {
    const { form, dispatch, create } = this.props;
    const { getFieldDecorator, validateFields } = form;

    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          if (create.type === 'create') {
            dispatch({
              type: 'net/saveCreate',
              payload: {
                ...create,
                form: values,
              },
            });
          }

          router.push('/cluster/net-create/switch-cfg');
        }
      });
    };

    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="网络名称">
            {getFieldDecorator('name', {
              initialValue: 'test',
              // rules: [{ required: true, message: 'please input instance name' }],
            })(
              <Input disabled={create.type == 'join' ? true : false} placeholder="请输入网络名称" />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="网络类型">
            {getFieldDecorator('type', {
              initialValue: 'public',
              // rules: [{ required: true, message: 'please select' }],
            })(
              <Select disabled={create.type == 'join' ? true : false} defaultValue="public">
                <Option value="public">公有网络</Option>
                <Option value="private">私有网络</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="专有网段">
            {getFieldDecorator('ip', {
              initialValue: '10.36.0.0',
              // rules: [{ required: true, message: 'please input desc' }],
            })(<Input disabled={create.type == 'join' ? true : false} placeholder="请输入网段" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="描述">
            {getFieldDecorator('desc', {
              initialValue: '南京师范大学虚拟地理实验室服务器-陈旻',
              // rules: [{ required: true, message: 'please input desc' }],
            })(
              <Input disabled={create.type == 'join' ? true : false} placeholder="请输入网络描述" />
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>Instruction</h3>
          <h4>Choose Model</h4>
          <p>
            This is the detail explain of create function, This is the detail explain of create
            function, This is the detail explain of create function.
          </p>
          <h4>Choose calculate range</h4>
          <p>
            This is the detail explain of create function, This is the detail explain of create
            function, This is the detail explain of create function.
          </p>
        </div>
      </Fragment>
    );
  }
}

export default NetStep1;
