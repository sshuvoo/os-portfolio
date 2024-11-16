import { FaApple } from 'react-icons/fa'
import { brandApple } from './menu-data'
import { Fragment, useState } from 'react'

export function BrandApple() {
  const [isOpen] = useState(false)

  return (
    <div className="relative flex h-full items-center rounded-md px-2 hover:bg-white/25">
      <FaApple className="text-lg" />
      {isOpen && (
        <div className="absolute left-0 top-full z-[1000] w-52 rounded-md bg-white/80 p-2 text-light-text shadow-xl backdrop-blur-lg dark:text-dark-text">
          {brandApple.map((item) => {
            if (item.divider) {
              return (
                <Fragment key={item.id}>
                  <p
                    className="rounded-md px-2 py-[3px] text-start font-medium hover:bg-white"
                    key={item.id}
                  >
                    {item.label}
                  </p>
                  <div className="px-4">
                    <span className="my-1 block h-[1px] w-full bg-[#575757]" />
                  </div>
                </Fragment>
              )
            } else {
              return (
                <p
                  className="rounded-md px-2 py-[3px] text-start font-medium hover:bg-white"
                  key={item.id}
                >
                  {item.label}
                </p>
              )
            }
          })}
        </div>
      )}
    </div>
  )
}
