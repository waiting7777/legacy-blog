import Link from "next/link"

const Sorting = () => {
  return (
    <div className="container py-10 min-h-[calc(100vh-100px)]">
      <div className="text-3xl">Sorting Algorithm</div>
      <div className="mt-4">
        在 Computer Sicence 中，Sorting Algorithm 是能將資料排序的演算法。<br/>
        通常用 Big O 來做時間空間的分析。<br/>
        另外根據排序結果有分為兩種 <b>Stable</b> / <b>Unstable</b>  <br/><br/>
        Stable 的排序在排序後依然可以維持同鍵值元素的相對位置，Unstable 的排序則無法。<br/>
      </div>
      <div className="text-3xl mt-4">常用排序演算法整理</div>
      <div className="mt-4">
        <table className="min-w-full text-center">
          <thead className="bg-white border-b">
              <tr>
                <th className="px-6 py-3 border border-gray-200 bg-gray-100 text-md leading-4 font-bold tracking-wider" rowSpan={2}>演算法</th>
                <th className="px-6 py-3 border border-gray-200 bg-gray-100 text-md leading-4 font-bold tracking-wider" colSpan={3}>Time Complexity</th>
                <th className="px-6 py-3 border border-gray-200 bg-gray-100 text-md leading-4 font-bold tracking-wider" rowSpan={2}>Space Complexity</th>
                <th className="px-6 py-3 border border-gray-200 bg-gray-100 text-md leading-4 font-bold tracking-wider" rowSpan={2}>Stable</th>
              </tr>
              <tr>
                <th className="px-6 py-3 border border-gray-200 bg-gray-100 text-md leading-4 font-bold tracking-wider">Best</th>
                <th className="px-6 py-3 border border-gray-200 bg-gray-100 text-md leading-4 font-bold tracking-wider">Worst</th>
                <th className="px-6 py-3 border border-gray-200 bg-gray-100 text-md leading-4 font-bold tracking-wider">Avg</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200 text-red-main">
                  <Link href="/sorting/bubble-sort">Bubble Sort</Link>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Ο(n)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Ο(n<sup>2</sup>)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Ο(n<sup>2</sup>)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">O(1)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Yes</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200 text-red-main">
                  <Link href="/sorting/selection-sort">Selection Sort</Link>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Ο(n<sup>2</sup>)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Ο(n<sup>2</sup>)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Ο(n<sup>2</sup>)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">O(1)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">No</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200 text-red-main">
                  <Link href="/sorting/insertion-sort">Insertion Sort</Link>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Ο(n)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Ο(n<sup>2</sup>)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Ο(n<sup>2</sup>)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">O(1)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Yes</td>
              </tr>
              {/* <tr className="hover:bg-gray-100">
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200 text-red-main">
                  <Link href="/sorting/merge-sort">Merge Sort</Link>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Ο(n)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Ο(n<sup>2</sup>)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Ο(n<sup>2</sup>)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">O(1)</td>
                <td className="px-6 py-2 whitespace-no-wrap border border-gray-200">Yes</td>
              </tr> */}
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default Sorting