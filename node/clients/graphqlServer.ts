import type { InstanceOptions, IOContext } from '@vtex/api'
import { AppClient, GraphQLClient } from '@vtex/api'

export default class GraphQLServer extends AppClient {
  protected graphql: GraphQLClient

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('vtex.graphql-server@1.x', ctx, options)
    this.graphql = new GraphQLClient(this.http)
  }

  public query = async <T>(
    query: string,
    provider: string,
    locale?: string
  ): Promise<T> => {
    try {
      return (await this.graphql.query(
        {
          extensions: {
            persistedQuery: {
              provider,
              sender: 'vtex.clerkio-integration@0.x',
            },
          },
          query,
          variables: { query },
        },
        {
          params: {
            locale,
          },
          url: '/graphql',
        }
      )) as Promise<T>
    } catch (error) {
      return error
    }
  }
}
