import { Dictionary, DownloadingItem } from '@/models';

const syncTime = {} as Dictionary<number>;

export async function dataLoadAction<T, TAdditional>(
  syncKey: string,
  key: string,
  additionalData: TAdditional,
  commit: (key: string, response: DownloadingItem<T> & TAdditional) => void,
  dataPromise: Promise<{ data: T }>,
  defaultData: T = undefined,
  freezeData = true
): Promise<void> {
  const time = performance.now();
  syncTime[syncKey] = time;

  commit(
    key,
    Object.freeze({
      loading: true,
      failed: false,
      ...additionalData,
      data: defaultData,
      updatedOn: new Date(),
      unauthorized: false,
      notFound: false,
    })
  );

  let failed: boolean | string = false;
  let status = 0;
  let data: T;
  debugger;

  await dataPromise
    .then(res => {
      data = res.data;
    })
    .catch(err => {
      failed = err.response?.data || err.message;
      status = err.response?.status;
    });

  if (time !== syncTime[syncKey]) return;

  const response = {
    loading: false,
    failed,
    ...additionalData,
    data: freezeData ? Object.freeze(data) : data,
    updatedOn: new Date(),
    unauthorized: status === 401,
    notFound: status === 404,
  };

  commit(key, freezeData ? Object.freeze(response) : response);
}
