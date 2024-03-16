export interface PixelConfiguration {
  /** Whether to start tracking immediately. Default is `false` */
  enabled?: boolean;
  /** Your Facebook Pixel ID */
  pixelId: string;
}

export interface PixelEventMeta {
  eventID?: string;
}

export interface PixelEventProperties {
  /** Category of the page/product. */
  content_category?: string;

  /**
   * Product IDs associated with the event, such as SKUs.
   * @example ['ABC123', 'XYZ789']
   */
  content_ids?: string[] | number[];

  /** Name of the page/product. */
  content_name?: string;

  /**
   * If the IDs being passed in `content_ids`or `contents` parameter are IDs of products, then the value should be '**product**'.
   * Either '**product**' or '**product_group**' base on the `content_ids` or `contents` being passed.
   * If product group IDs are being passed, then the value should be '**product_group**'.
   * 
   * If the ID's being passed into `content_ids` are flight ID's from your commerce catalog, then the value should be **flight**' 
   */
  content_type?: 'product' | 'product_group' | 'flight';

  // tslint:disable-next-line: max-line-length
  /** An array of JSON objects that contains the quantity and the International Article Number (EAN) when applicable, or other product or content identifier(s).
   * id and quantity are the required fields.
   * @example [{'id': 'ABC123', 'quantity': 2}, {'id': 'XYZ789', 'quantity': 2}]
   */
  contents?: object[];

  /**
   * Used with `InitiateCheckout` event.
   * The number of items when checkout was initiated.
   */
  num_items?: number;

  /** Predicted lifetime value of a subscriber as defined by the advertiser and expressed as an exact value. */
  predicted_ltv?: number;

  /**
   * Used with the `Search` event.
   * The string entered by the user for the search.
   */
  search_string?: string;

  /** Used with the `CompleteRegistration` event, to show the status of the registration. */
  status?: boolean;

  /** The value of a user performing this event to the business. */
  value?: number;

  /**
   * The currency for the `value` specified.
   *
   * See {@link https://developers.facebook.com/docs/marketing-api/currencies Facebook Pixel docs - currency codes}
   */
  currency?:
  'AED' | 'ARS' | 'AUD' |
  'BDT' | 'BOB' | 'BRL' |
  'CAD' | 'CHF' | 'CLP' | 'CNY' | 'COP' | 'CRC' | 'CZK' |
  'DKK' | 'DZD' |
  'EGP' | 'EUR' |
  'GBP' | 'GTQ' |
  'HKD' | 'HNL' | 'HUF' |
  'IDR' | 'ILS' | 'INR' | 'ISK' |
  'JPY' |
  'KES' | 'KRW' |
  'MOP' | 'MXN' | 'MYR' |
  'NGN' | 'NIO' | 'NOK' | 'NZD' |
  'PEN' | 'PHP' | 'PKR' | 'PLN' | 'PYG' |
  'QAR' |
  'RON' | 'RUB' |
  'SAR' | 'SEK' | 'SGD' |
  'THB' | 'TRY' | 'TWD' |
  'USD' | 'UYU' |
  'VEF' | 'VND' |
  'ZAR';
  

  /* FLIGHT EVENT PROPERTIES */

  /** 
   * HIGHLY RECOMMENDED: departure date 
   * Allows you to target people based on their travel dates, using a booking window
   * Improves the landing experience with travel dates filled in using template tags
   * use YYYYMMDD, YYYY-MM-DD, YYYY-MM-DDThh:mmTZD or YYYY-MM-DDThh:mm:ssTZD
   */
  departing_departure_date?: string;

  /**
   * HIGHLY RECOMMENDED: return date, in case of round trip, remove otherwise
   * use YYYYMMDD, YYYY-MM-DD, YYYY-MM-DDThh:mmTZD or YYYY-MM-DDThh:mm:ssTZD
   */
  returning_departure_date?: string;

  /* REQUIRED: use official IATA code of departure airport */
  origin_airport?: string;

  /* REQUIRED: use official IATA code of destination airport */
  destination_airport?: string;

  /**
   * RECOMMENDED: arrival date of departure flight
   * use YYYYMMDD, YYYY-MM-DD, YYYY-MM-DDThh:mmTZD or YYYY-MM-DDThh:mm:ssTZD
   */
  departing_arrival_date?: string;

  /** 
   * RECOMMENDED: arrival date of return flight
   * use YYYYMMDD, YYYY-MM-DD, YYYY-MM-DDThh:mmTZD or YYYY-MM-DDThh:mm:ssTZD
   */
  returning_arrival_date?: string;

  /* RECOMMENDED: number of adults on flight */
  num_adults?: number;

  /* RECOMMENDED: number of children on flight */
  num_children?: number;

  /* RECOMMENDED: number of infants */
  num_infants?: number;

  /** 
   * RECOMMENDED: travel class
   * must be 'economy', 'premium', 'business' or 'first'
   */
  travel_class?: 'economy' | 'premium' | 'business' | 'first';

  /**
   * RECOMMENDED: price for the flight
   * Use lowest price if you show multiple options on this page
   * Should not include cost of extras, such as seat selection, extra luggage
   */
  price?: number;

   /**
   * RECOMMENDED: preferred number of stops for the flight
   */
  preferred_num_stops?: number;
}

export type PixelEventName = 'AddPaymentInfo' |
'AddToCart' |
'AddToWishlist' |
'CompleteRegistration' |
'Contact' |
'CustomizeProduct' |
'Donate' |
'FindLocation' |
'InitiateCheckout' |
'Lead' |
'PageView' |
'Purchase' |
'Schedule' |
'Search' |
'StartTrial' |
'SubmitApplication' |
'Subscribe' |
'ViewContent';
