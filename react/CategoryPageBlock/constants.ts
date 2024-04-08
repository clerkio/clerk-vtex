// Clerk Props
export const DATA_CATEGORY = {
  propName: 'data-category',
  propField: 'categoryId',
} as const
export const DATA_PRODUCTS = {
  propName: 'data-products',
  propField: 'productIds',
} as const
export const DATA_KEYWORDS = {
  propName: 'data-keywords',
  propField: 'keywords',
} as const
export const DATA_EMAIL = {
  propName: 'data-email',
  propField: 'userEmail',
} as const

type PropData =
  | typeof DATA_CATEGORY
  | typeof DATA_PRODUCTS
  | typeof DATA_KEYWORDS
  | typeof DATA_EMAIL

// Clerk Product logic
const LOGIC_BEST_SELLERS = 'Best Sellers'
const LOGIC_HOT_PRODUCTS = 'Hot Products'
const LOGIC_NEWEST_PRODUCTS = 'Newest Products'
const LOGIC_BEST_SELLERS_IN_CATEGORY = 'Best Sellers In Category'
const LOGIC_HOT_PRODUCTS_IN_CATEGORY = 'Hot Products In Category'
const LOGIC_NEWEST_PRODUCTS_IN_CATEGORY = 'Newest Products in Category'
const LOGIC_BEST_ALTERNATIVE_PRODUCTS = 'Best Alternative Products'
const LOGIC_BEST_CROSS_SELL_PRODUTS = 'Best Cross-Sell Produts'
const LOGIC_RECOMMENDATIONS_BASED_ON_KEYWORDS =
  'Recommendations Based On Keywords'

const LOGIC_VISITOR_RECOMMENDATIONS = 'Visitor Recommendations'
const LOGIC_VISITOR_ALTERNATIVES = 'Visitor Alternatives'
const LOGIC_VISITOR_CLICK_HISTORY = 'Visitor Click History'
const LOGIC_RECOMMENDATIONS_BASED_ON_ORDERS = 'Recommendations Based On Orders'
const LOGIC_SIMILAR_TO_ORDER_HISTORY = 'Similar To Order History'
const LOGIC_CUSTOMER_ORDER_HISTORY = 'Customer Order History'
const LOGIC_WHAT_CUSTOMERS_LOOK_AT_RIGHT_NOW =
  'What Customers Look At Right Now'

const LOGIC_RECENTLY_PURCHASED_PRODUCTSW = 'Recently Purchased Products'

type ProductLogics =
  | typeof LOGIC_BEST_SELLERS
  | typeof LOGIC_HOT_PRODUCTS
  | typeof LOGIC_NEWEST_PRODUCTS
  | typeof LOGIC_BEST_SELLERS_IN_CATEGORY
  | typeof LOGIC_HOT_PRODUCTS_IN_CATEGORY
  | typeof LOGIC_NEWEST_PRODUCTS_IN_CATEGORY
  | typeof LOGIC_BEST_ALTERNATIVE_PRODUCTS
  | typeof LOGIC_BEST_CROSS_SELL_PRODUTS
  | typeof LOGIC_RECOMMENDATIONS_BASED_ON_KEYWORDS
  | typeof LOGIC_VISITOR_RECOMMENDATIONS
  | typeof LOGIC_VISITOR_ALTERNATIVES
  | typeof LOGIC_VISITOR_CLICK_HISTORY
  | typeof LOGIC_RECOMMENDATIONS_BASED_ON_ORDERS
  | typeof LOGIC_SIMILAR_TO_ORDER_HISTORY
  | typeof LOGIC_CUSTOMER_ORDER_HISTORY
  | typeof LOGIC_WHAT_CUSTOMERS_LOOK_AT_RIGHT_NOW
  | typeof LOGIC_RECENTLY_PURCHASED_PRODUCTSW

class ClerkProductLogic {
  public type: ProductLogics
  public prop: PropData | null

  constructor(type: ProductLogics, prop: PropData | null) {
    this.type = type
    this.prop = prop
  }
}

const BEST_SELLERS = new ClerkProductLogic(LOGIC_BEST_SELLERS, null)
const HOT_PRODUCTS = new ClerkProductLogic(LOGIC_HOT_PRODUCTS, null)
const NEWEST_PRODUCTS = new ClerkProductLogic(LOGIC_NEWEST_PRODUCTS, null)
const BEST_SELLERS_IN_CATEGORY = new ClerkProductLogic(
  LOGIC_BEST_SELLERS_IN_CATEGORY,
  DATA_CATEGORY
)

const HOT_PRODUCTS_IN_CATEGORY = new ClerkProductLogic(
  LOGIC_HOT_PRODUCTS_IN_CATEGORY,
  DATA_CATEGORY
)

const NEWEST_PRODUCTS_IN_CATEGORY = new ClerkProductLogic(
  LOGIC_NEWEST_PRODUCTS_IN_CATEGORY,
  DATA_CATEGORY
)

const BEST_ALTERNATIVE_PRODUCTS = new ClerkProductLogic(
  LOGIC_BEST_ALTERNATIVE_PRODUCTS,
  DATA_PRODUCTS
)

const BEST_CROSS_SELL_PRODUTS = new ClerkProductLogic(
  LOGIC_BEST_CROSS_SELL_PRODUTS,
  DATA_PRODUCTS
)

const RECOMMENDATIONS_BASED_ON_KEYWORDS = new ClerkProductLogic(
  LOGIC_RECOMMENDATIONS_BASED_ON_KEYWORDS,
  DATA_KEYWORDS
)

const VISITOR_RECOMMENDATIONS = new ClerkProductLogic(
  LOGIC_VISITOR_RECOMMENDATIONS,
  null
)

const VISITOR_ALTERNATIVES = new ClerkProductLogic(
  LOGIC_VISITOR_ALTERNATIVES,
  null
)

const VISITOR_CLICK_HISTORY = new ClerkProductLogic(
  LOGIC_VISITOR_CLICK_HISTORY,
  null
)

const RECOMMENDATIONS_BASED_ON_ORDERS = new ClerkProductLogic(
  LOGIC_RECOMMENDATIONS_BASED_ON_ORDERS,
  DATA_EMAIL
)

const SIMILAR_TO_ORDER_HISTORY = new ClerkProductLogic(
  LOGIC_SIMILAR_TO_ORDER_HISTORY,
  DATA_EMAIL
)

const CUSTOMER_ORDER_HISTORY = new ClerkProductLogic(
  LOGIC_CUSTOMER_ORDER_HISTORY,
  DATA_EMAIL
)

const WHAT_CUSTOMERS_LOOK_AT_RIGHT_NOW = new ClerkProductLogic(
  LOGIC_WHAT_CUSTOMERS_LOOK_AT_RIGHT_NOW,
  null
)

const RECENTLY_PURCHASED_PRODUCTS = new ClerkProductLogic(
  LOGIC_RECENTLY_PURCHASED_PRODUCTSW,
  DATA_EMAIL
)

export const logicTypes = [
  BEST_SELLERS,
  HOT_PRODUCTS,
  NEWEST_PRODUCTS,
  BEST_SELLERS_IN_CATEGORY,
  HOT_PRODUCTS_IN_CATEGORY,
  NEWEST_PRODUCTS_IN_CATEGORY,
  BEST_ALTERNATIVE_PRODUCTS,
  BEST_CROSS_SELL_PRODUTS,
  RECOMMENDATIONS_BASED_ON_KEYWORDS,
  VISITOR_RECOMMENDATIONS,
  VISITOR_ALTERNATIVES,
  VISITOR_CLICK_HISTORY,
  RECOMMENDATIONS_BASED_ON_ORDERS,
  SIMILAR_TO_ORDER_HISTORY,
  CUSTOMER_ORDER_HISTORY,
  WHAT_CUSTOMERS_LOOK_AT_RIGHT_NOW,
  RECENTLY_PURCHASED_PRODUCTS,
] as const
