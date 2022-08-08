import * as echarts from 'echarts';
import { useEffect, useState } from "react";
import ReactECharts from 'echarts-for-react';
import dynamic from 'next/dynamic'
import classNames from 'classnames';
import { faPlay, faShuffle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const randomData =  () => new Array(20).fill(0).map((_, i) => Math.floor(Math.random() * 30))

const Sorting = () => {
  const [data, setData] = useState<number[]>(randomData());
  const [prev, setPrev] = useState<number[]>(data);
  const [sorting, setSorting] = useState<boolean>(false);

  async function bubbleSort () {
    const arr = [...data]
    let toIndex = arr.length
    
    while (toIndex > 1) {
      toIndex--
      for (let i = 0; i < toIndex; i++) {
        // 如果前面的元素比後面的元素要大，則交換元素位置
        if (arr[i] > arr[i + 1]) {
          await sleep(300)
          setPrev([...arr])
          let tempValue = arr[i]
          arr[i] = arr[i + 1]
          arr[i + 1] = tempValue
          setData([...arr])
          console.log(arr)
        }
      }
    }
    setSorting(false)
  }

  function start() {

    if (sorting) return

    setSorting(true)
    bubbleSort()
  }

  function shuffle() {
    const data = randomData()
    setData(data)
    setPrev(data)
  }

  return (
    <div className="container py-10 min-h-[calc(100vh-100px)]">
      <div className='text-3xl'>Bubble Sort</div>
      <div className='mt-4'>
        是一種簡單的排序演算法。它重複地走訪過要排序的數列，一次比較兩個元素，如果它們的順序錯誤就把它們交換過來。走訪數列的工作是重複地進行直到沒有再需要交換，也就是說該數列已經排序完成。這個演算法的名字由來是因為越小的元素會經由交換慢慢「浮」到數列的頂端。
        <br/><br/>
        泡沫排序對n個項目需要O(n<sub>2</sub>)的比較次數，且可以原地排序。儘管這個演算法是最簡單瞭解和實作的排序演算法之一，但它對於包含大量的元素的數列排序是很沒有效率的。
        <br/><br/>
        泡沫排序演算法的運作如下：
        <br/><br/>
        <ul className='pl-10'>
          <li>比較相鄰的元素。如果第一個比第二個大，就交換它們兩個。</li>
          <li>對每一對相鄰元素作同樣的工作，從開始第一對到結尾的最後一對。這步做完後，最後的元素會是最大的數。</li>
          <li>針對所有的元素重複以上的步驟，除了最後一個。</li>
          <li>持續每次對越來越少的元素重複上面的步驟，直到沒有任何一對數字需要比較。</li>
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
    </div>
  )
}

export default dynamic(() => Promise.resolve(Sorting), {
  ssr: false
})