import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header>
        <nav>
          <a href="/message-boards">Boards</a>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
