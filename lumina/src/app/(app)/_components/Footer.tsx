import Link from 'next/link'
import { Facebook, Instagram, X } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Flare Notes</h3>
          <p className="text-sm">
            Helping presenters share resources and keep their audiences focused and engaged.
          </p>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm ">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/features">Features</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-2">Resources</h4>
          <ul className="space-y-1 text-sm ">
            <li>
              <Link href="/docs">Documentation</Link>
            </li>
            <li>
              <Link href="/support">Support</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <Link href="https://twitter.com" target="_blank">
              <X className=" hover:text-blue-500" />
            </Link>
            <Link href="https://facebook.com" target="_blank">
              <Facebook className=" hover:text-blue-700" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Instagram className=" hover:text-pink-500" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm">
        © {new Date().getFullYear()} Flare Notes. All rights reserved.
      </div>
    </footer>
  )
}
