import { useEffect } from 'react'
import { navigate } from 'gatsby'

const LibraryRedirect = () => {
  useEffect(() => {
    navigate('/', { replace: true })
  }, [])
  return null
}

export default LibraryRedirect
