import React, { useEffect } from 'react'
import { session } from 'vtex.store-resources/Queries'
import { useQuery } from 'react-apollo'
import {
  ensureSingleWordClass
} from './utils'

interface ClerkIoLiveSearchBlockProps {
    blockClassName: string
    templateName: string
    instantSearch?: string
    instantSearchSuggestions?: string
    instantSearchCategories?: string
    instantSearchPages?: string
    instantSearchPositioning?: string
}

interface Session {
    getSession: {
      profile: {
        email: string
      } | null
    }
  }

const ClerkIoLiveSearchBlock: StorefrontFunctionComponent<ClerkIoLiveSearchBlockProps> = ({
    blockClassName,
    templateName,
    instantSearch,
    instantSearchSuggestions,
    instantSearchCategories,
    instantSearchPages,
    instantSearchPositioning
}) => {



  const adjustedClassName = ensureSingleWordClass(blockClassName)

  const { loading } = useQuery<Session>(session, {
    ssr: false,
    })

  useEffect(() => {
    const { Clerk } = window
    if(instantSearch){
        const clerkInputField = document.querySelector(instantSearch) ?? null
        if(clerkInputField && !loading && Clerk){
          Clerk('content', `.${adjustedClassName}`)
        }
    }

  }, [adjustedClassName, loading])

  return adjustedClassName && templateName ?(

        <span 
        className={adjustedClassName}
        data-template={templateName}
        data-instant-search-suggestions={instantSearchSuggestions ?? '0'}
        data-instant-search-categories={instantSearchCategories ?? '0'}
        data-instant-search-pages={instantSearchPages ?? '0'}
        data-instant-search={instantSearch ?? '#clerk-search-input'}
        data-instant-search-positioning={instantSearchPositioning ?? 'left'}
        >
        </span>

  ) : null
}

ClerkIoLiveSearchBlock.schema = {
  title: 'admin/cms/clerkio.livesearch.title',
  description: 'admin/cms/clerkio.livesearch.description',
  type: 'object',
  properties: {
    blockClassName: {
        title: 'admin/cms/clerkio.livesearch.block.class.name',
        description: 'admin/cms/clerkio.livesearch.block.class.description',
        type: 'string',
        default: null
    },
    templateName: {
        title: 'admin/cms/clerkio.livesearch.block.template.name',
        description: 'admin/cms/clerkio.livesearch.block.template.description',
        type: 'string',
        default: null
    },
    instantSearch: {
        title: 'admin/cms/clerkio.livesearch.block.instantsearch.name',
        description: 'admin/cms/clerkio.livesearch.block.instantsearch.description',
        type: 'string',
        default: '#clerk-search-input'
    },
    instantSearchSuggestions: {
        title: 'admin/cms/clerkio.livesearch.block.instantsearchsuggestions.name',
        description: 'admin/cms/clerkio.livesearch.block.instantsearchsuggestions.description',
        type: 'string',
        default: null
    },
    instantSearchCategories: {
        title: 'admin/cms/clerkio.livesearch.block.instantsearchcategories.name',
        description: 'admin/cms/clerkio.livesearch.block.instantsearchcategories.description',
        type: 'string',
        default: null
    },
    instantSearchPages: {
        title: 'admin/cms/clerkio.livesearch.block.instantsearchpages.name',
        description: 'admin/cms/clerkio.livesearch.block.instantsearchpages.description',
        type: 'string',
        default: null
    },
    instantSearchPositioning: {
        title: 'admin/cms/clerkio.livesearch.block.instantsearchpositioning.name',
        description: 'admin/cms/clerkio.livesearch.block.instantsearchpositioning.description',
        type: 'string',
        default: null
    }
  }
}

export default ClerkIoLiveSearchBlock