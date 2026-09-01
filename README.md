# Conduit QE Automation

A Playwright TypeScript project covering key API and UI workflows in Conduit application.

The project focuses on building a practical automation flow from test design and framework structure through to CI execution.

## Test Coverage

**API**
- Login
- Create article
- Update article
- Delete article

**UI**
- Login
- Article lifecycle: Create → Edit → Delete

Current coverage focuses on the main workflows and will be expanded as the project develops.

## Framework

- **API layer** – reusable API clients for authentication and article operations
- **Page Objects** – UI locators and page actions
- **Fixtures** – shared page objects and authenticated API request context
- **Test Data** – unique data generation to support independent and parallel tests
- **Types** – API request and response models

## Authentication

- **API tests** – login via API and reuse an authenticated `APIRequestContext`
- **UI tests** – login via API during setup and save browser authentication with Playwright `storageState`
- **UI login test** – runs without saved authentication so the actual login flow is tested

## CI

Tests run through GitHub Actions:

- **Pull Request →** smoke tests
- **Merge/push to `main` →** full regression
- **Manual trigger →** full regression
- **GitHub Secrets →** test credentials
- **GitHub Variables →** environment configuration
- **Artifacts →** Playwright report and failure evidence

## Project Status

This project is still in progress, with more test coverage and CI features to be added...