package com.example.supportdesk.dto;

import java.util.List;

public class ApiDocumentationResponse {

    private String application;
    private String version;
    private String baseUrl;
    private List<ApiEndpointResponse> endpoints;

    public ApiDocumentationResponse(String application, String version, String baseUrl, List<ApiEndpointResponse> endpoints) {
        this.application = application;
        this.version = version;
        this.baseUrl = baseUrl;
        this.endpoints = endpoints;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public List<ApiEndpointResponse> getEndpoints() {
        return endpoints;
    }

    public void setEndpoints(List<ApiEndpointResponse> endpoints) {
        this.endpoints = endpoints;
    }
}