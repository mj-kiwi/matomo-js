// filepath: /Users/mingjian.liang/MyProjects/matomo-js/packages/reporting-client/tests/custom-reports.spec.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CustomReportsModule } from "../../src/index";

describe("CustomReportsModule", () => {
  let mockClient: any;
  let module: CustomReportsModule;

  beforeEach(() => {
    mockClient = {
      request: vi.fn().mockResolvedValue({}),
    };
    module = new CustomReportsModule(mockClient);
  });

  it("should add a custom report with required parameters", async () => {
    await module.addCustomReport({
      idSite: 1,
      name: "Test Report",
      reportType: "table",
      metricIds: ["nb_visits"],
    });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.addCustomReport",
      {
        idSite: 1,
        name: "Test Report",
        reportType: "table",
        metricIds: ["nb_visits"],
      }
    );
  });

  it("should add a custom report with all parameters", async () => {
    await module.addCustomReport({
      idSite: 1,
      name: "Test Report",
      reportType: "table",
      metricIds: ["nb_visits"],
      categoryId: "General_Visitors",
      dimensionIds: ["country"],
      subcategoryId: "General_Overview",
      description: "Test Description",
      segmentFilter: "country==FR",
      multipleIdSites: [1, 2],
    });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.addCustomReport",
      {
        idSite: 1,
        name: "Test Report",
        reportType: "table",
        metricIds: ["nb_visits"],
        categoryId: "General_Visitors",
        dimensionIds: ["country"],
        subcategoryId: "General_Overview",
        description: "Test Description",
        segmentFilter: "country==FR",
        multipleIdSites: [1, 2],
      }
    );
  });

  it("should update a custom report with required parameters", async () => {
    await module.updateCustomReport({
      idSite: 1,
      idCustomReport: 2,
      name: "Updated Report",
      reportType: "table",
      metricIds: ["nb_visits"],
    });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.updateCustomReport",
      {
        idSite: 1,
        idCustomReport: 2,
        name: "Updated Report",
        reportType: "table",
        metricIds: ["nb_visits"],
      }
    );
  });

  it("should update a custom report with all parameters", async () => {
    await module.updateCustomReport({
      idSite: 1,
      idCustomReport: 2,
      name: "Updated Report",
      reportType: "table",
      metricIds: ["nb_visits"],
      categoryId: "General_Visitors",
      dimensionIds: ["country"],
      subcategoryId: "General_Overview",
      description: "Updated Description",
      segmentFilter: "country==FR",
      subCategoryReportIds: ["sub1", "sub2"],
      multipleIdSites: [1, 2],
    });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.updateCustomReport",
      {
        idSite: 1,
        idCustomReport: 2,
        name: "Updated Report",
        reportType: "table",
        metricIds: ["nb_visits"],
        categoryId: "General_Visitors",
        dimensionIds: ["country"],
        subcategoryId: "General_Overview",
        description: "Updated Description",
        segmentFilter: "country==FR",
        subCategoryReportIds: ["sub1", "sub2"],
        multipleIdSites: [1, 2],
      }
    );
  });

  it("should get configured reports", async () => {
    await module.getConfiguredReports({ idSite: 1 });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.getConfiguredReports",
      {
        idSite: 1,
      }
    );
  });

  it("should get configured reports with skip category metadata", async () => {
    await module.getConfiguredReports({
      idSite: 1,
      skipCategoryMetadata: true,
    });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.getConfiguredReports",
      {
        idSite: 1,
        skipCategoryMetadata: true,
      }
    );
  });

  it("should get a configured report", async () => {
    await module.getConfiguredReport({ idSite: 1, idCustomReport: 2 });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.getConfiguredReport",
      {
        idSite: 1,
        idCustomReport: 2,
      }
    );
  });

  it("should delete a custom report", async () => {
    await module.deleteCustomReport({ idSite: 1, idCustomReport: 2 });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.deleteCustomReport",
      {
        idSite: 1,
        idCustomReport: 2,
      }
    );
  });

  it("should pause a custom report", async () => {
    await module.pauseCustomReport({ idSite: 1, idCustomReport: 2 });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.pauseCustomReport",
      {
        idSite: 1,
        idCustomReport: 2,
      }
    );
  });

  it("should resume a custom report", async () => {
    await module.resumeCustomReport({ idSite: 1, idCustomReport: 2 });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.resumeCustomReport",
      {
        idSite: 1,
        idCustomReport: 2,
      }
    );
  });

  it("should get available categories", async () => {
    await module.getAvailableCategories({ idSite: 1 });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.getAvailableCategories",
      {
        idSite: 1,
      }
    );
  });

  it("should get available report types", async () => {
    await module.getAvailableReportTypes();

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.getAvailableReportTypes",
      {}
    );
  });

  it("should get available dimensions", async () => {
    await module.getAvailableDimensions({ idSite: 1 });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.getAvailableDimensions",
      {
        idSite: 1,
      }
    );
  });

  it("should get available metrics", async () => {
    await module.getAvailableMetrics({ idSite: 1 });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.getAvailableMetrics",
      {
        idSite: 1,
      }
    );
  });

  it("should get a custom report with required parameters", async () => {
    await module.getCustomReport({
      idSite: 1,
      period: "day",
      date: "yesterday",
      idCustomReport: 2,
    });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.getCustomReport",
      {
        idSite: 1,
        period: "day",
        date: "yesterday",
        idCustomReport: 2,
      }
    );
  });

  it("should get a custom report with all parameters", async () => {
    await module.getCustomReport({
      idSite: 1,
      period: "day",
      date: "yesterday",
      idCustomReport: 2,
      segment: "country==FR",
      expanded: 1,
      flat: 1,
      idSubtable: 3,
      columns: "nb_visits,nb_actions",
    });

    expect(mockClient.request).toHaveBeenCalledWith(
      "CustomReports.getCustomReport",
      {
        idSite: 1,
        period: "day",
        date: "yesterday",
        idCustomReport: 2,
        segment: "country==FR",
        expanded: 1,
        flat: 1,
        idSubtable: 3,
        columns: "nb_visits,nb_actions",
      }
    );
  });
});
