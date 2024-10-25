import { FC } from "react";
import { BarChart, Users, Settings } from "lucide-react";

interface SidebarProps {
    activeScreen: string;
    setActiveScreen: (screen: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ activeScreen, setActiveScreen }) => {
    const sidebarLinks = [
        { name: "ダッシュボード", icon: BarChart, screen: "dashboard" },
        { name: "ユーザー", icon: Users, screen: "users" },
        { name: "設定", icon: Settings, screen: "settings" },
    ];

    return (
        <aside className="hidden w-64 bg-white p-4 shadow-md md:block">
            <nav className="space-y-2">
                {sidebarLinks.map((link) => (
                    <button
                        key={link.name}
                        className={`flex w-full items-center space-x-2 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors ${
                            activeScreen === link.screen ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setActiveScreen(link.screen)}
                    >
                        <link.icon className="h-5 w-5" />
                        <span>{link.name}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
