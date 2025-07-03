"use client";
import { usePathname, useRouter } from "next/navigation";
import { Scale, Beef, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
    { id: 'livestock-calc', label: 'Livestock Calc', icon: Scale, href: '/' },
    { id: 'feed-calc', label: 'Feed Formulation', icon: Beef, href: '/feed-formulation' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile view on mount and resize
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        // Set initial collapsed state based on mobile view
        if (isMobile) {
            setIsCollapsed(true);
        }

        return () => window.removeEventListener('resize', checkIfMobile);
    }, [isMobile]);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white/80 backdrop-blur-sm border-r border-teal-100 p-6 flex flex-col h-screen transition-all duration-300 relative`}>
            {/* Collapse Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-6 bg-white rounded-full p-1 shadow-md border border-gray-200 hover:bg-gray-50"
            >
                {isCollapsed ? (
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                ) : (
                    <ChevronLeft className="h-4 w-4 text-gray-600" />
                )}
            </button>

            {/* Logo */}
            <div className={`flex items-center gap-3 mb-8 ${isCollapsed ? 'justify-center' : ''}`}>
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Scale className="h-6 w-6 text-white" />
                </div>
                {!isCollapsed && (
                    <span className="text-xl font-bold text-gray-800">LiveStock</span>
                )}
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            router.push(item.href);
                            if (isMobile) setIsCollapsed(true); // Auto-collapse on mobile after navigation
                        }}
                        className={`w-full flex items-center  rounded-xl gap-3 text-left transition-all ${pathname === item.href
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                            : 'text-gray-600 hover:bg-teal-50 hover:text-teal-700'
                            } ${isCollapsed ? 'justify-center  p-2' : 'px-4 py-3'}`}
                    >
                        <item.icon className="h-5 w-5" />
                        {!isCollapsed && (
                            <span className="font-medium">{item.label}</span>
                        )}
                    </button>
                ))}
            </nav>

            {/* User Profile */}
            <div className={`flex items-center gap-3 mt-8 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl ${isCollapsed ? 'justify-center' : ''}`}>
                <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                </div>
                {!isCollapsed && (
                    <div>
                        <div className="font-medium text-gray-800">Farm Owner</div>
                        <div className="text-sm text-gray-500">Premium Plan</div>
                    </div>
                )}
            </div>
        </div>
    );
}