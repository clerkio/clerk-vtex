import type { Tenant } from '@vtex/api'

const TEN_MINUTES_S = 10 * 60

const getBindingId = (tenantInfo: Tenant): string | undefined => {
  const { bindings } = tenantInfo
  const binding = bindings.find(
    ({ targetProduct }) => targetProduct === 'vtex-storefront'
  )

  return binding?.id
}

const transformSingleBindingSettings = (
  appConfig: AppConfig,
  bindingId: string
): AppConfig => {
  return {
    ...appConfig,
    settings: [
      {
        bindingId,
        clerkioToken: appConfig.clerkioToken ?? '',
        clerkioPrivateToken: appConfig.clerkioPrivateToken ?? '',
        clerkioTrackEmails: appConfig.clerkioTrackEmails ?? false,
        salesChannel: appConfig.salesChannel ?? '',
        defaultLocale: appConfig.defaultLocale ?? '',
        rootPath: appConfig.rootPath ?? '',
        clerkioLiveSearchEnabled: appConfig.clerkioLiveSearchEnabled ?? false,
        clerkSearchEnabled: appConfig.clerkSearchEnabled ?? false,
        clerkioSearchFacets: appConfig.clerkioSearchFacets ?? '',
        clerkioSearchFacetsMultiselect: appConfig.clerkioSearchFacetsMultiselect ?? '',
        clerkioSearchFacetsTitles: appConfig.clerkioSearchFacetsTitles ?? '',
        clerkioPowerstepEnabled: appConfig.clerkioPowerstepEnabled ?? false,
        clerkioBasketTrackingEnabled: appConfig.clerkioBasketTrackingEnabled ?? false,
        clerkioCollectEmails: appConfig.clerkioCollectEmails ?? false,
        clerkioDisableOrderSync: appConfig.clerkioDisableOrderSync ?? false,
      },
    ],
  }
}

export const normalizeAppSettings = async (
  appConfig: AppConfig,
  ctx: Context
): Promise<AppConfig> => {
  const {
    clients: { tenant },
    vtex: { account },
  } = ctx

  if (appConfig.bindingBounded) {
    return appConfig
  }

  try {
    const tenantInfo = await tenant.info({
      forceMaxAge: TEN_MINUTES_S,
      params: {
        q: account,
      },
    })

    const bindingId = getBindingId(tenantInfo)

    if (!bindingId) {
      throw new Error('Could not find binding')
    }

    return transformSingleBindingSettings(appConfig, bindingId)
  } catch (e) {
    e.message = 'Error trying to get tenant info'
    throw e
  }
}
