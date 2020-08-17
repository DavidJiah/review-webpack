/*
 * @Date: 2020-07-24 17:19:59
 * @LastEditTime: 2020-08-17 16:25:15
 */

import React, { useState, useEffect } from 'react';
import success from '@/assets/images/pay/success.png';
import { Button } from 'antd';

const RechargeSuccess = (props) => {
  const { history, location } = props;
  useEffect(() => {
    if (
      !location?.state?.from ||
      location.state.from !== '/admin/fund/recharge'
    ) {
      history.push('/admin/fund/recharge');
    }
  }, []);

  return (
    <div className="fund-recharge">
      <div className="fund-recharge_header">{'资金管理 > 充值 > 充值成功'}</div>
      <div className="fund-recharge_content">
        <p className="fund-recharge_content-info">
          温馨提示：受银行处理时间影响，采用外汇或者线下汇款方式到账会有延误，强烈建议采用支付宝、网银实时到账。线下汇款直接向我司专属账户汇款，公司每天将按汇款
          时间顺序分两次加款，上午10: 00 ~ 11: 00, 下午14: 00 ~ 15:
          00,请避免北京时间21: 00 ~ 00:
          00进行汇款，否则受银行出账时间影响，可能出现延迟一天到账情况。
        </p>

        <p className="fund-recharge_content-p1">恭喜您充值成功！</p>
        <div style={{ textAlign: 'center' }}>
          <img src={success} />
        </div>
        <p className="fund-recharge_content-p2">
          恭喜您充值申请成功! 请及时汇款并上传银行回单
        </p>
        <div style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            ghost
            onClick={() => history.push('/admin/fund/cashFlow')}
          >
            查看资金流水
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RechargeSuccess;
