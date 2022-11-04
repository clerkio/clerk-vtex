import { logicTypes } from './constants'

export const ensureSingleWordClass = (
  className: string | undefined
): string | undefined => {
  return className?.split(' ').join('-')
}

interface DataPropsArgs {
  contentLogic: typeof logicTypes[number]['type']
  values: {
    categoryId?: string
    keywords?: string[]
    userEmail?: string
    productIds?: string
  }
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

export const getProductIdFromContext = ({
  type,
  id,
}: {
  type: string
  id: string
}) => {
  return type === 'product' ? id : ''
}

type ContentParamArgs = Record<string, string | string[] | undefined>

export const createContentParamArgs = (
  dataProps: Record<string, string | string[] | undefined>
) => {
  if (!Object.keys(dataProps).length) {
    return null
  }

  const contentParamArgs: ContentParamArgs = {}

  for (const [key, value] of Object.entries(dataProps)) {
    const argKey = key.replace('data-', '')

    contentParamArgs[argKey] = value
  }

  return contentParamArgs
}
