import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header className="bg-primary text-white">
        <nav>
          <a
            className="px-4 py-2 inline-block hover:bg-primary-dark"
            href="/message-boards"
          >
            Boards
          </a>
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </>
  );
}
