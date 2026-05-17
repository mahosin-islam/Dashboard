'use client';
import Link from 'next/link'; // Next.js এর লিঙ্কিং সিস্টেম ইমপোর্ট
import { Calendar, Clock, PhoneIncoming, ArrowRight } from 'lucide-react';

const CallList = ({ calls }) => {

 console.log('cals',calls)
    // সময় ফরম্যাট করার ফাংশন
    const formatDuration = (seconds) => {
        const totalSeconds = seconds || 0;
        if (isNaN(totalSeconds) || totalSeconds <= 0) return "0m 0s";
        const mins = Math.floor(totalSeconds / 60);
        const secs = Math.floor(totalSeconds % 60);
        return `${mins}m ${secs}s`;
    };
    // ডেট ফরম্যাট করার ফাংশন
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };



    return (
        <div className="bg-surface border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-semibold text-brand-text-muted uppercase tracking-wider">Call Name</th>
                            <th className="px-6 py-4 text-xs font-semibold text-brand-text-muted uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-brand-text-muted uppercase tracking-wider">Duration</th>
                            <th className="px-6 py-4 text-xs font-semibold text-brand-text-muted uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-brand-text-muted uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {calls.map((call, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-surface text-primary rounded-lg">
                                            <PhoneIncoming size={18} />
                                        </div>
                                        <span className="font-medium text-gray-900">{call.callName || 'Inbound Call'}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-brand-text-muted">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-brand-text-muted" />
                                        {formatDate(call.createdAt)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-brand-text-muted0">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} className="text-brand-text-muted" />
                                        {formatDuration(call.total_duration_seconds)}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                                        {call.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {/* Action Button - Link added here */}
                                    <Link href="/call-insights" status={call}>
                                        <button className="text-brand-text-muted group-hover:text-brand-text-black transition-all p-2 hover:bg-gray-100 rounded-full">
                                            <ArrowRight size={20}  />
                                             
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-100">
                {calls.map((call, index) => (
                    <div key={index} className="p-4 active:bg-gray-50">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 text-primary rounded-lg">
                                    <PhoneIncoming size={18} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{call.callName || 'Inbound Call'}</h4>
                                    <p className="text-xs text-gray-500">{formatDate(call.createdAt)}</p>
                                </div>
                            </div>
                            <span className="px-2 py-1 text-[10px] font-bold bg-green-100 text-green-700 rounded-full uppercase">
                                Completed
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-brand-text-muted">
                            <div className="flex items-center gap-1">
                                <Clock size={14} />
                                {formatDuration(call.duration)}
                            </div>
                            {/* Mobile Details Link added here */}
                            <Link href={`/call-insights?id=${call.id || index}&name=${call.callName || 'Inbound Call'}&duration=${call.duration}`}>
                                <button className="text-brand-text-muted group-hover:text-brand-black transition-all p-2 hover:bg-gray-100 rounded-full">
                                    <ArrowRight size={20} />
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
          
        </div>
    );
};

export default CallList;