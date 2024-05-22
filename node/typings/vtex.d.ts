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
  properties: ProductProperty[]
  productReference: string
  selectedProperties: SelectedProperty[]
  priceRange: {
    sellingPrice: PriceRange
    listPrice: PriceRange
  }
  items: Item[]
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

interface Item {
  itemId: string
  name: string
  ean: string
  referenceId: Reference[]
  images: Image[]
  variations: ProductProperty[]
  estimatedDateArrival: string
}

interface ProductProperty {
  originalName: string
  name: string
  values: string[]
}

interface PriceRange {
  highPrice: number
  lowPrice: number
}

interface Image {
  images: ImageUrl[]
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
