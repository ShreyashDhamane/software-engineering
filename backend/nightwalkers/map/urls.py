from django.urls import path
from .views import (
    RouteViewAPI,
    SaveRouteAPIView,
    UpdateSavedRouteAPIView,
    DeleteSavedRouteAPIView,
    RetrieveSavedRoutesListAPIView,
    HeatmapDataView,
    PrimaryHeatmapDataView,
    SecondaryHeatmapDataView,
    IssueOnLocationReportListView,
    CreateIssueOnLocationReportView,
    DeleteIssueOnLocationReportView,
    process_approved_report,
    revoke_report_approval,
)

urlpatterns = [
    path("map/heatmap-data/", HeatmapDataView.as_view(), name="heatmap-data"),
    path(
        "map/heatmap-data/primary/",
        PrimaryHeatmapDataView.as_view(),
        name="primary-heatmap",
    ),
    path(
        "map/heatmap-data/secondary/",
        SecondaryHeatmapDataView.as_view(),
        name="secondary-heatmap",
    ),
    path("get-route/", RouteViewAPI.as_view(), name="get-route"),
    path("save-route/", SaveRouteAPIView.as_view(), name="save-route"),
    path(
        "delete-route/<int:pk>/", DeleteSavedRouteAPIView.as_view(), name="delete-route"
    ),
    path(
        "retrieve-routes/",
        RetrieveSavedRoutesListAPIView.as_view(),
        name="retrieve-routes",
    ),
    path("update-route/", UpdateSavedRouteAPIView.as_view(), name="update-route"),
    path(
        "user/safety-report-list/",
        IssueOnLocationReportListView.as_view(),
        name="safety-report-list",
    ),
    path(
        "user/create-safety-report/",
        CreateIssueOnLocationReportView.as_view(),
        name="create-safety-report",
    ),
    path(
        "delete-safety-report/<int:pk>/",
        DeleteIssueOnLocationReportView.as_view(),
        name="delete-safety-report",
    ),
    path(
        "process-approved-report/",
        process_approved_report,
        name="process-approved-report",
    ),
    path(
        "revoke-report-approval/", revoke_report_approval, name="revoke-report-approval"
    ),
]
