'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Phone, Clock, Stars, Calendar } from 'lucide-react';
import { getDashboardStats } from '@/services/api';
import Loading from '@/app/loading';

const StatCards = () => {
    const { userId } = useUser(); // Context থেকে বর্তমান ইউজার (u1/u2) নিচ্ছি
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log('useid', userId)
        const fetchStats = async () => {

            setLoading(true);
            const data = await getDashboardStats(userId);

            setStatsData(data);

            setLoading(false);
        };

        fetchStats();
    }, [userId]); // userId পরিবর্তন হলেই এই ফাংশন আবার কল হবে

    if (loading) return <Loading></Loading>;

    // API থেকে আসা ডেটা সাজানো
    const cards = [
        { title: 'Total Sessions', value: statsData?.totalSessions || 0, icon: <Phone size={20} />, color: 'text-red-500', bg: 'bg-red-50' },
        { title: 'Average Duration', value: statsData?.averageDuration || '0', icon: <Clock size={20} />, color: 'text-cyan-500', bg: 'bg-cyan-50' },
        { title: 'AI Used', value: `${statsData?.totalAIInteractions || 0} times`, icon: <Stars size={20} />, color: 'text-green-500', bg: 'bg-green-50' },
        {
            title: 'Last Session',
            value: statsData?.lastSession?.length > 0
                ? new Date(statsData.lastSession[0]).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })
                : '-',
            icon: <Calendar size={20} />,
            color: 'text-purple-500',
            bg: 'bg-purple-50'
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => (
                <div key={index} className="bg-white p-5 border border-gray-100 rounded-2xl flex items-center gap-4 shadow-sm">
                    <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                        {card.icon}
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">{card.title}</p>
                        <p className="text-lg font-bold text-gray-900">{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatCards;