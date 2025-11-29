"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { store, User } from "@/lib/store";
import { Loader2, Upload, X, ArrowLeft, Check } from "lucide-react";

const LOCATIONS = [
    "Campus Gate",
    "Asherifa",
    "Damico",
    "Ede Road",
    "Moremi Estate",
    "Ibadan Road",
    "Oduduwa Estate",
    "Mayfair",
    "Parakin"
];

export default function AddApartment() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        address: "",
        location: LOCATIONS[0],
        price: "",
        description: ""
    });

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await store.getCurrentUser();
            if (!currentUser || currentUser.role !== 'seller') {
                router.push("/");
                return;
            }
            setUser(currentUser);
        };
        fetchUser();
    }, [router]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setImageFiles(prev => [...prev, ...newFiles]);

            newFiles.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviews(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setVideoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setVideoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (index: number) => {
        setImageFiles(imageFiles.filter((_, i) => i !== index));
        setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        if (imageFiles.length < 2) {
            alert("Please upload at least 2 pictures.");
            return;
        }
        if (!videoFile) {
            alert("Please upload a video.");
            return;
        }

        setIsLoading(true);

        // Upload images to Supabase Storage
        const imageUrls: string[] = [];
        for (const file of imageFiles) {
            const url = await store.uploadImage(file, 'listings');
            if (url) imageUrls.push(url);
        }

        // Upload video
        const videoUrl = await store.uploadImage(videoFile, 'listings');

        if (imageUrls.length > 0 && videoUrl) {
            await store.addListing({
                sellerId: user.id,
                address: formData.address,
                location: formData.location,
                price: parseFloat(formData.price),
                description: formData.description,
                images: imageUrls,
                video: videoUrl,
                status: 'active'
            });
            router.push("/dashboard/seller");
        } else {
            alert("Failed to upload files. Please try again.");
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => router.back()}
                        className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <ArrowLeft size={20} className="text-[#002147]" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-[#002147]">Add New Property</h1>
                        <p className="text-sm text-gray-500">Fill in the details to list your apartment</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Media Upload Section */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-bold text-[#002147] mb-4 flex items-center gap-2">
                            <Upload size={20} className="text-[#FFC72C]" />
                            Media Upload
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Images */}
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-[#002147]">Property Images (Min 2)</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    <label className="aspect-square rounded-lg border-2 border-dashed border-[#002147]/20 hover:border-[#002147] hover:bg-blue-50 flex flex-col items-center justify-center cursor-pointer transition-all">
                                        <Upload size={24} className="text-[#002147] mb-1" />
                                        <span className="text-xs text-[#002147] font-medium">Add Photos</span>
                                        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    </label>
                                </div>
                            </div>

                            {/* Video */}
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-[#002147]">Property Video (Required)</label>
                                {videoPreview ? (
                                    <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 bg-black">
                                        <video src={videoPreview} className="w-full h-full object-contain" controls />
                                        <button
                                            type="button"
                                            onClick={() => { setVideoFile(null); setVideoPreview(null); }}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="aspect-video rounded-lg border-2 border-dashed border-[#002147]/20 hover:border-[#002147] hover:bg-blue-50 flex flex-col items-center justify-center cursor-pointer transition-all">
                                        <Upload size={32} className="text-[#002147] mb-2" />
                                        <span className="text-sm text-[#002147] font-medium">Upload Video Tour</span>
                                        <span className="text-xs text-gray-400 mt-1">MP4, WebM up to 50MB</span>
                                        <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                                    </label>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-bold text-[#002147] mb-6">Property Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-[#002147] mb-2">Full Address</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-none transition-all placeholder-gray-400 text-[#002147]"
                                    placeholder="e.g., 123 University Road, OAU Campus"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#002147] mb-2">Area / Location</label>
                                <div className="relative">
                                    <select
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-none transition-all appearance-none text-[#002147] bg-white"
                                    >
                                        {LOCATIONS.map(loc => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <ArrowLeft size={16} className="text-gray-400 -rotate-90" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#002147] mb-2">Annual Rent (₦)</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-none transition-all placeholder-gray-400 text-[#002147]"
                                    placeholder="e.g., 150000"
                                />
                            </div>

                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-[#002147] mb-2">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-none transition-all placeholder-gray-400 text-[#002147] resize-none"
                                    placeholder="Describe the apartment features, amenities, and rules..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#002147] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#001835] disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#002147]/20 flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Publishing Listing...
                                </>
                            ) : (
                                <>
                                    <Check size={20} className="text-[#FFC72C]" />
                                    Publish Listing
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
