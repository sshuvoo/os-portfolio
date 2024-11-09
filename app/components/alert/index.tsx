import finder from '@/public/assets/icons/Finder.png'
import Image from 'next/image'

export function Alert({
  heading = 'Are you sure?',
  message = "This Item will be deleted immediately. \n You can't undo this action",
  onConfirm,
  onClose,
}: {
  onConfirm: () => void
  onClose: () => void
  heading?: string
  message?: string
}) {
  return (
    <div className="fixed left-1/2 top-1/2 z-[9999] flex w-full max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border border-[#444444] bg-[#353535ce] p-8 backdrop-blur text-[#e6e6e6]">
      <Image alt="" src={finder} width={70} height={70} />
      <h2 className="text-3xl font-medium">{heading}</h2>
      <p className="my-4 whitespace-pre-line text-center">{message}</p>
      <div className="grid w-full grid-cols-2 gap-4">
        <button
          onClick={onClose}
          className="w-full rounded bg-[#1564D9] py-1 text-base font-medium text-white"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="w-full rounded bg-[#697073] py-1 text-base font-medium text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  )
}
