# lua-ti
lua-ti (Lua Type Inspector) is a TypeScript-based program designed to streamline the development, analysis, and maintenance of Lua scripts used in [ProjectIgnis/CardScripts](https://github.com/ProjectIgnis/CardScripts). 
This tool aims to simplify card script development, enforce code style, and ensure script quality through automated checks.

## Features
- **Type Checking**: Verify Lua script syntax and types to prevent runtime errors.
- **Code Style Enforcement**: Ensure adherence to a standardized code style for consistency.
- **Code Smell Detection**: Identify potential issues to improve script quality.
- **Documentation Generation**: Facilitate easier documentation of cards and their effects.
- **Refactoring Assistance**: Enhance efforts in restructuring and improving code maintainability.
- **Maintainability & Readability**: Ensure scripts are maintainable and readable for contributors.

## Usage
To use lua-ti, follow these steps:

- **Installation**: Clone the repository and install dependencies.
  - **Clone Repository**: `git clone git@github.com:feeshstick/lua-ti.git`
  - **Enter Directory** `cd lua-ti`
  - **Run** `npm install`
  - **Assets**: Some features require additional repositories
    - **Create Directory**: `mkdir assets`
    - **Enter Directory**: `cd assets`
    - **Clone Repositories**: 
      - [ProjectIgnis/CardScripts](https://github.com/ProjectIgnis/CardScripts) `git clone git@github.com:ProjectIgnis/CardScripts.git`
      - [edo9300/ygopro-core](https://github.com/edo9300/ygopro-core) `git clone git@github.com:edo9300/ygopro-core.git`
- _wip_ **Configuration**: Modify the configuration file to suit project-specific settings.
- _wip_ **Integration**: Integrate lua-ti into your CI/CD pipeline for automated checks on commits.

## Future Plans

- **Language Service Integration**: Creating VSCode plugins for better code completion and real-time semantic analysis.
- **Control Flow Analysis**: Identifying unreachable code and enhancing code efficiency.
- **Proofreading**: Ensuring scripts are error-free and enhancing language correctness.
- **Database Interface**: Accessing and potentially editing the database during development with VSCode plugin support.

## Contribution
- **Create an Issue**: Before making changes, create a detailed Issue outlining the improvement, bug fix, or feature addition. Describe it thoroughly to facilitate discussion and prevent duplicated efforts.
- **Create a Branch**: Once the Issue is approved or assigned, create a new branch from the main repository. Name the branch in a way that reflects the Issue or the feature/bug you're addressing.
- **Commit Changes**: Make your changes within this branch. Ensure commits are clear and concise, with descriptive commit messages that explain the modifications made.
- **Create a Merge Request (Pull Request)**: After implementing changes, create a merge request to merge your branch into the main codebase. Reference the related Issue in the merge request to streamline the review process.
- **Code Review & Discussion**: Expect feedback and engage in discussions about the proposed changes. Be ready to make necessary adjustments based on feedback received during the review process.
- **Merge and Close**: Once the changes pass the review and all discussions are addressed, the branch will be merged into the main repository. The related Issue will be closed upon successful merge.

## Acknowledgements
Special thanks to the contributors and the [Project Ignis](https://github.com/ProjectIgnis) community for their support and feedback.

---

[Project Test Suite](https://github.com/feeshstick/lua-ti/tree/main/test)