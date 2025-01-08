// app/(pages)/manage-users/[id]/edit/layout.tsx
export default function BlankLayout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
      <div>
        {/* This layout only renders the children content */}
        {children}
      </div>
    );
  }
  