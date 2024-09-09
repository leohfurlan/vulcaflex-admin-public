import Link from 'next/link'

export function Avatar() {
  return (
    <Link href="/">
      <img
        src="/images/avatar.svg"
        alt="User Avatar"
        className="w-10 h-10 rounded-full cursor-pointer ml-3"
      />
    </Link>
  )
}
