# Infinite Scroll App

## Overview

This is an Infinite Scroll application built with React, TypeScript, and Vite. It uses the Flickr API to fetch images and allows users to favorite images for storage in local storage. The project draws inspiration from design files for a small application.

## Features

- **Infinite Scroll**: Load and display images from Flickr as the user scrolls down.
- **Image Favoriting**: Users can favorite images, and these favorites are stored in local storage.
- **Modern Tech Stack**: Built using React, TypeScript, and Vite for a fast and efficient development experience.

## Getting Started

### Prerequisites


### Installation

Clone the Repository

   git clone git@github.com:G-Innes/infinite-scroll.git
   cd infinite-scroll

Install Dependencies

   npm install

Use the .env.example to enter your flickr API key and secret

Development

To start the development server and preview the application, run:
npm run dev

This will start the Vite development server and open the app in your default browser.
Building

To build the project for production, use:

npm run build

This command will compile TypeScript files and bundle the project using Vite.
Preview

To preview the built project locally, use:

npm run preview

Testing

To run the tests, use:

bash

npm test

This command runs Vitest to execute your unit tests.
Testing Details

    Unit Tests: Written using Vitest, a fast test runner for Vite projects.
    Test Files: Located alongside the components they test, with the .test.tsx suffix.

Configuration
TypeScript

The project uses TypeScript for type safety. TypeScript configuration is managed in tsconfig.json.
Vite

Vite is used for fast development and bundling. Vite configuration can be found in the vite.config.ts file.
Vitest

Vitest is used for testing. Configuration for Vitest is in the vitest.config.ts file.
Dependencies

    React: ^18.3.1
    React DOM: ^18.3.1
    Vite: ^5.3.4
    Vitest: ^2.0.5
    TypeScript: ^5.5.4
    Prettier: ^3.3.3
    ESLint: ^8.57.0
    @testing-library/react: ^16.0.0
    @testing-library/jest-dom: ^6.4.8