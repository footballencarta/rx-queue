import DelayQueue from './delay-queue'

interface ExecutionUnit<T = any> {
  fn:       () => T,
  resolve:  (value?: T | PromiseLike<T>) => void,
  reject:   (reason?: any) => void,
}

export class DelayQueueExector extends DelayQueue {
  constructor(
    period: number,
  ) {
    super(period)

    this.subscribe(unit => {
      try {
        const ret = unit.fn()
        return unit.resolve(ret)
      } catch (e) {
        return unit.reject(e)
      }
    })
  }

  public async execute<T = any>(fn: () => T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const unit: ExecutionUnit<T> = {
        fn,
        resolve,
        reject,
      }
      this.next(unit)
    })
  }
}

export default DelayQueueExector
