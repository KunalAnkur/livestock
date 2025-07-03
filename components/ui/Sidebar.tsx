// components/Sidebar.tsx
"use client";
import { usePathname } from "next/navigation";
import { Scale, Beef, User } from "lucide-react";
// const [activeNav, setActiveNav] = useState('livestock-calc');
const navItems = [
    { id: 'livestock-calc', label: 'Livestock Calc', icon: Scale, href: '/' },
    { id: 'feed-calc', label: 'Feed Formulation', icon: Beef, href: '/feed-formulation' },
    // { id: 'growth-tracker', label: 'Growth Tracker', icon: TrendingUp, href: '#' },
    // { id: 'health-monitor', label: 'Health Monitor', icon: Activity, href: '#' },
];

import { useRouter } from 'next/navigation';
export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-teal-100 p-6 flex flex-col h-screen">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Scale className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800">LiveStock</span>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            console.log(`Navigating to ${item.href}`);
                            router.push(item.href);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${pathname === item.href
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                            : 'text-gray-600 hover:bg-teal-50 hover:text-teal-700'
                            }`}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* User Profile */}
            <div className="flex items-center gap-3 mt-8 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                </div>
                <div>
                    <div className="font-medium text-gray-800">Farm Owner</div>
                    <div className="text-sm text-gray-500">Premium Plan</div>
                </div>
            </div>
        </div>
    );
}