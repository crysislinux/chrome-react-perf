/* eslint-disable no-undef, no-console */
import fs from 'fs';
import shapeMeasurements from '../../app/utils/shapeMeasurements';

describe('Output measurements with functions supplied by react-addons-perf', () => {
  const measurementsData = JSON.parse(fs.readFileSync(`${__dirname}/measurements.data`, 'utf8'));

  it('getWasted', () => {
    const wasted = shapeMeasurements.getWasted(measurementsData);
    expect(wasted).toEqual([
      [{
        'Owner > component': 'Motion > Motion',
        'Wasted time (ms)': 466.660000115633,
        Instances: 1068
      }],
      'Total time: 1770.44 ms'
    ]);
  });
});
