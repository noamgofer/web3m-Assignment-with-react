import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";

export default function CoinChart(props) {
    
  const [filteredData,setFilteredData]=useState([...props.data])
  const [minValue,setMinValue] = useState(0)
  const [maxValue,setMaxValue] =useState(1400000000000)
  const [chartState, setChartState] = useState({
   options: {
      chart: {
        foreColor:"rgb(216, 225, 235)",
        id: "basic-bar",
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 300
            }
        },
        dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 1,
            opacity: 0.5
        },
      },
      plotOptions: {
        bar: {
            distributed: true, 
            horizontal: true,
            barHeight: '85%',
        },
      },
    fill: {
        colors: [function({ value, seriesIndex, w }) {
            if (seriesIndex < 1) {
                return '#A7E6FF'
            } else {
                return '#37B7C3'
            }
            }],
            type: "gradient",
            gradient: {
            shadeIntensity: 0.2,
            opacityFrom: 0.7,
            opacityTo: 0.7,
            stops: [0, 50, 100],
            }
    },
    xaxis: {
    categories: []
    },
    dataLabels: {
    enabled: false
    },
    legend: {
    show: false
    }
    },
    series: [
        {
        name: "Market Cap",
        data: []
        }]
    });
    useEffect(() => {
    
        const filtered = filteredData.filter(val => val.market_cap >= minValue && val.market_cap <=maxValue)
        const categories = filtered.map(val => val.name);
        const data = filtered.map(val => val.market_cap);
    
        setChartState({
          options: {
            ...chartState.options,
            xaxis: {
              categories: categories
            }
          },
          series: [{
            name: "Market Cap",
            data: data
          }]
        });
    }, [maxValue,minValue]);

  return (
    <div className="chart-container">
        <div className="mixed-chart">
            <div className='filter-container'> 
                <p>Chart range by market cap:</p>
                <input 
                    type="range" //APEX
                    className='rangeInput custom-range'
                    min={0} 
                    max={maxValue}
                    value={minValue}
                    onChange={(e)=>{setMinValue(e.target.value)}}
                />
                <label htmlFor="minVal">Min: {minValue}</label>
                <br />
                <input 
                    type="range" 
                    className='rangeInput custom-range'
                    min={minValue}
                    max={1400000000000} 
                    value={maxValue}
                    onChange={(e)=>{setMaxValue(e.target.value)}}
                />
                <label htmlFor="maxVal">Max: {maxValue}</label><br />
            </div>


            <Chart
                options={chartState.options}
                series={chartState.series}
                type="bar"
                width="1000"
                height="500"

            />
        </div>
    </div>
  );
}
