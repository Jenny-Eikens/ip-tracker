import React from 'react'
import Main from './components/Main'

/* TODO
- fix width issues with background-image
- change name of SearchBar component
- restructure SearchBar component -> h1 should be separate for example
- fix border color
*/

export default async function Home() {
  return (
    <>
      <div className="w-full">
        <main className="flex min-h-screen flex-col justify-end">
          <Main />
        </main>
        <footer className="attribution relative bottom-1 left-0 right-0 m-auto mt-6 p-2 text-center text-sm md:p-0">
          <div>
            Challenge by{' '}
            <a
              href="https://www.frontendmentor.io?ref=challenge"
              target="_blank"
            >
              Frontend Mentor
            </a>
            . Coded by{' '}
            <a href="https://github.com/Jenny-Eikens" target="_blank">
              Jennifer Eikens
            </a>
            .
          </div>
        </footer>
      </div>
    </>
  )
}
