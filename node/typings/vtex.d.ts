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

interface PriceRange {
  highPrice: number
  lowPrice: number
}

interface Items {
  itemId: string
  ean: string
  name: string
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
