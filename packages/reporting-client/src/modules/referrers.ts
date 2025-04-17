/**
 * Referrers API Module
 * Provides access to reports about Websites, Search engines, Keywords, and Campaigns
 * used to access your website.
 */

import { CoreReportingClient } from './core.js';

export class ReferrersModule {
  /**
   * @param core Core reporting client instance
   */
  constructor(private core: CoreReportingClient) {}

  /**
   * Get referrers overview data
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   * @param columns Columns to include in the response
   */
  async get(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string,
    columns: string = ''
  ): Promise<any> {
    return this.core.request<any>('Referrers.get', {
      idSite,
      period,
      date,
      segment,
      columns,
    });
  }

  /**
   * Get referrer type
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   * @param typeReferrer Type of referrer
   * @param idSubtable Subtable ID
   * @param expanded Whether to include expanded data
   */
  async getReferrerType(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string,
    typeReferrer: string = '',
    idSubtable?: number | string,
    expanded?: boolean
  ): Promise<any> {
    return this.core.request<any>('Referrers.getReferrerType', {
      idSite,
      period,
      date,
      segment,
      typeReferrer,
      idSubtable,
      expanded,
    });
  }

  /**
   * Get all referrers data
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   */
  async getAll(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string
  ): Promise<any> {
    return this.core.request<any>('Referrers.getAll', {
      idSite,
      period,
      date,
      segment,
    });
  }

  /**
   * Get keywords
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   * @param expanded Whether to include expanded data
   * @param flat Whether to flatten nested data
   */
  async getKeywords(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string,
    expanded?: boolean,
    flat?: boolean
  ): Promise<any> {
    return this.core.request<any>('Referrers.getKeywords', {
      idSite,
      period,
      date,
      segment,
      expanded,
      flat,
    });
  }

  /**
   * Get search engines from keyword ID
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param idSubtable Subtable ID
   * @param segment Segment to apply
   */
  async getSearchEnginesFromKeywordId(
    idSite: number | string,
    period: string,
    date: string,
    idSubtable: number | string,
    segment?: string
  ): Promise<any> {
    return this.core.request<any>('Referrers.getSearchEnginesFromKeywordId', {
      idSite,
      period,
      date,
      idSubtable,
      segment,
    });
  }

  /**
   * Get search engines
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   * @param expanded Whether to include expanded data
   * @param flat Whether to flatten nested data
   */
  async getSearchEngines(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string,
    expanded?: boolean,
    flat?: boolean
  ): Promise<any> {
    return this.core.request<any>('Referrers.getSearchEngines', {
      idSite,
      period,
      date,
      segment,
      expanded,
      flat,
    });
  }

  /**
   * Get keywords from search engine ID
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param idSubtable Subtable ID
   * @param segment Segment to apply
   */
  async getKeywordsFromSearchEngineId(
    idSite: number | string,
    period: string,
    date: string,
    idSubtable: number | string,
    segment?: string
  ): Promise<any> {
    return this.core.request<any>('Referrers.getKeywordsFromSearchEngineId', {
      idSite,
      period,
      date,
      idSubtable,
      segment,
    });
  }

  /**
   * Get campaigns
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   * @param expanded Whether to include expanded data
   */
  async getCampaigns(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string,
    expanded?: boolean
  ): Promise<any> {
    return this.core.request<any>('Referrers.getCampaigns', {
      idSite,
      period,
      date,
      segment,
      expanded,
    });
  }

  /**
   * Get keywords from campaign ID
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param idSubtable Subtable ID
   * @param segment Segment to apply
   */
  async getKeywordsFromCampaignId(
    idSite: number | string,
    period: string,
    date: string,
    idSubtable: number | string,
    segment?: string
  ): Promise<any> {
    return this.core.request<any>('Referrers.getKeywordsFromCampaignId', {
      idSite,
      period,
      date,
      idSubtable,
      segment,
    });
  }

  /**
   * Get websites
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   * @param expanded Whether to include expanded data
   * @param flat Whether to flatten nested data
   */
  async getWebsites(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string,
    expanded?: boolean,
    flat?: boolean
  ): Promise<any> {
    return this.core.request<any>('Referrers.getWebsites', {
      idSite,
      period,
      date,
      segment,
      expanded,
      flat,
    });
  }

  /**
   * Get URLs from website ID
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param idSubtable Subtable ID
   * @param segment Segment to apply
   */
  async getUrlsFromWebsiteId(
    idSite: number | string,
    period: string,
    date: string,
    idSubtable: number | string,
    segment?: string
  ): Promise<any> {
    return this.core.request<any>('Referrers.getUrlsFromWebsiteId', {
      idSite,
      period,
      date,
      idSubtable,
      segment,
    });
  }

  /**
   * Get socials
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   * @param expanded Whether to include expanded data
   * @param flat Whether to flatten nested data
   */
  async getSocials(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string,
    expanded?: boolean,
    flat?: boolean
  ): Promise<any> {
    return this.core.request<any>('Referrers.getSocials', {
      idSite,
      period,
      date,
      segment,
      expanded,
      flat,
    });
  }

  /**
   * Get URLs for social
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   * @param idSubtable Subtable ID
   */
  async getUrlsForSocial(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string,
    idSubtable?: number | string
  ): Promise<any> {
    return this.core.request<any>('Referrers.getUrlsForSocial', {
      idSite,
      period,
      date,
      segment,
      idSubtable,
    });
  }

  /**
   * Get number of distinct search engines
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   */
  async getNumberOfDistinctSearchEngines(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string
  ): Promise<any> {
    return this.core.request<any>('Referrers.getNumberOfDistinctSearchEngines', {
      idSite,
      period,
      date,
      segment,
    });
  }

  /**
   * Get number of distinct social networks
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   */
  async getNumberOfDistinctSocialNetworks(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string
  ): Promise<any> {
    return this.core.request<any>('Referrers.getNumberOfDistinctSocialNetworks', {
      idSite,
      period,
      date,
      segment,
    });
  }

  /**
   * Get number of distinct keywords
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   */
  async getNumberOfDistinctKeywords(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string
  ): Promise<any> {
    return this.core.request<any>('Referrers.getNumberOfDistinctKeywords', {
      idSite,
      period,
      date,
      segment,
    });
  }

  /**
   * Get number of distinct campaigns
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   */
  async getNumberOfDistinctCampaigns(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string
  ): Promise<any> {
    return this.core.request<any>('Referrers.getNumberOfDistinctCampaigns', {
      idSite,
      period,
      date,
      segment,
    });
  }

  /**
   * Get number of distinct websites
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   */
  async getNumberOfDistinctWebsites(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string
  ): Promise<any> {
    return this.core.request<any>('Referrers.getNumberOfDistinctWebsites', {
      idSite,
      period,
      date,
      segment,
    });
  }

  /**
   * Get number of distinct website URLs
   * 
   * @param idSite The ID of the site
   * @param period The period to analyze
   * @param date The date to analyze
   * @param segment Segment to apply
   */
  async getNumberOfDistinctWebsitesUrls(
    idSite: number | string,
    period: string,
    date: string,
    segment?: string
  ): Promise<any> {
    return this.core.request<any>('Referrers.getNumberOfDistinctWebsitesUrls', {
      idSite,
      period,
      date,
      segment,
    });
  }
}