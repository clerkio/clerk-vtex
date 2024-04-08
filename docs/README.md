📢 Use this project, contribute to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# ClerkIO Integration

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

This Apps Allow Stores to integrate with the **Recommendation Shelves** that **ClerkIO Provides.**

## Main Features

1. The app has the option of creating a feed per **language and per binding** supported on the store.
2. Design of the shelf and the recommendation comes from ClerkIO.
3. The Store can Declare the ClerkIO Block **anywhere** on their site and configure the **Recommendation Logic** as they need on **VTEX Site-Editor**.

## Initial Setup

1. On the **vtex cli** run `vtex install clerkiopartnerdk.integration-vtex`.
   You can confirm that the app has now been installed by running `vtex ls` again.
2. Access the **Apps** section in your account's admin page and look for the **ClerkIO Integration** box. Once you find it, click on the box.
   Fill in the Fields as requested. For MultiBinding Sites, click on the enable configuration by binding to match a Clerk Store to each Binding.
3. Generate the feeds for products, categories and orders by making a POST request to the following endpoints (replacing the account and workspace):

Do a GET Request to this following endpoint:
`https://app.io.vtex.com/clerkiopartnerdk.integration-vtex/v1/{{accountName}}/{{workspace}}/_v/integration-vtex/clerk-feed/{{bindingId}}`

It requires VtexIdclientAutCookie to be sent as header.

_**Notes:**_

_**The first call to the generation of the feed will respond with an empty array.
Depending on the size of your store Catalogue the feed might take some time to generate**_

_\* **There is a [known issue](#known-issues) with the generation of the orders feed**_

## Configuration VTEX Search & Recommendations

_**Important: Before proceeding please make sure you have already completed the setup in ClerkIO following the instructions [below](#configuration-clerkio)**_

1. On your store theme, Add `clerkiopartnerdk.integration-vtex` 1.x as a theme peerDependency in the `manifest.json` file

   ```json
   "peerDependencies": {
   "clerkiopartnerdk.integration-vtex": "1.x"
   }
   ```

2. add the `clerkio_recommendations` block anywhere on your store. Example: in `home.json`

```json
{
  "store.home": {
    "blocks": [
      "responsive-layout.desktop#homepage",
      "responsive-layout.mobile#homepage"
    ]
  },
  "responsive-layout.desktop#homepage": {
    "children": ["clerkio_recommendations"]
  }
}
```

_**Note: for this step onwards, please make sure you have already completed the configuration on ClerkIO steps 1 - 4.**_

3. Go to VTEX Site Editor, and on the right side menu a ClerkIO block will be displayed. Click on it.

4. Fill in the information required on the block.
   `Block Class Name`: insert unique identifier for the block within the page it is used on. Eg. clerk-product-page-alternatives
   `Template Name`: insert the ID provided by Clerk on the previously created Content.
   `Product Logic`: match the recommendation logic to the one specified on the previously created Content on Clerk. User can get the details and usage for different product logics on Clerk.io. The available product logics are:

| Product Logic                     | Details                                                                                                                                                                                                         |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Best Sellers                      |
| Hot Products                      |
| Newest Products                   |
| Best Sellers In Category          | Send a category id as `data-category` to Clerk block. When block is placed in a category page, the category id can be obtained from the page context. User can also manually add a category id via site editor. |
| Hot Products In Category          | Send a category id as `data-category` to Clerk block. When placed in a category page, the category id can be obtained from the page context. User can also manually add a category id via site editor.          |
| Newest Products in Category       | Send a category id as `data-category` to Clerk block. When placed in a category page, the category id can be obtained from the page context. User can also manually add a category id via site editor.          |
| Best Alternative Products         | When added into a product page, sends the product id as `data-products` to Clerk block. Product id is obtained from context.                                                                                    |
| Best Cross-Sell Produts           | When added into a product page, sends the product id as `data-products` to Clerk block. Product id is obtained from context.                                                                                    |
| Recommendations Based On Keywords | User can add a list of keywords via site editor that will be sent to Clerk as `data-keywords`                                                                                                                   |
| Visitor Recommendations           |
| Visitor Alternatives              |
| Visitor Click History             |
| Recommendations Based On Orders   | If there is a user logged in the store, the block will send the user email to Clerk as `data-email`                                                                                                             |
| Similar To Order History          | If there is a user logged in the store, the block will send the user email to Clerk as `data-email`                                                                                                             |
| Customer Order History            | If there is a user logged in the store, the block will send the user email to Clerk as `data-email`                                                                                                             |
| What Customers Look At Right Now  |
| Recently Purchased Products       |

You can also implement a search page in the same manner, by adding a block to your theme. The search page block is called: `clerkio_searchpage`

The App will also create a dedicated search page route on `/clerk-search?searchTerm=__QUERY__`. This route already has the `clerkio_searchpage` block added in the body.

The App also creates a component search input field for use in your header: `clerkio_searchinput`. By default this input field takes you to the dedicated page route created by the app.

Predictive search can also be enabled through the component named: `clerkio_livesearch`. This will listen for keystrokes on a selected input field and give real time search results.

Both `clerkio_searchpage` and `clerkio_livesearch` have fields available in the Site Editor where you can control use of facets, translation texts.

Live search and search page can be used independently, but the search page will only take the query as `searchTerm` from the urls params by default.

`clerkio_categorypage`:

Parameters:

Block Class Name :: Class Name in DOM. Eg. `category-page-popular`

Template Name :: Template Content Name from clerk.io. Eg. `@category-page-popular`

Facets :: Attributes to be used for facets, separated by commas. Eg. `price,categories`

Facets Titles :: Attribute titles as rendered in the facets. Eg. `price:Prix,categories:Collection`

Multiselect Facets :: Attributes to be used for facets, with multiple allowed selections within a group. Eg. `price,categories`

Filter Button Text :: Localized Text Message for Facets toggle button. Eg. `Options`

View More Button Text :: Localized Text Message on the View More Button on facets with more than 12 entries. Eg. `Show All`

Search for ... Text :: Localized placeholder in the text filter field within a facet group. Eg. `Recherche ici`

Facets Design ID :: The ID of the custom Facets Design Template you may wish to use. Eg. `123455`

Facets Price Append :: The Symbol you may wish to append to prices in the facets.

Facets Price Prepend :: The Symbol you may wish to prepend to prices in the facets.


`clerkio_searchpage`:

Parameters:

Block Class Name :: Class Name in DOM. Eg. `product-page-alternatives`

Template Name :: Template Content Name from clerk.io. Eg. `@product-page-alternatives`

Facets :: Attributes to be used for facets, separated by commas. Eg. `price,categories`

Facets Titles :: Attribute titles as rendered in the facets. Eg. `price:Prix,categories:Collection`

Multiselect Facets :: Attributes to be used for facets, with multiple allowed selections within a group. Eg. `price,categories`

Filter Button Text :: Localized Text Message for Facets toggle button. Eg. `Options`

View More Button Text :: Localized Text Message on the View More Button on facets with more than 12 entries. Eg. `Show All`

Search for ... Text :: Localized placeholder in the text filter field within a facet group. Eg. `Recherche ici`

Facets Design ID :: The ID of the custom Facets Design Template you may wish to use. Eg. `123455`

Facets Price Append :: The Symbol you may wish to append to prices in the facets.

Facets Price Prepend :: The Symbol you may wish to prepend to prices in the facets.

`clerkio_livesearch`:

Parameters:

Block Class Name :: Class Name in DOM. Eg. `product-page-alternatives`

Template Name :: Template Content Name from clerk.io. Eg. `@product-page-alternatives`

Instant Search Selector :: CSS Selector for Search Input . Eg. `#clerk-search-input`

Instant Search Suggestions :: Number of Search Suggestions. Eg. `3`

Instant Search Categories :: Number of Search Categories. Eg. `3`

Instant Search Pages :: Number of Search Pages. Eg. `2`

Instant Search Positioning :: Position of Live Search. Eg. `left`

`clerkio_searchinput`:

Search Input Placeholder :: Placeholder text inside dedicated Search Input Field. Eg. `Suche hier...`

## Configuration ClerkIO

1. Create a new store on ClerkIO dashboard. For multi-binding sites, each binding should be a store on Clerk.
2. Go to Data -> Data Sync Settings -> Sync Method and Select `ClerkIO JSON Feed`. once prompted to insert the url, insert the following URL format:
   `https://{{accountName}}.myvtex.com/_v/integration-vtex/clerk-feed/{{bindingId}}`
   and click on data sync. _**This feed URL is exclusive for the use of ClerkIO.**_

If you want to validate your store's feed use this endpoint instead:
`https://app.io.vtex.com/clerkiopartnerdk.integration-vtex/v1/{{accountName}}/{{workspace}}/_v/integration-vtex/clerk-feed/{{bindingId}}`
this endpoint requires VTEX authentication.

3. Go to Recommendations -> Design and create a new Shelf design to suit your store Style.
4. Go to Recommendations -> Content and create a new recommendation using the previously defined Design and the business rule you want to apply.
   Repeat this step for every recommendation rule you want to include on your store.

## Known Issues

#### Order feed generation

There is an issue with the generation of the order feed when a store has a high volume of orders. There is not a specific number of orders that could cause this issue, but we tested the generation of the feed in accounts with less than 30k orders without issues although this is not a guaranteed result.
A possible workaround for this would be to install the app in a production workspace for the account while the integration is in the process of being implemented (this has been done in some accounts where the implementation procees lasted three months). This way and by configuring on Clerk's admin panel for the store, the orders receveid by the store while in development could be used by Clerk to get the data they need.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/filafb"><img
          src="https://avatars.githubusercontent.com/u/38737958?v=4" width="100px;"
          alt="" /><br /><sub><b>Fila</b></sub></a><br /><a
        href="https://github.com/vtex-apps/clerkio-integration/commits?author=filafb" title="Code">=»</a></td>
    <td align="center"><a href="https://github.com/edyespinal"><img
          src="https://avatars.githubusercontent.com/u/17585823?v=4" width="100px;" alt="" /><br /><sub><b>Edy
            Espinal</b></sub></a><br /><a
        href="https://github.com/vtex-apps/clerkio-integration/commits?author=edyespinal" title="Code">=»</a></td>
    <td align="center"><a href="https://github.com/cesarocampov"><img
          src="https://avatars.githubusercontent.com/u/58808189?v=4" width="100px;" alt="" /><br /><sub><b>César
            Ocampo</b></sub></a><br /><a
        href="https://github.com/vtex-apps/clerkio-integration/commits?author=cesarocampov" title="Code">=»</a></td>
    <td align="center"><a href="https://github.com/FoulBachelor"><img
          src="https://avatars.githubusercontent.com/u/89036433?v=4" width="100px;" alt="" /><br /><sub><b>Alexander
            Stage</b></sub></a><br /><a
        href="https://github.com/FoulBachelor/clerkio-integration-vtex/commits?author=FoulBachelor" title="Code">=»</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
