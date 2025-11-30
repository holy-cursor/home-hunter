"use client";

import { useState, useEffect } from "react";
import { store, User } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, X, AlertTriangle, Trash2, ExternalLink, Loader2, Shield } from "lucide-react";

export const dynamic = 'force-dynamic';

interface Report {
    id: string;
    listing_id: string;
    reporter_id: string;
    reason: string;
    details: string;
    status: 'pending' | 'reviewed' | 'resolved';
    created_at: string;
    listing?: {
        address: string;
        seller_id: string;
    };
    reporter?: {
        name: string;
    };
}

export default function AdminReports() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [reports, setReports] = useState<Report[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const currentUser = await store.getCurrentUser();
            if (!currentUser || !currentUser.isAdmin) {
                router.push("/");
                return;
            }
            setUser(currentUser);

            const allReports = await store.getReports();
            setReports(allReports);
            setIsLoading(false);
        };
        fetchData();
    }, [router]);

    const handleUpdateStatus = async (reportId: string, newStatus: 'reviewed' | 'resolved') => {
        if (!confirm(`Mark this report as ${newStatus}?`)) return;

        const { error } = await store.updateReportStatus(reportId, newStatus);
        if (!error) {
            setReports(reports.map(r => r.id === reportId ? { ...r, status: newStatus } : r));
        } else {
            alert("Failed to update status");
        }
    };

    const handleDeleteListing = async (listingId: string, reportId: string) => {
        if (!confirm("Are you sure you want to delete this listing? This action cannot be undone.")) return;

        if (user) {
            await store.deleteListing(listingId, user.id);
            // Also mark report as resolved
            await store.updateReportStatus(reportId, 'resolved');
            setReports(reports.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
            alert("Listing deleted and report resolved.");
        }
    };

    const handleWarnSeller = async (report: Report) => {
        if (!report.listing) return;

        const sellerId = report.listing.seller_id;
        const listingAddress = report.listing.address;

        if (!confirm(`Send warning to seller about "${listingAddress}"?`)) return;

        // Create a notification for the seller
        await store.createNotification(
            sellerId,
            'system_alert',
            '⚠️ Listing Reported - Action Required',
            `Your listing at "${listingAddress}" has been reported for: ${report.reason}. Please review and address this issue, or your listing may be removed.`,
            `/dashboard/seller`
        );

        // Mark report as reviewed
        await store.updateReportStatus(report.id, 'reviewed');
        setReports(reports.map(r => r.id === report.id ? { ...r, status: 'reviewed' } : r));
        alert("Warning sent to seller and report marked as reviewed.");
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#002147]" size={32} /></div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-4">
                            <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <ArrowLeft size={20} className="text-gray-600" />
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-[#002147]">Reported Listings</h1>
                                <p className="text-xs text-gray-500">Manage user reports</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Reason</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Listing</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Reporter</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Date</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {reports.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            <Shield className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                            No reports found
                                        </td>
                                    </tr>
                                ) : (
                                    reports.map((report) => (
                                        <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                    ${report.status === 'pending' ? 'bg-red-100 text-red-800' :
                                                        report.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-green-100 text-green-800'}`}>
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{report.reason}</div>
                                                <div className="text-gray-500 text-xs mt-1 max-w-xs truncate" title={report.details}>
                                                    {report.details}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {report.listing ? (
                                                    <Link href={`/explore/${report.listing_id}`} target="_blank" className="flex items-center gap-1 text-[#002147] hover:underline font-medium">
                                                        {report.listing.address}
                                                        <ExternalLink size={12} />
                                                    </Link>
                                                ) : (
                                                    <span className="text-gray-400 italic">Listing Deleted</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {report.reporter?.name || 'Unknown'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                                {new Date(report.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {report.status === 'pending' && (
                                                        <button
                                                            onClick={() => handleUpdateStatus(report.id, 'reviewed')}
                                                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                                            title="Mark as Reviewed"
                                                        >
                                                            <Check size={16} />
                                                        </button>
                                                    )}

                                                    {report.listing && report.status !== 'resolved' && (
                                                        <button
                                                            onClick={() => handleWarnSeller(report)}
                                                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                            title="Warn Seller"
                                                        >
                                                            <AlertTriangle size={16} />
                                                        </button>
                                                    )}

                                                    {report.listing && (
                                                        <button
                                                            onClick={() => handleDeleteListing(report.listing_id, report.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete Listing & Resolve"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}

                                                    {report.status !== 'resolved' && (
                                                        <button
                                                            onClick={() => handleUpdateStatus(report.id, 'resolved')}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                            title="Resolve without deleting"
                                                        >
                                                            <Check size={16} className="text-green-600" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
