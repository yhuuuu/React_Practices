// Bar chart component
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({title}) => {

    const chartRef = useRef(null)

    useEffect(() => {
        // const chartDom = document.getElementById('main');
        // render at div
        const chartDom = chartRef.current

        // graph initialization  
        const myChart = echarts.init(chartDom);

        // prepare graph 
        const option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: ['Vue', 'React', 'Angular']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [20, 40, 70],
                    type: 'bar'
                }
            ]
        };

        option && myChart.setOption(option);

    }, [])

    return (
        <>
            {/* need to set the wide and height inorder to render the graph */}
            <div ref={chartRef} style={{ wide: '500px', height: '400px' }}></div>
        </>

    )
}

export default BarChart