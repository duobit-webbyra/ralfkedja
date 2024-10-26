export default function assetPrefix(path: string) {
  if (process.env.NODE_ENV === 'development') {
    return path;
  }
  return process.env.ASSET_PREFIX + path;
}
