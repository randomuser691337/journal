let db;
var pass = "def";
const request = window.indexedDB.open(dbn, 1);
function initializeDB() {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve();
    } else {
      const request = window.indexedDB.open(dbn, 1);
      request.onerror = function (event) {
        reject("<!> shit:" + event.target.errorCode);
        panic('1', event.target.errorCode);
      };
      request.onsuccess = function (event) {
        db = event.target.result;
        resolve();
      };
      request.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains('files')) {
          db.createObjectStore('files', { keyPath: 'path' });
        }
      };
    }
  });
}

request.onerror = function (event) {
  console.error("Database error: " + event.target.errorCode);
};

request.onsuccess = function (event) {
  db = event.target.result;
};

request.onupgradeneeded = function (event) {
  db = event.target.result;
  const objectStore = db.createObjectStore('files', { keyPath: 'path' });
};

function writepb(key, value) {
  localStorage.setItem(key, value);
}

function readpb(key) {
  return localStorage.getItem(key);
}

function delpb(key) {
  localStorage.removeItem(key);
}

function erasepb() {
  localStorage.clear();
}

function encrypt(value) {
  return CryptoJS.AES.encrypt(value, pass).toString();
}

function decrypt(value) {
  return CryptoJS.AES.decrypt(value, pass).toString(CryptoJS.enc.Utf8);
}

function writef(name, value) {
  const transaction = db.transaction(['files'], 'readwrite');
  const objectStore = transaction.objectStore('files');
  const enc = encrypt(value);
  const file = { path: name, value: enc };
  objectStore.put(file);
}

function readf(name) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['files'], 'readonly');
    const objectStore = transaction.objectStore('files');
    const path = name;
    const request = objectStore.get(path);
    request.onsuccess = function (event) {
      const file = event.target.result;
      if (file) {
        resolve(decrypt(file.value));
      } else {
        console.log(`<!> Couldn't find "${name}"`);
        resolve(undefined);
      }
    };
    request.onerror = function (event) {
      panic('5', event.target.errorCode);
    };
  });
}

async function eraseall(reb) {
  const transaction = db.transaction(['files'], 'readwrite');
  const objectStore = transaction.objectStore('files');
  await erasepb();
  await objectStore.clear();
  if (reb) {
    reboot(400);
  }
}

function delf(name) {
  const transaction = db.transaction(['files'], 'readwrite');
  const objectStore = transaction.objectStore('files');
  const path = name;
  objectStore.delete(path);
}

function renf(name, newName) {
  const transaction = db.transaction(['files'], 'readwrite');
  const objectStore = transaction.objectStore('files');
  const oldPath = name;
  const newPath = newName;
  const request = objectStore.get(oldPath);
  request.onsuccess = function (event) {
    const file = event.target.result;
    if (file) {
      file.path = newPath;
      objectStore.put(file);
    } else {
      console.log("File not found");
    }
  };
}

async function setupde(pass2) {
  pass = pass2;
  const imlazy = `key${gen(16)}`;
  await writef('/system/enckey', imlazy);
  pass = imlazy;
  writef('/system/check', 'DontModifyOrYouWillLoseData');
}

async function chkp(pass2) {
  pass = pass2;
  const key = await readf('/system/enckey');
  if (key) {
    pass = key;
    const check = await readf('/system/check');
    if (check === 'DontModifyOrYouWillLoseData') {
      return true;
    } else {
      return false;
    }
  } else {
    return "missing";
  }
}