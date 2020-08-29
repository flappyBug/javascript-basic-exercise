export default function waitForAll(...promises) {
  // This function returns a promise which will be triggered when all the `promises` are completed.
  //
  // If all the `promises` are resolved, then the returned promise will be resolved. Otherwise,
  // if one of the `promises` is rejected, then the returned promise will be rejected.
  //
  // Your target:
  //
  // * Please implement this function and pass all the tests in wait_for_all_spec.js.
  // * Please do NOT modify the signature of the function.
  if (!promises.every(promise => promise instanceof Promise)) {
    throw new Error('Not all elements are promises.');
  }

  return new Promise((resolve, reject) => {
    let pendingsCount = promises.length;
    let noReject = true;
    const resolveHandler = () => {
      pendingsCount -= 1;
      if (pendingsCount) {
        return;
      }
      if (noReject) {
        resolve();
      } else {
        reject();
      }
    };
    const rejectHandler = () => {
      pendingsCount -= 1;
      noReject = false;
      if (pendingsCount === 0) {
        reject();
      }
    };
    promises.forEach(promise => promise.then(resolveHandler, rejectHandler));
  });
}
