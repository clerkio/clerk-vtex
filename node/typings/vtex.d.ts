interface CategoryTreeItem {
  id: number
  name: string
  hasChildren: boolean
  url: string
  children: CategoryTreeItem[]
}

interface ProductAndSkuIds {
  data: {
    [key: string]: number[]
  }
  range: {
    total: number
    from: number
    to: number
  }
}

interface ProductInfo {
  productId: string
  productName: string
  description: string
  properties: ProductProperties[]
  productReference: string
  priceRange: {
    sellingPrice: PriceRange
    listPrice: PriceRange
  }
  items: Items[]
  link: string
  linkText: string
  categoryTree: Category[]
  brand?: string
  releaseDate: number | null
}

interface SelectedProperty {
  key: string
  value: string
}

interface Reference {
  key: string
  value: string
}

interface Items {
  itemId: string
  name: string
  ean?: string
  unitMultiplier?: number
  referenceId: Reference[]
  images: ImageUrl[]
  variations: Variations[]
  estimatedDateArrival: string
}

interface ProductProperties {
  originalName: string
  name: string
  values: string[]
}

interface Variations {
  originalName: string
  name: string
  values: string[]
}

interface PriceRange {
  highPrice: number
  lowPrice: number
}

interface ImageUrl {
  imageUrl: string
}

interface Category {
  id: number
}
interface OrderListResponse {
  list: OrderSummary[]
  paging: {
    total: number
    pages: number
  }
}

interface OrderSummary {
  orderId: string
  creationDate: string
  salesChannel: string
}

interface Order extends OrderSummary {
  items: Item[]
  clientProfileData: ClientProfileData
}

interface ClientProfileData {
  email: string
}

interface Item {
  id: string
  quantity: number
  sellingPrice: number
}

interface TenantQuery {
  data: {
    tenantInfo: TenantInfo
  }
}
interface TenantInfo {
  bindings: Binding[]
}

interface Binding {
  id: string
  defaultLocale: string
  targetProduct: string
  extraContext: {
    portal?: {
      salesChannel?: string
    }
  }
}

interface ProductsByIdentifierQuery {
  data: {
    productsByIdentifier: ProductInfo[]
  }
}
