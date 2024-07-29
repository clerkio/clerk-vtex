import { canUseDOM } from 'vtex.render-runtime'

import type { PixelMessage } from './typings/events'

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:orderPlaced': {
      const {
        ordersInOrderGroup: [orderId],
        visitorContactInfo: [customerEmail],
        transactionProducts,
      } = e.data

      const products = transactionProducts.map(product => {
        const { id, quantity, price } = product

        return {
          id,
          quantity,
          price,
        }
      })

      const { Clerk } = window

      const orderArgs: ClerkOrderAPI = {
        sale: orderId,
        email: customerEmail,
        products,
      }

      Clerk('call', 'log/sale', orderArgs)

      break
    }

    case 'vtex:userData': {
      const {
        email: email
      } = e.data

      const { Clerk } = window

      if (email && Clerk?._config?.collect_email) {
        Clerk('call', 'log/email', { email: email })
      }

      break
    }

    case 'vtex:newsletterSubscription': {
      const {
        email: email
      } = e.data

      const { Clerk } = window

      if (email && Clerk?._config?.collect_email) {
        Clerk('call', 'log/email', { email: email })
      }

      break
    }

    default: {
      break
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
