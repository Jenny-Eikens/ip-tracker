import React, { useState } from 'react'

const iconArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
    <path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" />
  </svg>
)

interface SearchBarProps {
  handleSearch: (address: string) => void
}

const SearchBar = ({ handleSearch }: SearchBarProps) => {
  const [input, setInput] = useState<string>('')

  const onSearch = () => {
    handleSearch(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (input.trim() === '') {
        alert('Search cannot be empty!')
        return
      }
      handleSearch(input)
    }
  }
  return (
    <>
      <div className="flex w-full overflow-hidden rounded-xl md:w-[50%]">
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search for any IP address or domain"
          className="w-full p-2 px-4 placeholder:text-sm hover:cursor-pointer focus:cursor-text focus:outline-none md:px-5 md:placeholder:text-base"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="flex h-full items-center bg-black p-5"
          onClick={onSearch}
          aria-label="Begin search"
        >
          {iconArrow}
        </button>
      </div>
    </>
  )
}

export default SearchBar
