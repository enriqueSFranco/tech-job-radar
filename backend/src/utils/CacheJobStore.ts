interface CachedEntry<T> {
  value: T;
  expiresAt: number;
}

export class CacheJobStore<T> {
  private store = new Map<string, CachedEntry<T>>();
  private ttlMs: number;

  constructor(ttlMinutes = 10) {
    this.ttlMs = ttlMinutes * 60 * 1000;
  }

  public isExpired(entry: CachedEntry<T>) {
    return Date.now() > entry.expiresAt;
  }

  public get(key: string) {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (this.isExpired(entry)) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  public set(key: string, value: T) {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + this.ttlMs,
    });
  }

  public has(key: string, value: T) {
    const entry = this.store.get(key)
    return !!entry && this.isExpired(entry)
  }

  public delete(key: string, value: T) {
    this.store.clear();
  }
}
// const jobCache = new CacheJobStore<Job[]>(10);
// getjobs
    // const cacheKey = `${keyword.toLowerCase()}::${location.toLowerCase()}`;

    // if (jobCache.has(cacheKey)) {
    //   const cachedJobs = jobCache.get(cacheKey)!;
    //   return paginate(cachedJobs, page, resultPerPage);
    // }

// function paginate(data: Job[], page: number, perPage: number) {
//   const total = data.length;
//   const totalPages = Math.ceil(total / perPage);
//   const start = (page - 1) * perPage;
//   const end = start + perPage;
//   const paginated = data.slice(start, end);

//   return { paginated, total, totalPages };
// }
