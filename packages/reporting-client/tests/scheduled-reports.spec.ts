import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScheduledReportsModule } from '../src/modules/scheduled-reports.js';
import { CoreReportingClient } from '../src/modules/core.js';

// Mock CoreReportingClient
vi.mock('../src/modules/core.js', () => {
  return {
    CoreReportingClient: vi.fn().mockImplementation(() => ({
      request: vi.fn(),
    })),
  };
});

describe('ScheduledReportsModule', () => {
  let scheduledReportsModule: ScheduledReportsModule;
  let mockClient: { request: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Create a mock client and module instance
    const clientInstance = new CoreReportingClient({
      url: 'https://example.org/matomo',
    });
    mockClient = clientInstance as unknown as {
      request: ReturnType<typeof vi.fn>;
    };
    scheduledReportsModule = new ScheduledReportsModule(clientInstance);
  });

  describe('addReport', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = { success: true, id: 1 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const reports = ['Actions.getPageUrls', 'Actions.getDownloads'];
      const parameters = { displayFormat: 'tables_only' };

      const result = await scheduledReportsModule.addReport(
        1,
        'Weekly Overview',
        'week',
        8,
        'email',
        'pdf',
        reports,
        parameters
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'ScheduledReports.addReport',
        {
          idSite: 1,
          description: 'Weekly Overview',
          period: 'week',
          hour: 8,
          reportType: 'email',
          reportFormat: 'pdf',
          reports: JSON.stringify(reports),
          parameters: JSON.stringify(parameters),
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with all optional parameters', async () => {
      const mockResponse = { success: true, id: 2 };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const reports = ['Actions.getPageTitles'];
      const parameters = { displayFormat: 'graphs_only' };

      const result = await scheduledReportsModule.addReport(
        1,
        'Monthly Report',
        'month',
        9,
        'email',
        'pdf',
        reports,
        parameters,
        '1',
        'each',
        '3',
        'range'
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'ScheduledReports.addReport',
        {
          idSite: 1,
          description: 'Monthly Report',
          period: 'month',
          hour: 9,
          reportType: 'email',
          reportFormat: 'pdf',
          reports: JSON.stringify(reports),
          parameters: JSON.stringify(parameters),
          idSegment: '1',
          evolutionPeriodFor: 'each',
          evolutionPeriodN: '3',
          periodParam: 'range',
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateReport', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const reports = ['Referrers.getWebsites'];
      const parameters = { displayFormat: 'tables_and_graphs' };

      const result = await scheduledReportsModule.updateReport(
        1,
        2,
        'Updated Report',
        'day',
        10,
        'email',
        'html',
        reports,
        parameters
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'ScheduledReports.updateReport',
        {
          idReport: 1,
          idSite: 2,
          description: 'Updated Report',
          period: 'day',
          hour: 10,
          reportType: 'email',
          reportFormat: 'html',
          reports: JSON.stringify(reports),
          parameters: JSON.stringify(parameters),
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with all optional parameters', async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const reports = ['VisitsSummary.get'];
      const parameters = { displayFormat: 'graphs_only' };

      const result = await scheduledReportsModule.updateReport(
        2,
        1,
        'Updated Weekly Report',
        'week',
        11,
        'email',
        'csv',
        reports,
        parameters,
        '2',
        'all',
        '4',
        'day'
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'ScheduledReports.updateReport',
        {
          idReport: 2,
          idSite: 1,
          description: 'Updated Weekly Report',
          period: 'week',
          hour: 11,
          reportType: 'email',
          reportFormat: 'csv',
          reports: JSON.stringify(reports),
          parameters: JSON.stringify(parameters),
          idSegment: '2',
          evolutionPeriodFor: 'all',
          evolutionPeriodN: '4',
          periodParam: 'day',
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteReport', () => {
    it('should call the API with the report ID', async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await scheduledReportsModule.deleteReport(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        'ScheduledReports.deleteReport',
        { idReport: 1 }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getReports', () => {
    it('should call the API with no parameters', async () => {
      const mockResponse = [
        {
          idreport: 1,
          description: 'Weekly Overview',
          period: 'week',
        },
        {
          idreport: 2,
          description: 'Monthly Report',
          period: 'month',
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await scheduledReportsModule.getReports();

      expect(mockClient.request).toHaveBeenCalledWith(
        'ScheduledReports.getReports',
        {}
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with all parameters', async () => {
      const mockResponse = [
        {
          idreport: 1,
          description: 'Weekly Overview',
          period: 'week',
        },
      ];
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await scheduledReportsModule.getReports(
        1,
        'week',
        1,
        true,
        '1'
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'ScheduledReports.getReports',
        {
          idSite: 1,
          period: 'week',
          idReport: 1,
          ifSuperUserReturnOnlySuperUserReports: true,
          idSegment: '1',
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('generateReport', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = { contents: 'base64_encoded_report_content' };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await scheduledReportsModule.generateReport(
        1,
        '2023-01-01'
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'ScheduledReports.generateReport',
        {
          idReport: 1,
          date: '2023-01-01',
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with all parameters', async () => {
      const mockResponse = { contents: 'base64_encoded_report_content' };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const parameters = { displayFormat: 'graphs_only' };

      const result = await scheduledReportsModule.generateReport(
        2,
        '2023-02-01',
        'en',
        'download',
        'week',
        'pdf',
        parameters
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'ScheduledReports.generateReport',
        {
          idReport: 2,
          date: '2023-02-01',
          language: 'en',
          outputType: 'download',
          period: 'week',
          reportFormat: 'pdf',
          parameters: JSON.stringify(parameters),
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('sendReport', () => {
    it('should call the API with required parameters', async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await scheduledReportsModule.sendReport(1);

      expect(mockClient.request).toHaveBeenCalledWith(
        'ScheduledReports.sendReport',
        { idReport: 1 }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should call the API with all parameters', async () => {
      const mockResponse = { success: true };
      mockClient.request.mockResolvedValueOnce(mockResponse);

      const result = await scheduledReportsModule.sendReport(
        2,
        'week',
        '2023-01-01',
        true
      );

      expect(mockClient.request).toHaveBeenCalledWith(
        'ScheduledReports.sendReport',
        {
          idReport: 2,
          period: 'week',
          date: '2023-01-01',
          force: true,
        }
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
