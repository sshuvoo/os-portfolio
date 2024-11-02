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
      className={`size-12 rounded-full font-medium text-white flex justify-center items-center text-xl ${isHighlight ? 'bg-orange-400' : 'bg-white/20'}`}
    >
      {children ? children : label}
    </button>
  )
}
