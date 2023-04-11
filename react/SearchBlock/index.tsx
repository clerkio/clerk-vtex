//react/Countdown.tsx
import React, { useEffect } from 'react'
import { session } from 'vtex.store-resources/Queries'
import { useQuery } from 'react-apollo'
import {
  ensureSingleWordClass
} from './utils'

interface ClerkIoSearchPageProps {
    blockClassName: string
    templateName: string
    facetsAttributes?: string
    facetsAttributeTitles?: string
    facetsAttributesMulti?: string
}

interface Session {
  getSession: {
    profile: {
      email: string
    } | null
  }
}

const ClerkIoSearchPageBlock: StorefrontFunctionComponent<ClerkIoSearchPageProps> = ({
    blockClassName,
    templateName,
    facetsAttributes,
    facetsAttributeTitles,
    facetsAttributesMulti
}) => {
  const toggleClerkFacets = () => {
    const els = document.querySelectorAll('clerk-facets-container');
    if(els.length > 0){
      els[0].classList.toggle('active');
    }
  }

  const adjustedClassName = ensureSingleWordClass(blockClassName)

  const { loading } = useQuery<Session>(session, {
    ssr: false,
  })

  useEffect(() => {
    const { Clerk, URLSearchParams } = window
    // Can be used to change the query after render.
    const rawQuery = new URLSearchParams(window.location.search).get("search_term")
    const clerkSearchSpan = document.querySelectorAll('#clerk-search') ? document.querySelectorAll('#clerk-search')[0] : null
    if(clerkSearchSpan && !loading && rawQuery && Clerk){
      clerkSearchSpan.setAttribute('data-query', rawQuery)
      Clerk('content', `.${adjustedClassName}`)
    }
  }, [adjustedClassName, loading, templateName])

  return adjustedClassName && templateName ?(

    <div className="page-width clerk-page-width">
      <span
          id="clerk-search"
          className={adjustedClassName}
          data-template="@search-page"
          data-target="#clerk-search-results"
          data-facets-attributes={facetsAttributes ? facetsAttributes : '' }
          data-facets-titles={facetsAttributeTitles ? facetsAttributeTitles : '' }
          data-facets-multiselect-attributes={facetsAttributesMulti ? facetsAttributesMulti : '' }
          data-facets-target="#clerk-search-filters"> 
      </span>

      <div id="clerk-show-facets" onClick={toggleClerkFacets}>Filters</div>
      <div className="clerk_flex_wrap">
        <div id="clerk-facets-container">
          <div id="clerk-search-filters"></div>
        </div>
        <div id="clerk-search-results"></div>
      </div>
    </div>

  ) : null
}

ClerkIoSearchPageBlock.schema = {
  title: 'admin/cms/clerkio.search.title',
  description: 'admin/cms/clerkio.search.description',
  type: 'object',
  properties: {
    blockClassName: {
        title: 'admin/cms/clerkio.search.block.class.name',
        description: 'admin/cms/clerkio.search.block.class.description',
        type: 'string',
        default: null
    },
    templateName: {
        title: 'admin/cms/clerkio.search.block.template.name',
        description: 'admin/cms/clerkio.search.block.template.description',
        type: 'string',
        default: null
    },
    facetsAttributes: {
        title: 'admin/cms/clerkio.search.block.facetsattributes.name',
        description: 'admin/cms/clerkio.search.block.facetsattributes.description',
        type: 'string',
        default: null
    },
    facetsAttributeTitles: {
        title: 'admin/cms/clerkio.search.block.facetsattributestitles.name',
        description: 'admin/cms/clerkio.search.block.facetsattributestitles.description',
        type: 'string',
        default: null
    },
    facetsAttributesMulti: {
        title: 'admin/cms/clerkio.search.block.facetsattributesmulti.name',
        description: 'admin/cms/clerkio.search.block.facetsattributesmulti.description',
        type: 'string',
        default: null
    }
  }
}

export default ClerkIoSearchPageBlock