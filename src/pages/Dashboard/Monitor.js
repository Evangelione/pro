import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Row, Col, Card, Tooltip } from 'antd';
import { Pie, WaterWave, Gauge, TagCloud } from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';
import CountDown from '@/components/CountDown';
// import ActiveChart from '@/components/ActiveChart';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

import Authorized from '@/utils/Authorized';
import styles from './Monitor.less';

const { Secured } = Authorized;

const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 300);
});

@Secured(havePermissionAsync)
@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.models.monitor,
}))
class Monitor extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'monitor/fetchTags',
    });
  }

  render() {
    const { monitor } = this.props;
    // const {} = monitor;

    return (
      <GridContent>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card
              title={
                <FormattedMessage
                  id="app.monitor.trading-activity"
                  defaultMessage="Real-Time Trading Activity"
                />
              }
              bordered={false}
            >
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle={
                      <FormattedMessage
                        id="app.monitor.total-transactions"
                        defaultMessage="Total transactions today"
                      />
                    }
                    suffix=""
                    total={<CountDown target={targetTime} />}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle={
                      <FormattedMessage
                        id="app.monitor.sales-target"
                        defaultMessage="Sales target completion rate"
                      />
                    }
                    total="92%"
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle={
                      <FormattedMessage
                        id="app.monitor.remaining-time"
                        defaultMessage="Remaining time of activity"
                      />
                    }
                    total={<CountDown target={targetTime} />}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle={
                      <FormattedMessage
                        id="app.monitor.total-transactions-per-second"
                        defaultMessage="Total transactions per second"
                      />
                    }
                    suffix=""
                    total={numeral(234).format('0,0')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Tooltip
                  title={
                    <FormattedMessage
                      id="app.monitor.waiting-for-implementation"
                      defaultMessage="Waiting for implementation"
                    />
                  }
                >
                  <img
                    src={require('../../assets/61544004559_.pic_hd.jpg')}
                    alt="map"
                  />
                </Tooltip>
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card
              title={<FormattedMessage id="app.monitor.efficiency" defaultMessage="Efficiency" />}
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge
                title={formatMessage({ id: 'app.monitor.ratio', defaultMessage: 'Ratio' })}
                height={180}
                percent={92}
              />
            </Card>
            <Card
              title={
                <FormattedMessage
                  id="app.monitor.resource-surplus"
                  defaultMessage="Resource Surplus"
                />
              }
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              style={{marginBottom: 40}}
              bordered={false}
            >
              <WaterWave
                height={201}
                title={
                  <FormattedMessage id="app.monitor.fund-surplus" defaultMessage="Fund Surplus" />
                }
                percent={34}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Monitor;
