// Clerk Props
export const DATA_INSTANT_SEARCH = {
    propName: 'data-instant-search',
    propField: 'clerkInputSelector',
  } as const
  export const DATA_SEARCH_QUERY = {
    propName: 'data-query',
    propField: 'searchTerm',
  } as const
  
  type PropData =
    | typeof DATA_INSTANT_SEARCH
    | typeof DATA_SEARCH_QUERY
  
  // Clerk Search logic
  const LOGIC_SEARCH = 'Search Page'
  const LOGIC_PREDICTIVE_SEARCH = 'Live Search'

  type SearchLogics =
    | typeof LOGIC_SEARCH
    | typeof LOGIC_PREDICTIVE_SEARCH
  
  class ClerkSearchLogic {
    public type: SearchLogics
    public prop: PropData | null
  
    constructor(type: SearchLogics, prop: PropData | null) {
      this.type = type
      this.prop = prop
    }
  }
  
  const SEARCH = new ClerkSearchLogic(
    LOGIC_SEARCH,
    DATA_SEARCH_QUERY
  )

  const PREDICTIVE_SEARCH = new ClerkSearchLogic(
    LOGIC_PREDICTIVE_SEARCH,
    DATA_INSTANT_SEARCH
  )
  
  export const logicTypes = [
    SEARCH,
    PREDICTIVE_SEARCH
  ] as const
  