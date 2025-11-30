"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { store, User, Chat } from "@/lib/store";
import { ArrowLeft, Shield, MessageSquare, Loader2, Search, Eye } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function AdminChats() {
    return <div>Admin Chats</div>;
}
