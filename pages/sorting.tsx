import * as echarts from 'echarts';
import { useEffect, useState } from "react";
import ReactECharts from 'echarts-for-react';
import dynamic from 'next/dynamic'

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const initData = new Array(20).fill(0).map((_, i) => Math.floor(Math.random() * 30))

const Sorting = () => {
  const [data, setData] = useState<number[]>(initData);

  async function bubbleSort () {
    const arr = [...data]
    let toIndex = arr.length
    
    while (toIndex > 1) {
      toIndex--
      for (let i = 0; i < toIndex; i++) {
        // 如果前面的元素比後面的元素要大，則交換元素位置
        if (arr[i] > arr[i + 1]) {
          let tempValue = arr[i]
          arr[i] = arr[i + 1]
          arr[i + 1] = tempValue
          await sleep(500)
          setData([...arr])
          console.log(arr)
        }
      }
    }
  }

  return (
    <div className="container py-10 min-h-[calc(100vh-100px)]">
      <div className='text-3xl'>Sorting</div>
      <div className='flex gap-1'>{data.map((v, i) => (
        <div key={i}>{v}</div>
      ))}</div>
      <div onClick={() => bubbleSort()}>Bubble Sort</div>
      <ReactECharts
        style={{ height: '600px', width: '100%'}}
        option={{
          xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data,
              type: 'bar'
            }
          ]
        }}
      />
    </div>
  )
}

export default dynamic(() => Promise.resolve(Sorting), {
  ssr: false
})