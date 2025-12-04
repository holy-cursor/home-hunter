"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { store, User } from "@/lib/store";
import { Loader2, Upload, User as UserIcon, Camera, ArrowRight, Home } from "lucide-react";
import Link from "next/link";

export default function ProfileSetup() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [username, setUsername] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await store.getCurrentUser();
            if (!currentUser) {
                router.push("/");
                return;
            }
            setUser(currentUser);
            setUsername(currentUser.name);
            setIsLoading(false);
        };
        fetchUser();
    }, [router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setIsSaving(true);

        let profilePicUrl = user.profilePic;

        if (imageFile) {
            const uploadedUrl = await store.uploadImage(imageFile, 'avatars');
            if (uploadedUrl) {
                profilePicUrl = uploadedUrl;
            }
        }

        await store.updateUser(user.id, {
            name: username,
            profilePic: profilePicUrl,
        });

        setIsSaving(false);

        if (user.role === "seller") {
            router.push("/dashboard/seller");
        } else {
            router.push("/explore");
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-emerald-600" size={32} /></div>;
    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/" className="flex justify-center items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <Home className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-slate-900">aparteh</span>
                </Link>
                <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
                    Complete Your Profile
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Add a photo and personalize your account
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-xl sm:px-10">
                    <form className="space-y-8" onSubmit={handleSubmit}>

                        {/* Profile Image Upload */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative group">
                                <div className="h-32 w-32 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center">
                                    {imagePreview || user.profilePic ? (
                                        <img src={imagePreview || user.profilePic} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <UserIcon className="h-16 w-16 text-slate-300" />
                                    )}
                                </div>

                                {/* Upload overlay */}
                                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <div className="text-center">
                                        <Camera className="h-8 w-8 text-white mx-auto mb-1" />
                                        <span className="text-xs text-white font-medium">Change</span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            <div className="text-center">
                                <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 cursor-pointer transition-all shadow-sm">
                                    <Upload className="w-4 h-4" />
                                    <span>Upload Photo</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-slate-500 mt-2">JPG, PNG or GIF (max. 5MB)</p>
                            </div>
                        </div>

                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                                Display Name
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    className="block w-full pl-10 sm:text-sm border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 p-2.5 border"
                                    placeholder="Enter your display name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <span>Continue</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
