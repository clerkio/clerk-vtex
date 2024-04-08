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
