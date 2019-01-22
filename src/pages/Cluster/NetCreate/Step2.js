import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, InputNumber, Button, Alert, Divider, Select, Switch } from 'antd';
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

@connect(({ net, loading, user }) => ({
  submitting: loading.effects['net/add'],
  create: net.create,
}))
@Form.create()
class NetStep2 extends React.PureComponent {
  render() {
    const { form, dispatch, create, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;

    const onPrev = () => {
      router.push('/cluster/net-create/net-cfg');
    };

    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          if (create.type === 'create') {
            const newCreate = Object.assign(
              {
                pcs: {
                  ...values,
                },
              },
              create.value
            );

            dispatch({
              type: 'net/addNet',
              payload: newCreate,
            });
          } else if (create.type === 'join') {
            dispatch({
              type: 'net/addPC',
              payload: {
                id: create.value.net._id,
                pc: {
                  ...values,
                },
              },
            });
          }
        }
      });
    };

    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="服务器名称">
            {getFieldDecorator('hostname', {
              initialValue: 'ParallelMaster',
              // rules: [{ required: true, message: 'please input instance name' }],
            })(<Input placeholder="请输入交换机名称" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="IP">
            {getFieldDecorator('ip', {
              initialValue: '172.21.102.32',
              // rules: [{ required: true, message: 'please input instance name' }],
            })(<Input placeholder="请输入IP" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="处理器">
            <Input.Group compact>
              <Select defaultValue="fix" style={{ width: 100 }}>
                <Option value="fix">固定</Option>
                <Option value="min">最小</Option>
                <Option value="min">最大</Option>
              </Select>
              {getFieldDecorator('cpu', {
                initialValue: 1.2,
                rules: [{ required: true, message: 'please input cpu num' }],
              })(<InputNumber style={{ width: 'calc(100% - 100px)' }} placeholder="cpu num" />)}
            </Input.Group>
          </Form.Item>
          <Form.Item {...formItemLayout} label="内存">
            <Input.Group compact>
              <Select defaultValue="fix" style={{ width: 100 }}>
                <Option value="fix">固定</Option>
                <Option value="min">最小</Option>
                <Option value="min">最大</Option>
              </Select>
              {getFieldDecorator('mem', {
                initialValue: 2.5,
                rules: [{ required: true, message: 'please input memory num' }],
              })(<InputNumber style={{ width: 'calc(100% - 100px)' }} placeholder="memory num" />)}
            </Input.Group>
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 8 }}
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button onClick={onPrev}>上一步</Button>
            <Button
              type="primary"
              style={{ marginLeft: 20 }}
              onClick={onValidateForm}
              loading={submitting}
            >
              提交
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>Instruction</h3>
          <h4>Parallel Mode</h4>
          <p>
            This is the detail explain of create function, This is the detail explain of create
            function, This is the detail explain of create function.
          </p>
          <h4>Advance Config</h4>
          <p>
            This is the detail explain of create function, This is the detail explain of create
            function, This is the detail explain of create function.
          </p>
        </div>
      </Fragment>
    );
  }
}

export default NetStep2;
