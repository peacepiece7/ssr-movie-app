import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'

function getYearOptions() {
  const date = new Date()
  let year = date.getFullYear()
  const yearOptions = []
  while (year >= 1985) {
    yearOptions.push(year--)
  }
  return yearOptions
}

export default function Search({ onSearch }) {
  const [year, setYear] = useState('')
  const [text, setText] = useState('')
  const [genre, setGenre] = useState('')

  const yearOptions = useMemo(() => getYearOptions(), [])

  const handleSubmitSearchForm = (e) => {
    e.preventDefault()
    onSearch(`s=${encodeURIComponent(text)}${year ? `&y=${year}` : ''}${genre ? `&type=${genre}` : ''}`)
  }

  const setInputText = (e) => {
    setText(() => e.target.value.trim())
  }
  const setSelecedGenre = (e) => {
    setGenre(() => e.target.value.trim())
  }

  const setSelecedYear = (e) => {
    setYear(() => e.target.value.trim())
  }
  return (
    <form onSubmit={handleSubmitSearchForm} className="flex flex-wrap justify-start content-center h-fit text-sm">
      <input
        type="text"
        onChange={setInputText}
        defaultValue={text}
        autoComplete="true"
        minLength={3}
        className={`min-w-[230px] mr-4 mt-3 h-12 pl-3 shadow-md rounded-md grow 
        cursor-pointer outline-none tracking-widest
        hover:shadow-lg transition duration-150 ease-out`}
      />
      <select
        name="genre"
        onChange={setSelecedGenre}
        defaultValue={genre}
        className={`mr-4 h-12 mt-3 p-2 min-w-[120px] shadow-md rounded-md cursor-pointer outline-none tracking-widest
        hover:shadow-lg transition duration-150 ease-out`}
      >
        <option value="">no-choice</option>
        <option value="movie">movie</option>
        <option value="series">series</option>
        <option value="episode">episode</option>
      </select>
      <select
        name="year"
        onChange={setSelecedYear}
        defaultValue={year}
        className={`mr-12 h-12 mt-3 p-2 min-w-[100px] shadow-md rounded-md cursor-pointer outline-none tracking-widest
        hover:shadow-lg transition duration-150 ease-out`}
      >
        <option value="">all</option>
        {yearOptions.map((yr) => (
          <option key={yr} value={yr}>
            {yr}
          </option>
        ))}
      </select>
      <input
        type="submit"
        value="Search"
        draggable="false"
        className={`text-c-h h-12 mt-3 w-40 bg-[#fff]
        border-none border-c-d border-[1px] rounded-md 
        pl-2 pr-2 pt-1 pb-1 shadow-md cursor-pointer outline-none tracking-widest
        hover:shadow-lg transition duration-150 ease-out
       `}
      />
    </form>
  )
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
}
