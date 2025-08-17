import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

const Newsletter = () => {
  return (
    <div>
        <div className="max-w-2xl mx-auto bg-[#d8d8e1] dark:bg-gray-800 p-4 rounded-lg">
          <h1 className="text-xl font-semibold pb-2">Subscribe to the Newsletter</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get the latest posts and updates delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mt-5">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm  text-gray-300"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
    </div>
  )
}

export default Newsletter