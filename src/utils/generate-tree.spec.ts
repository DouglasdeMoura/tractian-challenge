import { describe, it, expect } from 'vitest'
import { generateTree } from './generate-tree'
import locations from '../mocks/json/locations.json'
import assets from '../mocks/json/assets.json'

const response = [
  {
    "id": "656733611f4664001f295dd0",
    "label": "Empty Machine house",
    "children": []
  },
  {
    "id": "656733b1664c41001e91d9ed",
    "label": "Machinery house",
    "children": [
      {
        "id": "656734448eb037001e474a62",
        "label": "Fan H12D",
        "children": []
      },
      {
        "id": "656734968eb037001e474d5a",
        "label": "Motors H12D",
        "children": [
          {
            "id": "6567340c1f4664001f29622e",
            "label": "Motor H12D- Stage 1",
            "children": []
          },
          {
            "id": "6567340c664c41001e91dceb",
            "label": "Motor H12D-Stage 2",
            "children": []
          },
          {
            "id": "656733921f4664001f295e9b",
            "label": "Motor H12D-Stage 3",
            "children": []
          }
        ]
      }
    ]
  },
  {
    "id": "65674204664c41001e91ecb4",
    "label": "PRODUCTION AREA - RAW MATERIAL",
    "children": [
      {
        "id": "656a07b3f2d4a1001e2144bf",
        "label": "CHARCOAL STORAGE SECTOR",
        "children": [
          {
            "id": "656a07bbf2d4a1001e2144c2",
            "label": "CONVEYOR BELT ASSEMBLY",
            "children": [
              {
                "id": "656a07c3f2d4a1001e2144c5",
                "label": "MOTOR TC01 COAL UNLOADING AF02",
                "children": [
                  {
                    "id": "656a07cdc50ec9001e84167b",
                    "label": "MOTOR RT COAL AF01",
                    "children": []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "656734821f4664001f296973",
    "label": "Fan - External",
    "children": []
  }
]

describe('generateTree', () => {
  it('should generate an empty tree if locations and assets are empty', () => {
    expect(generateTree([])).toEqual([])
  })

  it.only('should generate a tree of locations', () => {
    const items = [
      ...locations['662fd0ee639069143a8fc387'],
      ...assets['662fd0ee639069143a8fc387']
        .map(asset =>
          asset.parentId ?
            asset : asset.locationId
              ? { ...asset, parentId: asset.locationId } : asset)
    ]

    expect(generateTree(items)).toEqual(response)
  })
})
