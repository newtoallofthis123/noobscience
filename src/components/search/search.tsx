import React from 'react'

async function search_blog(term: string) {
  const url = `/blog/search/api/${term}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export default function Search({
  term = ''
}:any) {
  const [search, setSearch] = React.useState(term)
  const [results, setResults] = React.useState([])
  
  React.useEffect(() => {
    setSearch(term)
    const data = async () => { 
      const data = await search_blog(term)
      setResults(data)
    }
    data()
  }, [term])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target
    if (value == '') {
      setResults([])
      setSearch('')
      return
    }
    setSearch(value)
    const data = await search_blog(value)
    setResults(data)
  }

  return (
      <div className="flex flex-col py-3 justify-center items-center">
          <div className="w-5/6 focus:outline-none">
              <input
                  type="text"
                  className="text-lg w-full border-2 border-black rounded-md focus:outline-none p-4 rounded-"
                  value={search}
                  onChange={handleChange}
              />
          </div>
          <div className="w-5/6">
              {results.length != 0 &&
                  results.map((post: any) => (
                      <div
                          key={post.title}
                          className="flex flex-col justify-center items-center md:justify-normal md:items-start md:flex-row p-4 border-gray-400 border-b-2"
                      >
                          <div className="p-4">
                              <p className="text-2xl text-center md:text-justify font-bold">
                          {post.frontmatter.emoji}{' '}
                                  <a href={post.url}>
                                      {post.frontmatter.title}
                                  </a>
                              </p>
                              <p className="text-gray-500 text-lg w-full md:w-3/5 py-2">
                                  {post.frontmatter.description}
                              </p>
                              <p className="text-gray-500 text-sm">
                                  {new Date(
                                      post.frontmatter.date
                                  ).toDateString()}
                              </p>
                          </div>
                      </div>
                  ))}
              {results.length == 0 && <p>No results found</p>}
          </div>
      </div>
  );
}