import Link from 'next/link'

export default function BackToSearch() {
    return (
         <Link
          href="/"
          className="inline-flex items-center text-sm text-sky-400 hover:underline mb-6"
        >
          ← Back to search
        </Link>
    )
}