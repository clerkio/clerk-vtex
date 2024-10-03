import { logicTypes } from './constants'

interface DataPropsArgs {
  contentLogic: typeof logicTypes[number]['type']
  values: {
    categoryId?: string
    keywords?: string[]
    userEmail?: string
    productIds?: string
  }
}

export const ensureSingleWordClass = (
    className: string | undefined
  ): string | undefined => {
    return className?.split(' ').join('-')
  }
  
export const adjustFacetTitles = (
  facetsAttributeTitles: string | undefined
): string | undefined => {
  if(typeof facetsAttributeTitles != 'string' || !facetsAttributeTitles){
    return
  }

  let outPut = {}

  facetsAttributeTitles.split(',').forEach(pair => {
    const split_pair = pair.split(':')
    if(split_pair.length === 2){
      const __key = split_pair[0]
      const __val = split_pair[1]
      let tmp = {}
      tmp = { [__key]: __val }
      outPut = Object.assign({}, outPut, tmp);
    }
  })

  const json_titles = JSON.stringify(outPut)

  if(typeof json_titles == 'string'){
    return json_titles
  }
  
  return ''
  
}

export const createClerkDataProps = ({
  contentLogic,
  values,
}: DataPropsArgs) => {
  const { prop } = logicTypes.find(({ type }) => contentLogic === type) ?? {}

  return prop ? { [prop.propName]: values[prop.propField] } : {}
}

export const getCategoryIdFromContext = ({
  type,
  id,
}: {
  type: string
  id: string
}) => {
  const categoryType = ['category', 'department', 'subcategory']

  return categoryType.some(catType => type === catType) ? id : ''
}

export const createContentParamArgs = (dataProps: DataProps) => {
  if (!Object.keys(dataProps).length) {
    return null
  }

  const contentParamArgs: ContentParamArgs = {}

  for (const [key, value] of Object.entries(dataProps)) {
    const argKey = key.replace('data-', '')

    if (argKey === 'products') {
      continue
    }

    contentParamArgs[argKey] = value
  }

  return contentParamArgs
}

export const setDataValues = (
  context: Document,
  facetsAttributes: string|undefined,
  facetsAttributeTitles: string|undefined,
  facetsAttributesMulti: string|undefined,
  facetsViewMoreText: string|undefined,
  facetsDesignId: string|undefined,
  facetsPriceAppend: string|undefined,
  facetsPricePrepend: string|undefined
) => {
  const el = context.querySelector('#clerk-search');
  if(!el){ return }
  if(!facetsAttributes){
    const elToggle = context.querySelector('#clerk-show-facets');
    if(elToggle){ elToggle.remove() }
  } else {
    el.setAttribute('data-facets-attributes', JSON.stringify(facetsAttributes))
  }
  if(facetsAttributeTitles){
    const adjustedFacetTitles = adjustFacetTitles(facetsAttributeTitles)
    if(typeof adjustedFacetTitles == 'string'){
      el.setAttribute('data-facets-titles', adjustedFacetTitles)
    }
  }
  if(facetsAttributesMulti){
    el.setAttribute('data-facets-multiselect-attributes', JSON.stringify(facetsAttributesMulti))
  }
  if(facetsViewMoreText){
    el.setAttribute('data-facets-view-more-text', facetsViewMoreText)
  }
  if(facetsDesignId){
    el.setAttribute('data-facets-design', facetsDesignId)
  }
  if(facetsPriceAppend){
    el.setAttribute('data-facets-price-append', facetsPriceAppend)
  }
  if(facetsPricePrepend){
    el.setAttribute('data-facets-price-prepend', facetsPricePrepend)
  }
}
