import Link from 'next/link';
import { useEffect, useState } from 'react'

interface Billionaire {
  id: string;
  industries: []
  name: string;
  netWorth: number;
  squareImage: string;
}

export default function Home() {
  const [billionaires, setBillionaires] = useState<Billionaire[]>();
  useEffect(() => {
    (async () => {
      const result = await (await fetch('https://billions-api.nomadcoders.workers.dev/')).json()
      setBillionaires(result);
    })()
  }, [])
  return (
    <div
      className='flex flex-wrap bg-zinc-800'
    >{
        billionaires?.map(billionaire =>
          <div
            className='flex flex-col p-4'
            key={billionaire.id}>
            <Link href={`person/${billionaire.id}`}>
              <img src={`${billionaire.squareImage}.png`} />
              <h4 className='text-white font-bold text-lg'>{billionaire.name}</h4>
              <span className='text-white '>{billionaire.netWorth}/{billionaire.industries}</span>
            </Link>
          </div>
        )
      }</div >
  )
}
