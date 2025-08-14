'use client'

import { Button } from '@/components/ui/button';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { aiToolsList } from './AiToolsList';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

function History() {
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetHistory();
  }, []);

  const GetHistory = async () => {
    setLoading(true);
    const result = await axios.get('/api/history');
    console.log(result.data);
    setUserHistory(result.data);
    setLoading(false);
  };

  const GetAgentName = (path: string) => {
    const agent = aiToolsList.find((item) => item.path === path);
    return agent;
  };

  return (
    <div className="mt-5 p-5 border rounded-xl">
      <h2 className="font-bold text-lg">Previous History</h2>
      <p>What you previously worked on, you can find here</p>

      {loading && (
        <div>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div key={index}>
              <Skeleton className="h-[50px] mt-4 w-full rounded-md" />
            </div>
          ))}
        </div>
      )}

      {userHistory?.length === 0 && !loading ? (
        <div className="flex items-center justify-center flex-col mt-6">
          <Image src={'/idea.png'} alt="idea" width={70} height={70} />
          <h2>You do not have any history</h2>
          <Button className="mt-5">Explore AI Tools</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-5">
          {userHistory?.map((history: any, index: number) => {
            const agent = GetAgentName(history?.aiAgentType);
            const iconSrc = agent?.icon || '/placeholder.png'; // fallback

            return (
              <Link
                key={index}
                href={`${history?.aiAgentType}/${history?.recordId}`}
                className="flex items-start gap-4 border p-3 rounded-lg hover:bg-gray-50 transition"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <Image
                    src={iconSrc}
                    alt={agent?.name || 'AI Tool'}
                    width={40}
                    height={40}
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col">
                  <h2 className="font-semibold">{agent?.name}</h2>
                  <span className="text-sm text-gray-500">{history.createdAt}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;
