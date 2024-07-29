interface AppConfig {
  bindingBounded: boolean
  settings: BindingAppConfig[]
  /**
   * The AppConfig object has the following properties
   * in the root level when the settings is not binding bounded
   */
  clerkioToken?: string
  clerkioPrivateToken?: string
  clerkioTrackEmails?: boolean
  salesChannel?: string
  defaultLocale?: string
  rootPath?: string
  clerkioLiveSearchEnabled?: boolean
  clerkSearchEnabled?: boolean
  clerkioPowerstepEnabled?: boolean
  clerkioBasketTrackingEnabled?: boolean
  clerkioCollectEmails?: boolean
  clerkioDisableOrderSync?: boolean
  clerkioSearchFacetsEnabled?: boolean
  clerkioSearchFacets?: string
  clerkioSearchFacetsMultiselect?: string
  clerkioSearchFacetsTitles?: string
}

interface BindingAppConfig {
  bindingId: string
  clerkioToken: string
  clerkioPrivateToken: string
  clerkioTrackEmails?: boolean
  salesChannel: string
  defaultLocale: string
  rootPath?: string
  clerkioLiveSearchEnabled?: boolean
  clerkSearchEnabled?: boolean
  clerkioPowerstepEnabled?: boolean
  clerkioBasketTrackingEnabled?: boolean
  clerkioCollectEmails?: boolean
  clerkioDisableOrderSync?: boolean
  clerkioSearchFacetsEnabled?: boolean
  clerkioSearchFacets?: string
  clerkioSearchFacetsMultiselect?: string
  clerkioSearchFacetsTitles?: string
}

interface ListOrderParams {
  creationDate: string
  page?: number
}

type FeedType = 'order' | 'product' | 'category'

interface ProductFeedEntries {
  binding?: string
  entries?: number
}
interface FeedStatus {
  startedAt?: string
  type: FeedType
  finishedAt?: string
  entries?: number | ProductFeedEntries[]
  error?: boolean
}

interface BindingInfo {
  id: string
  locale: string
  salesChannel: string
}
