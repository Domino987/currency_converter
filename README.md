# Currency Converter App by Domino987

Author: **[@Domino987](https://github.com/Domino987)**\
**[Demo](https://currency-converter-wine.vercel.app/)**\

## Description

For this project, I wanted to test a few new technologies (aka which I have not used) with my existing tools to see if they work together.

### New Technologies:

- [Vite](https://vitejs.dev/) instead of CRA
- [i18next](https://www.i18next.com/) for internalization
- [react-charts](https://react-charts.tanstack.com/)
- [recoil](https://recoiljs.org/)

in combination with

- [react-query](https://react-query.tanstack.com/)
- [mui v5](https://mui.com/)
- [date-fns](https://github.com/date-fns/date-fns)
- [msw](https://mswjs.io/)

---

## Get Started

To run:

1. Clone repository

```bash
git clone https://github.com/Domino987/currency_converter.git
```

2. Run project

```bash
cd ~path-to/currency-converter
yarn dev
```

## Features

- Enter a value and select currencies to convert them to
- Swap the two inputs with a button
- Recent conversions are listed in the history table for quick access
- A chart shows the value history of the selected currencies vs us dollar
- Error alert
  if the api is not accessible
- Supported toggles: dark mode, languages, link to github
- Dev mode to hit a local service worker of msw to return custom values for testing or in case the free api is off
