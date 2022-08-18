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

  async function selectionSort () {
    const arr = [...data]
    const n = arr.length
    
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j
        }
      }
      if (minIndex !== i) {
        await sleep(300)
        setPrev([...arr])
        let tempValue = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = tempValue
        setData([...arr])
      }
    }
    setSorting(false)
  }

  function start() {

    if (sorting) return

    setSorting(true)
    selectionSort()
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
        <div className='text-3xl'>Selection Sort</div>
        <div className='mt-4'>
          原理是從待排序的數列中，找出最小的數並放到排序的第一個位置，然後再從待排序的數列中，找出次小的數並放到排序的第二個位置，以此類推。
          <br/><br/>
          選擇排序演算法的運作如下：
          <br/><br/>
          <ul className='pl-10'>
            <li>從頭開始，每次找出最小的元素</li>
            <li>依序擺放至正確位置。</li>
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
              function selectionSort (arr) {
                const n = arr.length
                
                for (let i = 0; i < n - 1; i++) {
                  let minIndex = i
                  for (let j = i + 1; j < n; j++) {
                    if (arr[j] < arr[minIndex]) {
                      minIndex = j
                    }
                  }
                  if (minIndex !== i) {
                    let tempValue = arr[i]
                    arr[i] = arr[minIndex]
                    arr[minIndex] = tempValue
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