import Board from '@/components/dashboard/board';
import Sidebar from '@/components/dashboard/sidebar';
import NavigationMenu from '@/components/mobile/navigation-menu';

export default function Home() {
  return (
    <div className="flex flex-col">
      <NavigationMenu />
      <div className="flex overflow-x-hidden">
        <Sidebar />
        <main className="flex h-screen w-full justify-center bg-zinc-50 pl-4 first-line:overflow-y-hidden dark:bg-gray-800 md:pl-28">
          <Board />
        </main>
      </div>
    </div>
  );
}
