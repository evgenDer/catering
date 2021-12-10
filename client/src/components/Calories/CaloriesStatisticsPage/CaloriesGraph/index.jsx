import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Typography } from '@mui/material';

import * as actions from 'actions/consumption';

import { appColors } from 'theme';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      display: true,
      align: 'start',
      position: 'right',
    },
  },
};

const CaloriesGraph = ({ getAllConsumption }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    getAllConsumption().then((consumption) => {
      const graphData = Object.values(consumption).reduce((acc, curr) => {
        const { protein, fat, carbohydrates } = curr.total;

        if (isEmpty(acc)) {
          return {
            protein,
            fat,
            carbohydrates,
          };
        }

        return {
          protein: acc.protein + protein,
          carbohydrates: acc.carbohydrates + carbohydrates,
          fat: acc.fat + fat,
        };
      }, {});

      if (!isEmpty(graphData)) {
        setData({
          labels: ['Белки', 'Углеводы', 'Жиры'],
          datasets: [
            {
              label: '# of Votes',
              data: [graphData.protein, graphData.carbohydrates, graphData.fat],
              backgroundColor: [
                appColors.chartProteinColor,
                appColors.chartFatColor,
                appColors.chartCarbohydratesColor,
              ],
            },
          ],
        });
      }
    });
  }, []);

  if (!isEmpty(data)) {
    return (
      <div style={{ width: '500px', height: '400px' }}>
        <Pie options={options} data={data} height="100%" width="100%" />
      </div>
    );
  }

  return <Typography>Данные еще загружаются или отсутствуют</Typography>;
};

const mapDispatchToProps = {
  getAllConsumption: actions.getAllConsumption,
};

CaloriesGraph.propTypes = {
  getAllConsumption: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(CaloriesGraph);
