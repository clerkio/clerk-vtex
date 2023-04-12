import React, { useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { session } from 'vtex.store-resources/Queries'
import { useQuery } from 'react-apollo'

interface ClerkIoSearchInputBlockProps {
    placeholderText?: string
}

interface Session {
  getSession: {
    profile: {
      email: string
    } | null
  }
}

const CSS_HANDLES = [
  'clerk-search-form',
  'clerk-search-input',
  'clerk-search-submit-wrap',
  'clerk-search-submit',
  'clerk-search-submit-icon'
] as const

const ClerkIoSearchInputBlock: StorefrontFunctionComponent<ClerkIoSearchInputBlockProps> = ({
    placeholderText,
}) => {

  const handles = useCssHandles(CSS_HANDLES)

  const { loading } = useQuery<Session>(session, {
    ssr: false,
  })

  useEffect(() => {
    if(!loading){
      const searchFormInput = document.querySelector('#clerk-search-input') ?? null
      const searchSubmit = document.querySelector('#clerk-search-submit') ?? null
      if(searchFormInput && searchSubmit){
        const { encodeURIComponent } = window
        const searchPagePath = '/clerk-search'
        const searchPageParam = 'searchTerm'
        const searchTerm = searchFormInput.getAttribute('value') ?? ''
        searchSubmit.addEventListener('click', () => {
          window.location.replace(`${searchPagePath}?${searchPageParam}=${encodeURIComponent(searchTerm)}`)
        })
      }
    }
  }, [loading])


  return (
    <div>
      <form
      id='clerk-search-form'
      className={`clerk-search-form ${handles['clerk-search-form']}`}
      action="/clerk-search" 
      method="GET"
      >
        <input 
          id='clerk-search-input'
          className={`clerk-search-input ${handles['clerk-search-input']}`}
          placeholder={placeholderText ?? 'Search...'}
          type="text" 
          name="searchTerm"
          />
        <div className={`clerk-search-submit-wrap ${handles['clerk-search-submit-wrap']}`}>
          <button 
            id='clerk-search-submit'
            className={`clerk-search-submit ${handles['clerk-search-submit']}`}
            type="submit"
            value=""
          />
          <svg 
            className={ `vtex__icon-search clerk-search-submit-icon ${handles['clerk-search-submit-icon']}` }
            width="16" 
            height="16" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 16 16" 
            fill="none">
              <path 
              d="M15.707 13.293L13 10.586C13.63 9.536 14 8.311 14 7C14 3.14 10.859 0 7 0C3.141 0 0 3.14 0 7C0 10.86 3.141 14 7 14C8.312 14 9.536 13.631 10.586 13L13.293 15.707C13.488 15.902 13.744 16 14 16C14.256 16 14.512 15.902 14.707 15.707L15.707 14.707C16.098 14.316 16.098 13.684 15.707 13.293ZM7 12C4.239 12 2 9.761 2 7C2 4.239 4.239 2 7 2C9.761 2 12 4.239 12 7C12 9.761 9.761 12 7 12Z" 
              fill="#333333"
              ></path>
          </svg>
        </div>
      </form>
    </div>
  )
}

ClerkIoSearchInputBlock.schema = {
  title: 'admin/cms/clerkio.searchinput.title',
  description: 'admin/cms/clerkio.searchinput.description',
  type: 'object',
  properties: {
    placeholderText: {
        title: 'admin/cms/clerkio.searchinput.block.placeholdertext.name',
        description: 'admin/cms/clerkio.searchinput.block.placeholdertext.description',
        type: 'string',
        default: null
    },
  }
}

export default ClerkIoSearchInputBlock