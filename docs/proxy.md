# Proxy Feature Documentation

## Overview

This document describes the implementation and deployment of a simple HTTPS proxy server designed to forward requests to the Star Wars API and return the responses. This proxy is intended for deployment to Azure Functions.

## Deployment to Azure Functions

1. **Prepare the Function**: Ensure your function is ready for deployment by packaging the [`proxy.ts`] and the server code into a single Azure Function project.
2. **Configuration**: Use environment variables to configure the Azure Function, including the port number and any API endpoints.
3. **Deploy**: Use the Azure Functions CLI or the Azure portal to deploy your function.

## Usage

To use the proxy, make a request to the deployed Azure Function's URL with the desired Star Wars API endpoint appended to the path. For example:
