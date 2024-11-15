import {
  IconBrandGithub,
  IconBrandGmail,
  IconBrandLeetcode,
  IconBrandLinkedin,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

export function Contact() {
  return (
    <div className="max-h-full overflow-y-auto">
      <div className="relative h-36">
        <Image
          fill
          className="object-cover object-center"
          alt=""
          src={'/assets/images/keyboard-cover.jpg'}
        />
        <Image
          className="absolute left-5 top-14 rounded-full"
          alt=""
          width={120}
          height={120}
          src={'/assets/images/author.jpg'}
        />
        <h1 className="absolute bottom-5 left-40 text-4xl font-medium text-dark-text">
          Saffaullah Shuvo
        </h1>
      </div>
      <div className="mt-20 flex items-center justify-center gap-8 font-medium">
        <Link
          href={'https://www.linkedin.com/in/sshuvoo/'}
          target="_blank"
          className="flex gap-2 rounded bg-black/5 px-3 py-1 text-sky-500 dark:bg-white/10"
        >
          <IconBrandLinkedin />
          <span>Linkedin</span>
        </Link>
        <Link
          href={'https://github.com/sshuvoo'}
          target="_blank"
          className="flex gap-2 rounded bg-black/5 px-3 py-1 dark:bg-white/10"
        >
          <IconBrandGithub />
          <span>Github</span>
        </Link>
        <Link
          href={'https://leetcode.com/u/sshuvoo/'}
          target="_blank"
          className="flex gap-2 rounded bg-black/5 px-3 py-1 text-[#FFA116] dark:bg-white/10"
        >
          <IconBrandLeetcode />
          <span>LeetCode</span>
        </Link>
        <Link
          href="mailto:safayanshuvo@gmail.com"
          className="flex gap-2 rounded bg-black/5 px-3 py-1 text-[#EB493B] dark:bg-white/10"
        >
          <IconBrandGmail />
          <span>E-mail</span>
        </Link>
      </div>
      <div className="p-4 text-justify text-lg">
        <h2 className="text-xl font-medium mb-4">About Me</h2>
        <div className="float-right ml-8">
          <Image
            alt=""
            src={'/assets/images/author2.jpg'}
            width={200}
            height={100}
            className='rounded'
          />
        </div>
        <p className="mb-4">
          Hey there! I’m Saffaullah Shuvo, a web developer from Sherpur,
          Bangladesh, who genuinely enjoys coding and problem-solving.
          Completing my graduation in Applied Mathematics from the University of
          Rajshahi actually inspired me to deep dive into the programming world.
          I’m a problem-solving enthusiast with a strong passion for data
          structures and algorithms, always eager to take on challenges and find
          efficient solutions. For me, coding isn’t a job—it’s something I truly
          love doing, and it’s exciting to learn and adapt to new technologies
          along the way.
        </p>
        <p>
          Beyond the screen, you’ll find me enjoying life’s simple pleasures. I
          love to travel, try out different foods, go swimming, hike in nature,
          and occasionally get lost in a good book. And yes, in case you were
          wondering, I’m still flying solo—no girlfriend yet (but who needs one
          when you have a love affair with code, right?).
        </p>
      </div>
    </div>
  )
}
