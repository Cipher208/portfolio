# Security

This is a personal portfolio site: static pages, no backend, no user data.

## Reporting a vulnerability

If you find a security issue, please open a
[private vulnerability report](https://github.com/Cipher208/portfolio/security/advisories/new)
on GitHub. I will answer within a few days.

## Scope

- The site ships no telemetry, no analytics and no third-party scripts beyond
  Google Fonts.
- Dependencies are kept minimal (React, React Router, Vite) and checked with
  `npm audit` in CI on every push and pull request.
