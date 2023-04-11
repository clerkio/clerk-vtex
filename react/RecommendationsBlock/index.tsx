import React, { useEffect } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { session } from 'vtex.store-resources/Queries'
import { useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'

import { DATA_CATEGORY, DATA_KEYWORDS, logicTypes } from './constants'
import {
  createClerkDataProps,
  createContentParamArgs,
  ensureSingleWordClass,
  getCategoryIdFromContext,
  getProductIdFromContext,
} from './utils'

interface BlockProps {
  blockClassName: string
  templateName: string
  contentLogic: typeof logicTypes[number]['type']
  categoryId?: string
  useContext?: boolean
  keywords?: Array<Record<'keyword', string>>
}

interface Session {
  getSession: {
    profile: {
      email: string
    } | null
  }
}

const CSS_HANDLES = ['container'] as const

const ClerkIoBlock: StorefrontFunctionComponent<BlockProps> = ({
  blockClassName,
  templateName,
  contentLogic,
  categoryId,
  useContext,
  keywords,
}) => {
  const adjustedClassName = ensureSingleWordClass(blockClassName)

  const {
    route: {
      pageContext: { type, id },
    },
  } = useRuntime()

  const { data, loading } = useQuery<Session>(session, {
    ssr: false,
  })

  const handles = useCssHandles(CSS_HANDLES)

  const dataProps = createClerkDataProps({
    contentLogic,
    values: {
      keywords: keywords?.map(({ keyword }) => keyword),
      categoryId: useContext
        ? getCategoryIdFromContext({ type, id })
        : categoryId,
      userEmail: data?.getSession.profile?.email ?? '',
      productIds: `[${getProductIdFromContext({ type, id })}]`,
    },
  })

  const contentParamArgs = createContentParamArgs(dataProps)

  useEffect(() => {
    const { Clerk } = window

    if (adjustedClassName && templateName && Clerk && !loading) {
      const clerk_element = document.querySelector(`.${adjustedClassName}`) ?? null
      if(clerk_element){
        clerk_element?.removeAttribute('data-clerk-content-id')
        const data_target_selector = clerk_element.getAttribute('data-target')
        const data_facets_target_selector = clerk_element.getAttribute('data-facets-target')
        if(data_target_selector){
          const clerk_data_target = document.querySelector(data_target_selector) ?? null
          if(clerk_data_target){
            clerk_data_target.innerHTML = ''
          }
        } else {
          clerk_element.innerHTML = ''
        }
        if(data_facets_target_selector){
          const clerk_data_facets_target = document.querySelector(data_facets_target_selector) ?? null
          if(clerk_data_facets_target){
            clerk_data_facets_target.innerHTML = ''
          }
        }
      }
      Clerk(
        'content',
        `.${adjustedClassName}`,
        (content: ClerkContentInterfaceObject) => {
          if (contentParamArgs) {
            content.param(contentParamArgs)
          }
        }
      )
    }
  }, [adjustedClassName, contentParamArgs, loading, templateName])

  return adjustedClassName && templateName ? (
    <div className={handles.container}>
      <span
        className={adjustedClassName}
        data-template={templateName}
        {...dataProps}
      />
    </div>
  ) : null
}

ClerkIoBlock.schema = {
  title: 'admin/cms/clerkio.recs.title',
  description: 'admin/cms/clerkio.recs.description',
  type: 'object',
  properties: {
    blockClassName: {
      title: 'admin/cms/clerkio.recs.block.class.name',
      description: 'admin/cms/clerkio.recs.block.class.description',
      type: 'string',
      default: null,
    },
    templateName: {
      title: 'admin/cms/clerkio.recs.block.template.name',
      description: 'admin/cms/clerkio.recs.block.template.description',
      type: 'string',
      default: null,
    },
    contentLogic: {
      title: 'admin/cms/clerkio.recs.block.logic.name',
      type: 'string',
      enum: logicTypes.map(({ type }) => type),
    },
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
              title: 'admin/cms/clerkio.recs.block.logic.category.useContext',
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
                      title: 'admin/cms/clerkio.recs.block.logic.category.id',
                    },
                  },
                },
              ],
            },
          },
        },
        {
          properties: {
            contentLogic: {
              enum: logicTypes
                .filter(({ prop }) => prop?.propName === DATA_KEYWORDS.propName)
                .map(({ type }) => type),
            },
            keywords: {
              minItems: 0,
              type: 'array',
              title: 'admin/cms/clerkio.recs.block.logic.keywords',
              items: {
                properties: {
                  keyword: {
                    type: 'string',
                    title: 'admin/cms/clerkio.recs.block.logic.keyword',
                  },
                },
              },
            },
          },
        },
      ],
    },
  },
}

export default ClerkIoBlock
