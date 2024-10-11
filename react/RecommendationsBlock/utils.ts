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

export const createContentParamArgs = (dataProps: DataProps) => {
  if (!Object.keys(dataProps).length) {
    return null
  }

  const contentParamArgs: ContentParamArgs = {}

  for (const [key, value] of Object.entries(dataProps)) {
    const argKey = key.replace('data-', '')

    if (argKey === 'products' || argKey === 'category') {
      continue
    }

    contentParamArgs[argKey] = value
  }

  return contentParamArgs
}

export const shallowEqual = (object1: DataProps, object2: DataProps) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] != object2[key]) {
      return false;
    }
  }

  return true;
}

export const resetContent = (context: Document, selector: string) => {
  const clerkElement = context.querySelector(`.${selector}`) ?? null;
  if(!clerkElement){
    return;
  }
  const dt = clerkElement.getAttribute("data-target") ?? null;
  const dft = clerkElement.getAttribute("data-facets-target") ?? null;
  emptyElement(context.body, dt);
  emptyElement(context.body, dft);
  clerkElement.innerHTML = '';
  clerkElement.removeAttribute("data-clerk-content-id");
}

export const emptyElement = (context: Element, selector: string | null) => {
  if(!context||!selector){
    return;
  }
  const el = context.querySelector(selector);
  if(!el){
    return;
  }
  el.innerHTML = '';
}

export const setPropCache = (window: Window, selector: string|undefined, props: DataProps, initial: boolean) => {
  if(!propCheckInputsValid(window, selector) || typeof selector == 'undefined'){
    return;
  }
  if(typeof window.Clerk[`_last_props`] != 'object'){
    window.Clerk[`_last_props`] = {};
  }
  if(typeof window.Clerk[`_last_props`][selector] == 'undefined' && initial){
    window.Clerk['_last_props'][selector] = props;
  }
  if(!initial){
    window.Clerk['_last_props'][selector] = props;
  }
}

export const havePropsChanged = (window: Window, selector: string, props: DataProps) => {
  if(!propCheckInputsValid(window, selector)){
    return false;
  }
  if(!shallowEqual(window.Clerk['_last_props'][selector], props)){
    return true;
  }
  return false;
}

export const propCheckInputsValid = (window: Window, selector: string|undefined) => {
  if(!selector || typeof selector == 'undefined'){
    return false;
  }
  if(typeof window.Clerk != "function"){
    return false;
  }
  return true;
}

export const isEmpty = (obj: object|null|undefined) => {
  if(obj === null || obj === undefined){
    return true;
  }
  if(Object.keys(obj).length === 0){
    return true;
  }
  return false;
}
