import { supabase } from './supabase';

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'buyer' | 'seller';
    profilePic?: string;
    isStudent?: boolean;
    studentLevel?: string;
    bvnVerified?: boolean;
    isAdmin?: boolean;
    isBanned?: boolean;
    bannedAt?: string;
    bannedReason?: string;
}

export interface Listing {
    id: string;
    sellerId: string;
    address: string;
    location: string;
    price: number;
    description: string;
    images: string[];
    video?: string;
    status: 'active' | 'sold';
    createdAt?: string;
    views?: number;
}

export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
}

export interface Chat {
    id: string;
    listingId: string;
    buyerId: string;
    sellerId: string;
    messages: Message[];
    createdAt?: string;
}

export interface Notification {
    id: string;
    userId: string;
    type: 'view_milestone' | 'new_message' | 'system_alert';
    title: string;
    content: string;
    link?: string;
    isRead: boolean;
    createdAt: string;
}

class Store {
    // Hardcoded admin credentials - add your email and password here
    private ADMIN_CREDENTIALS = [
        { email: 'adeyemidavid1507@gmail.com', password: 'admin123' },
        // Add more admins below:
        // { email: 'another@example.com', password: 'secure_password' },
    ];

    // Auth
    async getCurrentUser(): Promise<User | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (!profile) return null;

        // Check if user email is in admin list
        const isAdmin = this.ADMIN_CREDENTIALS.some(admin => admin.email === user.email);

        // Sync admin status to DB if needed (crucial for RLS policies)
        if (isAdmin && !profile.is_admin) {
            const { error } = await supabase.from('profiles').update({ is_admin: true }).eq('id', user.id);
            if (error) {
                console.error("Failed to sync admin status to DB:", error);
            } else {
                profile.is_admin = true;
            }
        }

        return {
            id: profile.id,
            name: profile.name,
            email: user.email!,
            role: profile.role,
            profilePic: profile.profile_pic,
            isStudent: profile.is_student,
            studentLevel: profile.student_level,
            bvnVerified: profile.bvn_verified,
            isAdmin: isAdmin, // Set based on email list
            isBanned: profile.is_banned,
            bannedAt: profile.banned_at,
            bannedReason: profile.banned_reason,
        };
    }

    async registerUser(user: Omit<User, 'id'>, password: string): Promise<{ user: User | null; error: any }> {
        // 1. Sign up with Supabase Auth
        // The trigger 'on_auth_user_created' will automatically create the profile
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: user.email,
            password: password,
            options: {
                data: {
                    name: user.name,
                    role: user.role,
                    is_student: user.isStudent,
                    student_level: user.studentLevel,
                    bvn_verified: user.bvnVerified,
                }
            }
        });

        if (authError) return { user: null, error: authError };
        if (!authData.user) return { user: null, error: "No user data returned" };

        return {
            user: { ...user, id: authData.user.id },
            error: null
        };
    }

    async login(email: string, password: string) {
        return await supabase.auth.signInWithPassword({ email, password });
    }

    async logout() {
        return await supabase.auth.signOut();
    }

    async updateUser(id: string, updates: Partial<User>) {
        const dbUpdates: any = {};
        if (updates.name) dbUpdates.name = updates.name;
        if (updates.profilePic) dbUpdates.profile_pic = updates.profilePic;

        const { error } = await supabase
            .from('profiles')
            .update(dbUpdates)
            .eq('id', id);

        return { error };
    }

    async getUser(id: string): Promise<User | null> {
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();

        if (!profile) return null;

        // We might not have email here if we're just fetching a public profile
        // But for our interface we need it. We'll use a placeholder or fetch from auth if possible (admin only)
        // For now, let's just return the profile data we have
        return {
            id: profile.id,
            name: profile.name,
            email: "", // Placeholder as we can't easily get email of other users
            role: profile.role,
            profilePic: profile.profile_pic,
            isStudent: profile.is_student,
            studentLevel: profile.student_level,
            bvnVerified: profile.bvn_verified,
        };
    }

    // Listings
    async getListings(sellerId?: string): Promise<Listing[]> {
        let query = supabase
            .from('listings')
            .select('*')
            .order('created_at', { ascending: false });

        if (sellerId) {
            query = query.eq('seller_id', sellerId);
        }

        const { data, error } = await query;

        if (error || !data) return [];

        return data.map(l => ({
            id: l.id,
            sellerId: l.seller_id,
            address: l.address,
            location: l.location,
            price: l.price,
            description: l.description,
            images: l.images || [],
            video: l.video,
            status: l.status,
            createdAt: l.created_at
        }));
    }

    async getListing(id: string): Promise<Listing | null> {
        const { data: l, error } = await supabase
            .from('listings')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !l) return null;

        return {
            id: l.id,
            sellerId: l.seller_id,
            address: l.address,
            location: l.location,
            price: l.price,
            description: l.description,
            images: l.images || [],
            video: l.video,
            status: l.status,
            createdAt: l.created_at
        };
    }

    async addListing(listing: Omit<Listing, 'id'>) {
        const { data, error } = await supabase
            .from('listings')
            .insert({
                seller_id: listing.sellerId,
                address: listing.address,
                location: listing.location,
                price: listing.price,
                description: listing.description,
                images: listing.images,
                video: listing.video,
                status: listing.status
            })
            .select()
            .single();

        return { listing: data, error };
    }

    async updateListing(id: string, updates: Partial<Listing>) {
        const dbUpdates: any = {};
        if (updates.status) dbUpdates.status = updates.status;

        const { error } = await supabase
            .from('listings')
            .update(dbUpdates)
            .eq('id', id);

        return { error };
    }

    // Chats
    async getChats(userId: string): Promise<Chat[]> {
        // This is complex because we need to join tables.
        // For MVP, let's fetch chats where user is buyer OR seller
        const { data: chats, error } = await supabase
            .from('chats')
            .select(`
        *,
        messages (*)
      `)
            .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);

        if (error || !chats) return [];

        return chats.map(c => ({
            id: c.id,
            listingId: c.listing_id,
            buyerId: c.buyer_id,
            sellerId: c.seller_id,
            createdAt: c.created_at,
            messages: (c.messages || []).map((m: any) => ({
                id: m.id,
                senderId: m.sender_id,
                content: m.content,
                timestamp: m.created_at
            })).sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        }));
    }

    async createChat(listingId: string, buyerId: string, sellerId: string) {
        // Check if chat exists
        const { data: existing } = await supabase
            .from('chats')
            .select('*')
            .eq('listing_id', listingId)
            .eq('buyer_id', buyerId)
            .single();

        if (existing) return existing;

        const { data, error } = await supabase
            .from('chats')
            .insert({
                listing_id: listingId,
                buyer_id: buyerId,
                seller_id: sellerId
            })
            .select()
            .single();

        return data;
    }

    async sendMessage(chatId: string, senderId: string, content: string) {
        const { data, error } = await supabase
            .from('messages')
            .insert({
                chat_id: chatId,
                sender_id: senderId,
                content: content
            })
            .select()
            .single();

        if (!error && data) {
            // Get chat details to find recipient
            const { data: chat } = await supabase
                .from('chats')
                .select('buyer_id, seller_id, listing_id')
                .eq('id', chatId)
                .single();

            if (chat) {
                // Determine recipient (if sender is buyer, notify seller; if sender is seller, notify buyer)
                // Requirement says "When a buyer sends the first message... notify agent".
                // We'll notify on every message for now as requested "new message request to check"
                const recipientId = senderId === chat.buyer_id ? chat.seller_id : chat.buyer_id;

                // Only notify if sender is buyer (notifying agent) as per request "agents notifications... new message request"
                // But good UX is bidirectional. Let's stick to request: Agent notifications.
                if (senderId === chat.buyer_id) {
                    await this.createNotification(
                        recipientId,
                        'new_message',
                        'New Message Received 💬',
                        'You have a new message from a potential buyer.',
                        `/dashboard/seller/chat/${chatId}`
                    );
                }
            }
        }

        return { message: data, error };
    }

    async uploadImage(file: File, bucket: 'avatars' | 'listings'): Promise<string | null> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (uploadError) {
            console.error('Error uploading image:', uploadError);
            return null;
        }

        const { data } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

        return data.publicUrl;
    }

    // Admin Functions
    async getAdminStats() {
        const [usersResult, listingsResult, chatsResult] = await Promise.all([
            supabase.from('profiles').select('id, role', { count: 'exact' }),
            supabase.from('listings').select('id, status, price', { count: 'exact' }),
            supabase.from('chats').select('id', { count: 'exact' })
        ]);

        const buyers = usersResult.data?.filter(u => u.role === 'buyer').length || 0;
        const sellers = usersResult.data?.filter(u => u.role === 'seller').length || 0;
        const activeListings = listingsResult.data?.filter(l => l.status === 'active').length || 0;
        const soldListings = listingsResult.data?.filter(l => l.status === 'sold').length || 0;

        // Calculate total trade volume (sum of prices of sold listings)
        const totalVolume = listingsResult.data
            ?.filter(l => l.status === 'sold')
            .reduce((sum, l) => sum + (l.price || 0), 0) || 0;

        return {
            totalUsers: usersResult.count || 0,
            buyers,
            sellers,
            totalListings: listingsResult.count || 0,
            activeListings,
            soldListings,
            totalChats: chatsResult.count || 0,
            totalVolume,
        };
    }

    async getAllUsers() {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error || !data) return [];

        return data.map((p: any) => ({
            id: p.id,
            name: p.name,
            email: '', // Email not stored in profiles
            role: p.role,
            profilePic: p.profile_pic,
            isStudent: p.is_student,
            studentLevel: p.student_level,
            bvnVerified: p.bvn_verified,
            isAdmin: p.is_admin,
            isBanned: p.is_banned,
            bannedAt: p.banned_at,
            bannedReason: p.banned_reason,
        }));
    }

    async getAllChats() {
        const { data: chats, error } = await supabase
            .from('chats')
            .select(`
                *,
                messages (*)
            `)
            .order('created_at', { ascending: false });

        if (error || !chats) return [];

        return chats.map((c: any) => ({
            id: c.id,
            listingId: c.listing_id,
            buyerId: c.buyer_id,
            sellerId: c.seller_id,
            createdAt: c.created_at,
            messages: (c.messages || []).map((m: any) => ({
                id: m.id,
                senderId: m.sender_id,
                content: m.content,
                timestamp: m.created_at
            })).sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        }));
    }

    async banUser(userId: string, reason: string, adminId: string) {
        const { error } = await supabase
            .from('profiles')
            .update({
                is_banned: true,
                banned_at: new Date().toISOString(),
                banned_reason: reason
            })
            .eq('id', userId);

        if (!error) {
            await this.logAdminAction(adminId, 'ban_user', 'user', userId, { reason });
        }

        return { error };
    }

    async unbanUser(userId: string, adminId: string) {
        const { error } = await supabase
            .from('profiles')
            .update({
                is_banned: false,
                banned_at: null,
                banned_reason: null
            })
            .eq('id', userId);

        if (!error) {
            await this.logAdminAction(adminId, 'unban_user', 'user', userId, {});
        }

        return { error };
    }

    async deleteListing(listingId: string, adminId?: string) {
        const { error } = await supabase
            .from('listings')
            .update({ status: 'sold' })
            .eq('id', listingId);

        if (!error && adminId) {
            await this.logAdminAction(adminId, 'delete_listing', 'listing', listingId, {});
        }

        return { error };
    }

    async logAdminAction(adminId: string, action: string, targetType: string, targetId: string, details: any) {
        await supabase
            .from('admin_logs')
            .insert({
                admin_id: adminId,
                action,
                target_type: targetType,
                target_id: targetId,
                details
            });
    }

    // Reports
    async submitReport(listingId: string, reporterId: string, reason: string, details: string) {
        const { error } = await supabase
            .from('reports')
            .insert({
                listing_id: listingId,
                reporter_id: reporterId,
                reason,
                details,
                status: 'pending'
            });
        return { error };
    }

    async getReports() {
        const { data, error } = await supabase
            .from('reports')
            .select(`
                *,
                listing:listings(address, seller_id),
                reporter:profiles(name)
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching reports:", error);
            return [];
        }

        return data || [];
    }

    async updateReportStatus(reportId: string, status: 'reviewed' | 'resolved') {
        const { error } = await supabase
            .from('reports')
            .update({ status })
            .eq('id', reportId);
        return { error };
    }

    async getAdminLogs(limit: number = 50) {
        const { data, error } = await supabase
            .from('admin_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);

        return data || [];
    }


    // ... inside Store class ...

    // Notifications
    async getNotifications(userId: string) {
        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(20);

        if (error || !data) return [];

        return data.map(n => ({
            id: n.id,
            userId: n.user_id,
            type: n.type,
            title: n.title,
            content: n.content,
            link: n.link,
            isRead: n.is_read,
            createdAt: n.created_at
        }));
    }

    async markNotificationRead(notificationId: string) {
        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('id', notificationId);
        return { error };
    }

    async createNotification(userId: string, type: 'view_milestone' | 'new_message' | 'system_alert', title: string, content: string, link?: string) {
        const { error } = await supabase
            .from('notifications')
            .insert({
                user_id: userId,
                type,
                title,
                content,
                link
            });
        return { error };
    }

    async incrementListingViews(listingId: string) {
        // 1. Get current views
        const { data: listing } = await supabase
            .from('listings')
            .select('views, seller_id, address')
            .eq('id', listingId)
            .single();

        if (!listing) return;

        const newViews = (listing.views || 0) + 1;

        // 2. Update views
        await supabase
            .from('listings')
            .update({ views: newViews })
            .eq('id', listingId);

        // 3. Check Milestones (10, 50, 100, then every 100)
        const milestones = [10, 50, 100];
        let shouldNotify = false;

        if (milestones.includes(newViews)) {
            shouldNotify = true;
        } else if (newViews > 100 && newViews % 100 === 0) {
            shouldNotify = true;
        }

        if (shouldNotify) {
            await this.createNotification(
                listing.seller_id,
                'view_milestone',
                'Listing Milestone Reached! 🚀',
                `Your listing at "${listing.address}" has reached ${newViews} views!`,
                `/dashboard/seller`
            );
        }
    }

}

export const store = new Store();
