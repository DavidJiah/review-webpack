/*
 * @Author: Dad
 * @Date: 2020-07-13 19:32:18
 * @LastEditors: Dad
 * @LastEditTime: 2020-08-18 15:00:57
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { AccountInfo } from '@/const';
import MapForm from '@/components/MapForm';
import moment from 'moment';
import _ from 'lodash';
import { Form, Button, Table, Pagination, Icon, Select, Row, Col } from 'antd';
import noData from '@/assets/images/operations/unData.png';

const { CstInput, CstSelect } = MapForm;

const account = ({ dispatch, list, total, loading }) => {
  const [form, setForm] = useState({});
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (_.isEmpty(form)) return;
    initList();
  }, [form]);

  useEffect(() => {
    if (_.isEmpty(form)) return;
    initList();
  }, [currPage]);

  const dispatchInit = (callback) => {
    callback && callback();
    currPage === 1 ? initList() : setCurrPage(1);
  };

  const initList = () => {
    const data = form?.getFieldsValue();
    dispatch({
      type: 'businessInfo/fetchActList',
      queryParams: {
        currPage,
        pageSize,
        ...data,
      },
    });
  };

  /** 表头 */
  const columns = [
    {
      title: '登录账号',
      dataIndex: 'act',
      width: '16%',
      editable: true,
    },
    {
      title: '昵称/名称',
      dataIndex: 'name',
      width: '16%',
      editable: true,
    },
    {
      title: '角色',
      dataIndex: 'role',
      width: '10%',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'type',
      width: '10%',
      editable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '16%',
      editable: true,
    },
    {
      title: '上次登录时间',
      dataIndex: 'lastTime',
      width: '16%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ];

  return (
    <>
      <div className="shop-item_header">业务管理 {'>'} 账号信息</div>

      <div className="reconciliation">
        <div className="reconciliation-Info">
          <MapForm
            onCreate={(form) => setForm(form)}
            layout="inline"
            className="filter-form"
          >
            <Row>
              <Col span={7}>
                <CstInput
                  label="登录账号"
                  name="act"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  customProps={{
                    placeholder: '请输入登录账号',
                    size: 'large',
                  }}
                />
              </Col>
              <Col span={7}>
                <CstSelect
                  label="角色"
                  name="role"
                  style={{ width: 260 }}
                  customProps={{
                    placeholder: '选择角色',
                  }}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  {_.map(AccountInfo, (item, key) => (
                    <Select.Option key={key} value={parseInt(key)}>
                      {item}
                    </Select.Option>
                  ))}
                </CstSelect>
              </Col>
              <Col span={6} offset={4}>
                <Form.Item>
                  <Button
                    icon="search"
                    type="primary"
                    onClick={() => dispatchInit()}
                  >
                    查询
                  </Button>
                  <Button
                    icon="undo"
                    style={{ marginLeft: 20 }}
                    onClick={() => form?.resetFields()}
                  >
                    重置
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </MapForm>
        </div>
        <div className="reconciliation-table">
          <div className="reconciliation-table--title">
            <span className="reconciliation-table--desc">账号列表</span>
            <Button type="link" className="reconciliation-table--name">
              <Icon type="plus" style={{ fontWeight: 600 }} />
              添加账号
            </Button>
          </div>
          <Table
            // dataSource={list}
            columns={columns}
            pagination={false}
            scroll={{ x: 1300, y: 'calc(100vh - 480px)' }}
            className="global-table"
            onHeaderRow={() => ({
              className: 'global-table_head-tr',
            })}
            locale={{
              emptyText: (
                <div className="cash-flow_empty">
                  <img width="218px" height="134px" src={noData} />
                  <p className="cash-flow_empty-text">暂无账号信息</p>
                </div>
              ),
            }}
          />
          {/* {_.isEmpty(list) ? null : (
            <div className="cash-flow_pagination">
              <Pagination
                disabled={loading}
                current={currPage}
                onChange={(currPage) => setCurrPage(currPage)}
                defaultPageSize={pageSize}
                total={total}
              />
              <span style={{ color: '#CCCCCC', marginLeft: '10px' }}>
                共 {total} 条 ,每页 {pageSize} 条
              </span>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default connect(({ transaction: { list, total } = {}, loading }) => ({
  list,
  total,
  loading: loading.effects['businessInfo/fetchActList'],
}))(account);
