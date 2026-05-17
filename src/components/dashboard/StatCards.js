'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Phone, Clock, Stars, Calendar } from 'lucide-react';
import { getDashboardStats } from '@/services/api';
import Loading from '@/app/loading';

const StatCards = () => {
    const { userId } = useUser(); // Fetch current user (u1/u2) from context
    const [statsData, setStatsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('useid', userId);
        const fetchStats = async () => {
            setLoading(true);
            const data = await getDashboardStats(userId);
            setStatsData(data);
            setLoading(false);
        };

        fetchStats();
    }, [userId]); // Re-fetch stats whenever userId changes

    if (loading) return <Loading></Loading>;

    // Structure the card data coming from the API
    const cards = [
        { 
            title: 'Total Sessions', 
            value: statsData?.totalSessions || 0, 
            icon: <Phone size={20} />, 
            color: 'text-status-error', 
            bg: 'bg-status-error-bg' 
        },
        { 
            title: 'Average Duration', 
            value: statsData?.averageDuration || '0', 
            icon: <Clock size={20} />, 
            color: 'text-primary', 
            bg: 'bg-primary-light' 
        },
        { 
            title: 'AI Used', 
            value: `${statsData?.totalAIInteractions || 0} times`, 
            icon: <Stars size={20} />, 
            color: 'text-status-success', 
            bg: 'bg-status-success-bg' 
        },
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
            color: 'text-brand-text-main',
            bg: 'bg-surface-alt'
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => (
                <div key={index} className="bg-surface p-5 border border-surface-border rounded-hintro flex items-center gap-4 shadow-sm">
                    <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                        {card.icon}
                    </div>
                    <div>
                        <p className="text-xs text-brand-text-muted font-medium">{card.title}</p>
                        <p className="text-lg font-bold text-brand-text-main">{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatCards;