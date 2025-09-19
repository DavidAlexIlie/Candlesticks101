import React, { useEffect, useState, useRef } from 'react';
import {
  ChartCanvas,
  Chart,
} from '@react-financial-charts/core';
import { discontinuousTimeScaleProvider } from '@react-financial-charts/scales';
import { timeFormat } from 'd3-time-format';
import { XAxis, YAxis } from "@react-financial-charts/axes";
import { CandlestickSeries } from "@react-financial-charts/series";

const generateNewCandle = (prev) => {
  const volatility = 0.02;
  const open = prev.close;
  const close = open * (1 + (Math.random() * 2 - 1) * volatility);
  const high = Math.max(open, close) * (1 + Math.random() * 0.01);
  const low = Math.min(open, close) * (1 - Math.random() * 0.01);
  const date = new Date(prev.date.getTime() + 10 * 1000);

  return { date, open, high, low, close };
};

const initialData = () => {
  const now = new Date();
  const data = [];
  let base = 100;
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 10 * 1000);
    const open = base;
    const close = open * (1 + (Math.random() * 2 - 1) * 0.02);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    base = close;
    data.push({ date, open, high, low, close });
  }
  return data;
};

const LiveStockChart = () => {
  const [data, setData] = useState(initialData());
  const chartRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newCandle = generateNewCandle(prevData[prevData.length - 1]);
        return [...prevData.slice(1), newCandle];
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const scaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
  const { data: chartData, xScale, xAccessor, displayXAccessor } = scaleProvider(data);
  const start = xAccessor(chartData[0]);
  const end = xAccessor(chartData[chartData.length - 1]);
  const xExtents = [start, end];

  return (
    <ChartCanvas
      height={400}
      width={800}
      ratio={1}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      data={chartData}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}
    >
      <Chart id={1} yExtents={d => [d.high, d.low]}>
        <XAxis showGridLines tickFormat={timeFormat("%H:%M:%S")} />
        <YAxis showGridLines />

        <CandlestickSeries />
      </Chart>
    </ChartCanvas>
  );
};

export default LiveStockChart;
