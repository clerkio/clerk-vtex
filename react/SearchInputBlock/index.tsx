import React from 'react'

interface ClerkIoSearchInputBlockProps {
    placeholderText: string
}

const ClerkIoSearchInputBlock: StorefrontFunctionComponent<ClerkIoSearchInputBlockProps> = ({
    placeholderText,
}) => {

  const captureQuery = () => {
    console.log('change happened')
  }

  return (
    <form
    id="clerk-search-form"
    action="/clerk-search" 
    method="GET"
    >
      <label>
        <input 
                id="clerk-search-input"
                placeholder={placeholderText ?? 'Search...'}
                type="text" 
                name="searchTerm"
                onChange={captureQuery}
                />
      </label>
      <input type="submit" value="Submit" />
    </form>
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