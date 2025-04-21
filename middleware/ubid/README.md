# About

This is our custom Thumbmark middleware to add thumbprint data to events sent to Silo.

UBID = User-Browser ID

## Types

```ts
/**
 * 
 * This is available via payload.obj.context
 */
interface CoreExtraContext {
  /**
   * This is usually used to flag an .identify() call to just update the trait, rather than "last seen".
   */
  active?: boolean | undefined;

  /**
   * Current user's IP address.
   */
  ip?: string | undefined;

  /**
   * Locale string for the current user, for example en-US.
   * @example en-US
   */
  locale?: string | undefined;
  /**
   * Dictionary of information about the user’s current location.
   */
  location?:
    | {
        /**
         * @example San Francisco
         */
        city?: string | undefined;
        /**
         * @example United States
         */
        country?: string | undefined;
        /**
         * @example 40.2964197
         */
        latitude?: string | undefined;
        /**
         * @example -76.9411617
         */
        longitude?: string | undefined;
        /**
         * @example CA
         */
        region?: string | undefined;
        /**
         * @example 100
         */
        speed?: number | undefined;
      }
    | undefined;

  /**
   * Dictionary of information about the current web page.
   */
  page?:
    | {
        /**
         * @example /academy/
         */
        path?: string | undefined;
        /**
         * @example https://www.foo.com/
         */
        referrer?: string | undefined;
        /**
         * @example projectId=123
         */
        search?: string | undefined;
        /**
         * @example Analytics Academy
         */
        title?: string | undefined;
        /**
         * @example https://segment.com/academy/
         */
        url?: string | undefined;
      }
    | undefined;

  /**
   * User agent of the device making the request.
   */
  userAgent?: string | undefined;

  /**
   * User agent data returned by the Client Hints API
   */
  userAgentData?:
    | {
        brands?:
          | {
              brand: string;
              version: string;
            }[]
          | undefined;
        mobile?: boolean | undefined;
        platform?: string | undefined;
        architecture?: string | undefined;
        bitness?: string | undefined;
        model?: string | undefined;
        platformVersion?: string | undefined;
        /** @deprecated in favour of fullVersionList */
        uaFullVersion?: string | undefined;
        fullVersionList?:
          | {
              brand: string;
              version: string;
            }[]
          | undefined;
        wow64?: boolean | undefined;
      }
    | undefined;

  /**
   * Information about the current library.
   *
   * **Automatically filled out by the library.**
   *
   * This type should probably be "never"
   */
  library?:
    | {
        /**
         * @example analytics-node-next/latest
         */
        name: string;
        /**
         * @example  "1.43.1"
         */
        version: string;
      }
    | undefined;

  /**
   * This is useful in cases where you need to track an event,
   * but also associate information from a previous identify call.
   * You should fill this object the same way you would fill traits in an identify call.
   */
  traits?: Traits | undefined;

  /**
   * Dictionary of information about the campaign that resulted in the API call, containing name, source, medium, term, content, and any other custom UTM parameter.
   */
  campaign?: Campaign | undefined;

  /**
   * Dictionary of information about the way the user was referred to the website or app.
   */
  referrer?:
    | {
        type?: string | undefined;
        name?: string | undefined;
        url?: string | undefined;
        link?: string | undefined;

        id?: string | undefined; // undocumented
        btid?: string | undefined; // undocumented?
        urid?: string | undefined; // undocumented?
      }
    | undefined;

  amp?:
    | {
        // undocumented?
        id: string;
      }
    | undefined;

  [key: string]: any;
  /**
   * Ok this is where I start making changes. This is a more accurate reflection of the actual types.
   */
  event: SegmentEvent;
}

type SegmentEventType =
  | 'track'
  | 'page'
  | 'identify'
  | 'group'
  | 'alias'
  | 'screen';

interface CoreSegmentEvent {
  messageId?: string | undefined;
  type: SegmentEventType;

  // page specific
  category?: string | undefined;
  name?: string | undefined;

  properties?: EventProperties | undefined;

  traits?: Traits | undefined; // Traits is only defined in 'identify' and 'group', even if it can be passed in other calls.

  integrations?: IntegrationsOptions | undefined;
  context?: CoreExtraContext | undefined;
  options?: CoreOptions | undefined;

  userId?: ID | undefined;
  anonymousId?: ID | undefined;
  groupId?: ID | undefined;
  previousId?: ID | undefined;

  event?: string | undefined;

  writeKey?: string | undefined;

  sentAt?: Date | undefined;

  _metadata?: SegmentEventMetadata | undefined;

  timestamp?: Timestamp | undefined;
}

export interface SegmentEventMetadata {
  failedInitializations?: unknown[] | undefined;
  bundled?: string[] | undefined;
  unbundled?: string[] | undefined;
  nodeVersion?: string | undefined;
  bundledConfigIds?: string[] | undefined;
  unbundledConfigIds?: string[] | undefined;
  bundledIds?: string[] | undefined;
}
```
