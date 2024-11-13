export default function SkillCard({
  children,
  title,
  className,
}: {
  children: React.ReactNode
  title: string
  className: string
}) {
  return (
    <div className="skillCard grid grid-cols-[auto,1fr] gap-4 dark:hover:bg-[#353535] hover:bg-white">
      {children}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-medium">{title}</h2>
        <div className="h-2 rounded-md bg-light-foreground dark:bg-dark-foreground">
          <div
            className={`h-full w-0 rounded-md bg-green-600 ${className}`}
          ></div>
        </div>
      </div>
    </div>
  )
}
