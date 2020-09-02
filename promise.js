const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class _Promise {
  constructor (executor) {
    this._status = PENDING;
    this._value = undefined;
    this._resolves = [];
    this._rejects = [];

    const resolve = (value) => {
      const run = () => {
        if (this._status !== PENDING) {
          return;
        }

        this._status = FULFILLED;
        this._value = value;

        while (this._resolves.length) {
          const callback = this._resolves.shift();
          callback(value);
        }
      };
      setTimeout(run);
    };

    const reject = (value) => {
      const run = () => {
        if (this._status !== PENDING) {
          return;
        }

        this._status = REJECTED;
        this._value = value;

        while (this._rejects.length) {
          const callback = this._rejects.unshift();
          callback(value);
        }
      };
      setTimeout(run);
    };

    // 初始化时, 立即执行executor
    executor(resolve, reject);
  }

  then (resolveFn, rejectFn) {
    if (typeof resolveFn !== 'function') {
      resolveFn = (value) => value;
    }
    if (typeof rejectFn !== 'function') {
      rejectFn = (reason) => {
        throw new Error(reason instanceof Error ? reason.message : reason);
      };
    }

    return new _Promise((resolve, reject) => {
      const fulfilled = (val) => {
        try {
          const res = resolveFn(val);
          res instanceof _Promise ? res.then(resolve, reject) : resolve(res);
        }
        catch (e) {
          reject(e);
        }
      };

      const rejected = (err) => {
        try {
          let res = rejectFn(err);
          res instanceof _Promise ? res.then(resolve, reject) : resolve(res);
        }
        catch (e) {
          reject(e);
        }
      };

      switch (this._status) {
        case PENDING: {
          this._resolves.push(fulfilled);
          this._rejects.push(rejected);
          break;
        }
        // 状态为FULFILLED/REJECTED时, 直接执行then回调
        case FULFILLED: {
          fulfilled(this._value);
          break;
        }
        case REJECTED: {
          rejected(this._value);
          break;
        }
      }
    });
  }

  catch (rejectFn) {
    return this.then(undefined, rejectFn);
  }

  finally (callback) {
    return this.then(
      value => _Promise.resolve(callback()).then(() => value),
      reason => _Promise.resolve(callback()).then(() => {throw reason;}),
    );
  }

  static resolve (value) {
    return value instanceof _Promise ? value : new _Promise((resolve) => resolve(value));
  }

  static reject (reason) {
    return new _Promise((_, reject) => reject(reason));
  }

  static all (promises) {
    let count;
    const res = [];

    return new _Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        _Promise.resolve(promise).then(
          (value) => {
            count++;
            res[index] = value;
            if (count === promises.length) {
              resolve(res);
            }
          },
          (error) => {
            reject(error);
          },
        );
      });
    });
  }

  static race (promises) {
    return new _Promise((resolve, reject) => {
      for (let promise of promises) {
        _Promise.resolve(promise).then(
          (value) => {
            resolve(value);
          },
          (error) => {
            reject(error);
          },
        );
      }
    });
  }
}

new _Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 500);
})
  .then(res => {
    console.log(res);
    return new _Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, 1000);
    });
  })
  .then(res => {
    console.log(res);
    return 3;
  })
  .then(res => {
    console.log(res);
  })
  .catch(console.log);