import { i18nConfig } from '@configs/i18n.config';
import {
  createInstance,
  type FlatNamespace,
  type InitOptions,
  type i18n,
  type Resource,
  type TFunction,
} from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

/**
 * **Server-side only!**
 * For client-side React components, use {@link useTranslation} from 'react-i18next' instead.
 *
 * Loads i18next translations for the given locale and namespaces, returning a translation function and resources.
 *
 * @template Ns - Tuple of namespace strings (e.g. ['common', 'not_found'])
 * @param locale - The locale/language code to load (e.g. 'en', 'th').
 * @param namespaces - Namespaces to load (tuple, e.g. namespaces('common', 'not_found')).
 * @param i18nInstance - (Optional) Existing i18next instance to use.
 * @param resources - (Optional) Preloaded resources to use instead of loading from backend.
 * @returns An object with:
 *   - t: Translation function (typed for the given namespaces)
 *   - i18n: The i18next instance
 *   - resources: The loaded translation resources
 *
 * @example
 *   // In a server component:
 *   const { t, resources } = await getTranslation('en', namespaces('common'));
 *   t('common:title');
 */
export async function getTranslation<Ns extends readonly FlatNamespace[]>(
  locale: string,
  namespaces: Ns = [] as unknown as Ns,
  i18nInstance?: i18n,
  resources?: Resource,
) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  const options: InitOptions = {
    lng: locale,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    ns: namespaces,
    fallbackNS: namespaces[0],
    defaultNS: namespaces[0],
    resources: resources,
    preload: !resources ? i18nConfig.locales : [],
    debug: false,
    showSupportNotice: false,
  };

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend((lng: string, ns: string) => {
        return import(`@locales/${lng}/${ns}.json`);
      }),
    );
  }

  await i18nInstance.init(options);

  const localizedResources: Resource = {};

  if (locale !== i18nConfig.defaultLocale) {
    const defaultResource = i18nInstance.getDataByLanguage(
      i18nConfig.defaultLocale,
    );
    if (defaultResource) {
      localizedResources[i18nConfig.defaultLocale] = defaultResource;
    }
  }

  const localeResource = i18nInstance.getDataByLanguage(locale);
  if (localeResource) {
    localizedResources[locale] = localeResource;
  }

  return {
    t: i18nInstance.t as unknown as TFunction<Ns>,
    i18n: i18nInstance,
    resources: localizedResources,
  };
}
