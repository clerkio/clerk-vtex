import React, { useEffect } from 'react'
import { session } from 'vtex.store-resources/Queries'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import {
  ensureSingleWordClass,
  adjustFacetTitles
} from './utils'

interface ClerkIoSearchPageProps {
    blockClassName: string
    templateName: string
    facetsAttributes?: string
    facetsAttributeTitles?: string
    facetsAttributesMulti?: string
    facetsFilterButtonText?: string
    facetsViewMoreText?: string
    facetsDesignId?: string
    facetsPriceAppend?: string
    facetsPricePrepend?: string
}

interface Session {
  getSession: {
    profile: {
      email: string
    } | null
  }
}

const CSS_HANDLES = [
  'clerk-page-width',
  'clerk-search',
  'clerk-show-facets',
  'clerk-flex-wrap',
  'clerk-facets-container',
  'clerk-search-filters',
  'clerk-search-results'
] as const

const ClerkIoSearchPageBlock: StorefrontFunctionComponent<ClerkIoSearchPageProps> = ({
    blockClassName,
    templateName,
    facetsAttributes,
    facetsAttributeTitles,
    facetsAttributesMulti,
    facetsFilterButtonText,
    facetsViewMoreText,
    facetsDesignId,
    facetsPriceAppend,
    facetsPricePrepend,
}) => {

  const handles = useCssHandles(CSS_HANDLES)

  const toggleClerkFacets = () => {
    const facetContainer = document.querySelector('#clerk-facets-container') ?? null
    if(facetContainer){
      const containerStyle = facetContainer.getAttribute('style') ?? null
      if(!containerStyle){
        facetContainer.setAttribute('style', 'display: block;')
      } else {
        facetContainer.removeAttribute('style')
      }
    }
  }

  const adjustedClassName = ensureSingleWordClass(blockClassName)

  const { loading } = useQuery<Session>(session, {
    ssr: false,
  })

  useEffect(() => {
    const { Clerk, URLSearchParams } = window
    // Can be used to change the query after render.
    const rawQuery = new URLSearchParams(window.location.search).get("searchTerm")
    const clerkSearchSpan = document.querySelector('#clerk-search') ?? null
    if(clerkSearchSpan && !loading && rawQuery && Clerk){
      clerkSearchSpan.setAttribute('data-query', rawQuery)
      if(facetsAttributes){
        clerkSearchSpan.setAttribute('data-facets-attributes', JSON.stringify(facetsAttributes.split(',')))
      } else {
        const clerkFacetToggle = document.querySelector('#clerk-show-facets') ?? null
        if(clerkFacetToggle){
          clerkFacetToggle.remove()
        }
      }
      if(facetsAttributeTitles){
        const adjustedFacetTitles = adjustFacetTitles(facetsAttributeTitles)
        if(typeof adjustedFacetTitles == 'string'){
          clerkSearchSpan.setAttribute('data-facets-titles', adjustedFacetTitles)
        }
      }
      if(facetsAttributesMulti){
        clerkSearchSpan.setAttribute('data-facets-multiselect-attributes', JSON.stringify(facetsAttributesMulti.split(',')))
      }
      if(facetsViewMoreText){
        clerkSearchSpan.setAttribute('data-facets-view-more-text', facetsViewMoreText)
      }
      if(facetsDesignId){
        clerkSearchSpan.setAttribute('data-facets-design', facetsDesignId)
      }
      if(facetsPriceAppend){
        clerkSearchSpan.setAttribute('data-facets-price-append', facetsPriceAppend)
      }
      if(facetsPricePrepend){
        clerkSearchSpan.setAttribute('data-facets-price-prepend', facetsPricePrepend)
      }
      Clerk('content', `.${adjustedClassName}`)
    } else {
      // Show no results search
    }
  }, [adjustedClassName, loading, templateName])

  return adjustedClassName && templateName ? (

    <div 
      id="clerk-page-width"
      className={`clerk-page-width ${handles['clerk-page-width']}`}>
      <span
          id="clerk-search"
          className={adjustedClassName}
          data-template={templateName}
          data-target="#clerk-search-results"
          data-facets-target="#clerk-search-filters"> 
      </span>

      <div 
      id="clerk-show-facets" 
      className={`clerk-show-facets ${handles['clerk-show-facets']}`}
      onClick={toggleClerkFacets}>
        {facetsFilterButtonText ? facetsFilterButtonText : 'Filters'}
      </div>
      <div 
        className={`clerk-flex-wrap ${handles['clerk-flex-wrap']}`}>
        <div 
          id="clerk-facets-container"
          className={`clerk-facets-container ${handles['clerk-facets-container']}`}
          >
          <div 
            id="clerk-search-filters"
            className={`clerk-search-filters ${handles['clerk-search-filters']}`}
            >
          </div>
        </div>
        <div 
          id="clerk-search-results"
          className={`clerk-search-results ${handles['clerk-search-results']}`}
          >
        </div>
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
    },
    facetsFilterButtonText: {
      title: 'admin/cms/clerkio.search.block.facetsfilterbuttontext.name',
      description: 'admin/cms/clerkio.search.block.facetsfilterbuttontext.description',
      type: 'string',
      default: null
    },
    facetsViewMoreText: {
      title: 'admin/cms/clerkio.search.block.facetsviewmoretext.name',
      description: 'admin/cms/clerkio.search.block.facetsviewmoretext.description',
      type: 'string',
      default: null
    },
    facetsSearchboxText: {
      title: 'admin/cms/clerkio.search.block.facetssearchboxtext.name',
      description: 'admin/cms/clerkio.search.block.facetssearchboxtext.description',
      type: 'string',
      default: null
    },
    facetsDesignId: {
      title: 'admin/cms/clerkio.search.block.facetsdesignid.name',
      description: 'admin/cms/clerkio.search.block.facetsdesignid.description',
      type: 'string',
      default: null
    },
    facetsPriceAppend: {
      title: 'admin/cms/clerkio.search.block.facetspriceappend.name',
      description: 'admin/cms/clerkio.search.block.facetspriceappend.description',
      type: 'string',
      default: null
    },
    facetsPricePrepend: {
      title: 'admin/cms/clerkio.search.block.facetspriceprepend.name',
      description: 'admin/cms/clerkio.search.block.facetspriceprepend.description',
      type: 'string',
      default: null
    }
  }
}

export default ClerkIoSearchPageBlock
