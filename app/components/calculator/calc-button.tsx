export function CalcButton({
  onPress,
  label,
  isHighlight = false,
  children,
}: {
  label?: string
  children?: React.ReactNode
  onPress?: () => void
  isHighlight?: boolean
}) {
  return (
    <button
      onClick={onPress}
      className={`size-12 rounded-full font-medium flex justify-center items-center text-xl ${isHighlight ? 'bg-orange-400 text-white' : 'dark:bg-white/20 bg-black/10'}`}
    >
      {children ? children : label}
    </button>
  )
}
