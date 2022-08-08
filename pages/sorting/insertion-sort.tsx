import * as echarts from 'echarts';
import { useEffect, useState } from "react";
import ReactECharts from 'echarts-for-react';
import dynamic from 'next/dynamic'
import classNames from 'classnames';
import { faPlay, faShuffle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import hljs from 'highlight.js'
import Head from 'next/head';

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const randomData =  () => new Array(20).fill(0).map((_, i) => Math.floor(Math.random() * 30))

const Sorting = () => {
  const [data, setData] = useState<number[]>(randomData());
  const [prev, setPrev] = useState<number[]>(data);
  const [sorting, setSorting] = useState<boolean>(false);

  useEffect(() => {
    hljs.highlightAll();
  }, [])

  async function insertionSort () {
    const arr = [...data]
    const n = arr.length
    
    for (let i = 1; i < n; i++) {
      let j = i
      while (j > 0 && arr[j] < arr[j - 1]) {
        await sleep(300)
        setPrev([...arr])
        let tempValue = arr[j]
        arr[j] = arr[j - 1]
        arr[j - 1] = tempValue
        setData([...arr])
        j--
      }
    }
    setSorting(false)
  }

  function start() {

    if (sorting) return

    setSorting(true)
    insertionSort()
  }

  function shuffle() {
    const data = randomData()
    setData(data)
    setPrev(data)
  }

  return (
    <>
      <Head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/github.min.css'></link>
      </Head>
      <div className="container py-10 min-h-[calc(100vh-100px)]">
        <div className='text-3xl'>Insertion Sort</div>
        <div className='mt-4'>
          原理是逐一將原始資料加入已排序好資料中，並逐一與已排序好的資料作比較，找到對的位置插入。
          <br/><br/>
          插入排序演算法的運作如下：
          <br/><br/>
          <ul className='pl-10'>
            <li>從頭第一個元素開始歸類為已排序元素。</li>
            <li>往右第一個元素當key</li>
            <li>找出 key 元素應該被插入的位置</li>
          </ul>
        </div>
        <div className='text-xl mt-4'>Values:</div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-1'>[{data.map((v, i) => (
            <div key={i} className={classNames({ 'text-red-500': data[i] !== prev[i]})}>{v},</div>
          ))}]</div>
          <div className='flex gap-4 items-center'>
          <button onClick={() => start()} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center">
            <FontAwesomeIcon className='w-4 h-4' icon={faPlay} />Start
          </button>
          <button onClick={() => shuffle()} disabled={sorting} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center disabled:cursor-not-allowed">
            <FontAwesomeIcon className='w-4 h-4' icon={faShuffle} />Shuffle
          </button>
        </div>
        </div>
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
        <div>
          <div className='text-xl mt-8'>Implementation</div>
          <pre className='mt-4'>
            <code className='language-javascript'>
              {
              `
              function insertionSort (arr) {
                const n = arr.length
                
                for (let i = 1; i < n; i++) {
                  let j = i
                  while (j > 0 && arr[j] < arr[j - 1]) {
                    let tempValue = arr[j]
                    arr[j] = arr[j - 1]
                    arr[j - 1] = tempValue
                    j--
                  }
                }
              }
              `}
            </code>
          </pre>
        </div>
      </div>
    </>
  )
}

export default dynamic(() => Promise.resolve(Sorting), {
  ssr: false
})