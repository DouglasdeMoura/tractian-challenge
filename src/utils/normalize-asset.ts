import { AssetItem } from "../routes/companies.$id";

export const normalizeAsset = (assets: AssetItem[]) => {
  return assets.map(asset => {
    const type = asset.sensorType ? "component" : "asset"

    if (asset.parentId) {
      return { ...asset, type }
    }

    if (asset.locationId) {
      return { ...asset, parentId: asset.locationId, type }
    }

    return { ...asset, type }
  })
}
