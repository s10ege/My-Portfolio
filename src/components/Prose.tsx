interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export function Prose({ children, className = "" }: ProseProps) {
  return (
    <div className={`prose ${className}`}>
      {children}
    </div>
  );
}
