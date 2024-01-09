exports.executeAsyncOperation = function (callback) {
  return new Promise((resolve, reject) => {
    // Execute asynchronous operation and invoke callback
    callback((error, result) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
