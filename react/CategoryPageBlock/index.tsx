import React, { useEffect } from 'react'
import { session } from 'vtex.store-resources/Queries'
import { useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { useQuery } from 'react-apollo'

import { DATA_CATEGORY, logicTypes } from './constants'
import {
  createClerkDataProps,
  ensureSingleWordClass,
  getCategoryIdFromContext,
  setDataValues
} from './utils'


interface ClerkIoCategoryPageProps {
    blockClassName: string
    templateName: string
    contentLogic: typeof logicTypes[number]['type']
    categoryId?: string
    facetsAttributes?: string
    facetsAttributeTitles?: string
    facetsAttributesMulti?: string
    facetsFilterButtonText?: string
    facetsViewMoreText?: string
    facetsDesignId?: string
    facetsPriceAppend?: string
    facetsPricePrepend?: string
    useContext?: boolean
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

const ClerkIoCategoryPageBlock: StorefrontFunctionComponent<ClerkIoCategoryPageProps> = ({
    blockClassName,
    templateName,
    contentLogic,
    categoryId,
    useContext,
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

  const {
    route: {
      pageContext: { type, id },
    },
  } = useRuntime()

  const { data, loading } = useQuery<Session>(session, {
    ssr: false,
  })

  const dataProps = createClerkDataProps({
    contentLogic,
    values: {
      categoryId: useContext
        ? getCategoryIdFromContext({ type, id })
        : categoryId,
      userEmail: data?.getSession.profile?.email ?? '',
    },
  })

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

  useEffect(() => {
    const { Clerk } = window
    if(!loading && Clerk){
      setDataValues(
        document,
        facetsAttributes,
        facetsAttributeTitles,
        facetsAttributesMulti,
        facetsViewMoreText,
        facetsDesignId,
        facetsPriceAppend,
        facetsPricePrepend
      )
      Clerk('content', `.${adjustedClassName}`)
    } else {
      // TODO: Implement no results message.
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
          {...dataProps}
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

// TODO: FIX Settings namespaces
ClerkIoCategoryPageBlock.schema = {
  title: 'admin/cms/clerkio.category.title',
  description: 'admin/cms/clerkio.category.description',
  type: 'object',
  properties: {
    blockClassName: {
        title: 'admin/cms/clerkio.category.block.class.name',
        description: 'admin/cms/clerkio.category.block.class.description',
        type: 'string',
        default: null
    },
    templateName: {
        title: 'admin/cms/clerkio.category.block.template.name',
        description: 'admin/cms/clerkio.category.block.template.description',
        type: 'string',
        default: null
    },
    contentLogic: {
      title: 'admin/cms/clerkio.recs.block.logic.name',
      type: 'string',
      enum: logicTypes.map(({ type }) => type),
    },
    facetsAttributes: {
        title: 'admin/cms/clerkio.category.block.facetsattributes.name',
        description: 'admin/cms/clerkio.category.block.facetsattributes.description',
        type: 'string',
        default: null
    },
    facetsAttributeTitles: {
        title: 'admin/cms/clerkio.category.block.facetsattributestitles.name',
        description: 'admin/cms/clerkio.category.block.facetsattributestitles.description',
        type: 'string',
        default: null
    },
    facetsAttributesMulti: {
        title: 'admin/cms/clerkio.category.block.facetsattributesmulti.name',
        description: 'admin/cms/clerkio.category.block.facetsattributesmulti.description',
        type: 'string',
        default: null
    },
    facetsFilterButtonText: {
      title: 'admin/cms/clerkio.category.block.facetsfilterbuttontext.name',
      description: 'admin/cms/clerkio.category.block.facetsfilterbuttontext.description',
      type: 'string',
      default: null
    },
    facetsViewMoreText: {
      title: 'admin/cms/clerkio.category.block.facetsviewmoretext.name',
      description: 'admin/cms/clerkio.category.block.facetsviewmoretext.description',
      type: 'string',
      default: null
    },
    facetsSearchboxText: {
      title: 'admin/cms/clerkio.category.block.facetssearchboxtext.name',
      description: 'admin/cms/clerkio.category.block.facetssearchboxtext.description',
      type: 'string',
      default: null
    },
    facetsDesignId: {
      title: 'admin/cms/clerkio.category.block.facetsdesignid.name',
      description: 'admin/cms/clerkio.category.block.facetsdesignid.description',
      type: 'string',
      default: null
    },
    facetsPriceAppend: {
      title: 'admin/cms/clerkio.category.block.facetspriceappend.name',
      description: 'admin/cms/clerkio.category.block.facetspriceappend.description',
      type: 'string',
      default: null
    },
    facetsPricePrepend: {
      title: 'admin/cms/clerkio.category.block.facetspriceprepend.name',
      description: 'admin/cms/clerkio.category.block.facetspriceprepend.description',
      type: 'string',
      default: null
    }
  },
  dependencies: {
      contentLogic: {
        oneOf: [
          {
            properties: {
              contentLogic: {
                enum: logicTypes
                  .filter(({ prop }) => prop?.propName === DATA_CATEGORY.propName)
                  .map(({ type }) => type),
              },
              useContext: {
                type: 'boolean',
                title: 'admin/cms/clerkio.category.block.logic.category.useContext',
                default: true,
              },
            },
            dependencies: {
              useContext: {
                oneOf: [
                  {
                    properties: {
                      useContext: {
                        enum: [false],
                      },
                      categoryId: {
                        type: 'string',
                        title: 'admin/cms/clerkio.category.block.logic.category.id',
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
}

export default ClerkIoCategoryPageBlock
