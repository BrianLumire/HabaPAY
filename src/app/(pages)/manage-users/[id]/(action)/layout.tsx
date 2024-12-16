// app/manage-users/[id]/(actions)/layout.tsx
export default function ActionsLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="actions-layout">
        {children}
      </div>
    );
  }
  