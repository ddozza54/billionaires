import { useParams } from 'next/navigation';
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

interface Person {
    id: string;
    name: string;
    contry: string;
    squareImage: string;
    industries: [];
    companyName: string;
    netWorth: number;
    bio: [];
}

export default function Person() {
    const router = useRouter();
    const fetchPerson = (id) => {
        if (id) return fetch(`https://billions-api.nomadcoders.workers.dev/person/${id}`).then(res => res.json())
    }
    const { isLoading, data } = useQuery({
        queryKey: ['billionaire'], queryFn: () => fetchPerson(router.query.id)
    });
    return (isLoading ? <span>Loading....</span>
        : <div className='flex flex-col '>
            <img
                src={`${data.squareImage}.png`}
                alt="Billionaire"
                className='w-80'
            />
            <span className='text-white'>name: {data?.name}</span>
            <span className='text-white'>country: {data?.country}</span>
            <span className='text-white'>About: {...data?.about}</span>
        </div>

    )
}


