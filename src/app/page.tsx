import ToggleColorButton from '@/components/common/toggle-color-btn';
import Board from '@/components/dashboard/board';
import Sidebar from '@/components/dashboard/sidebar';
import Wrapper from '@/components/ui/wrapper';

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <ToggleColorButton />
      <main className="flex min-h-screen grow justify-center bg-zinc-50 first-line:overflow-y-hidden dark:bg-gray-800">
        <Wrapper className="pt-10">
          <Board />
        </Wrapper>
      </main>
    </div>
  );
}
