export class DownloadingItem<T> {
  constructor(
    public readonly data: T,
    public readonly failed: boolean | string = false,
    public readonly loading = false,
    public readonly updatedOn = new Date(),
    public readonly unauthorized = false,
    public readonly notFound = false
  ) {}
}

export function extendDownloadingItem<T, TAdditional>(
  item?: DownloadingItem<T> | T,
  additionalData?: TAdditional
): DownloadingItem<T> & TAdditional {
  if (!item || !(item instanceof DownloadingItem)) {
    item = new DownloadingItem<T>(item as T);
  }

  Object.assign(item, additionalData);
  return item as DownloadingItem<T> & TAdditional;
}
