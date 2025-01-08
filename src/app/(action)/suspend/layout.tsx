// app/layouts/BlankLayout.tsx
export default function BlankLayout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
      <div>
        {/* Only render children content, no Navbar, Sidebar, etc */}
        {children}
      </div>
    );
  }
  