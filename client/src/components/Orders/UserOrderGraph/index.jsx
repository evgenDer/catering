import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { isEmpty, isUndefined } from 'lodash';

import * as actions from 'actions/order';
import { DAYS } from 'constants/application';

import { OrderPropType } from '../sharedPropTypes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const UserOrderGraph = ({ getAllOrders }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    getAllOrders().then((orders) => {
      const graphData = orders.reduce((acc, curr) => {
        const day = DAYS[new Date(curr.createdAt).getDay()];
        const totalOrder = curr.count * curr.purchaseDish.cost;

        acc[day] = !isUndefined(acc[day]) ? totalOrder + acc[day] : totalOrder;

        return acc;
      }, {});

      setData({
        labels: Object.keys(graphData),
        datasets: [
          {
            label: 'Сумма заказа по дням недели',
            data: Object.values(graphData),
            borderColor: 'orange',
            backgroundColor: '#fb9500',
            innerHeight: '500px',
          },
        ],
      });
    });
  }, []);

  if (!isEmpty(data)) {
    return <Line options={options} data={data} width="500" height="300" />;
  }

  return <></>;
};

const mapStateToProps = (state) => ({
  orders: state.activeOrders,
});

const mapDispatchToProps = {
  getAllOrders: actions.getAllUserOrders,
};

UserOrderGraph.propTypes = {
  getAllOrders: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOrderGraph);
