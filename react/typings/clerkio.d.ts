interface ClerkOrderAPI {
  sale: string
  products: Array<{
    id: string
    quantity: number
    price: number
  }>
  email: string
}

/**
 * This is the Object returned by Clerk
 * @see https://docs.clerk.io/docs/clerkjs-content#dynamic-changes
 */
type ClerkContentInterfaceObject = {
  /**
   * Load more results
   */
  more: (number?) => void
  /**
   * Setter/getter
   * When passed two arguments it will cause a re-render of the content.
   */
  param: (unknown) => void
  /**
   * The HTML Element of the Content container.
   */
  element: HTMLElement
  /**
   * Id for the Clerk content (e.g. "category-page-popular" )
   */
  id: string
}
