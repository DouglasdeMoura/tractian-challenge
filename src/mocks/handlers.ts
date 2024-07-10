import { http, HttpResponse } from 'msw'
import companies from './json/companies.json'
import locations from './json/locations.json'
import assets from './json/assets.json'

export const handlers = [
  http.get('*/companies', () => {
    return HttpResponse.json(companies)
  }),
  http.get('*/companies/:companyId/locations', ({ params }) => {
    // @ts-expect-error - we don't need to implement all endpoints
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const location = locations[params.companyId]

    if (!location) {
      return new HttpResponse('Not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(location)
  }),
  http.get('*/companies/:companyId/assets', ({ params }) => {
    // @ts-expect-error - we don't need to implement all endpoints
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const asset = assets[params.companyId]

    if (!asset) {
      return new HttpResponse('Not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return HttpResponse.json(asset)
  })
]
