export default function DeleteLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <div className="">
       {children}
     </div>
    );
  }
  