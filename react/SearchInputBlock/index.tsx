import React from 'react'

interface ClerkIoSearchInputBlockProps {
    placeholderText: string
}

const ClerkIoSearchInputBlock: StorefrontFunctionComponent<ClerkIoSearchInputBlockProps> = ({
    placeholderText,
}) => {

  return (

    <div id="clerk-search-form">
        <form action="/clerk-search" method="GET">
            <input 
                id="clerk-search-input"
                placeholder={placeholderText ?? 'Search...'}
                type="text" 
                name="searchTerm" 
                value=""
                />
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