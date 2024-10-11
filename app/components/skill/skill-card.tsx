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
    <div className="skillCard grid grid-cols-[auto,1fr] gap-4 hover:bg-[#353535]">
      {children}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-medium text-[#dcdcdc]">{title}</h2>
        <div className="h-2 rounded-md bg-[#4e4e4e]">
          <div
            className={`h-full w-0 rounded-md bg-green-500 ${className}`}
          ></div>
        </div>
      </div>
    </div>
  )
}
