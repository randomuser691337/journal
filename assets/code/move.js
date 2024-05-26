var deskid;
async function dserv(id) {
    setTimeout(function () {
        if (deskid === undefined) {
            console.log('<!> DeskID failed to register, trying again...');
            dserv(readpb('deskid'));
        }
    }, 10000);
    peer = new Peer(id);

    peer.on('open', (peerId) => {
        masschange('mcode', peerId);
        deskid = peerId;
        console.log('<i> DeskID is online. ID: ' + deskid);
    });

    peer.on('connection', (conn) => {
        conn.on('data', (data) => {
            if (data.name === "movebox") {
                if (sdone === false) {
                    restorefs(data.file);
                    custf(data.id, 'success', 'yeah');
                } 
            } else if (data.name === "success" && imoved === true) {
                eraseall();fesw('move', 'good');
                pass = "def"; writef('/system/migrate', 'true');
            }
        });
    });
}

function custf(id, fname2, fblob2) {
    const dataToSend = {
        name: fname2,
        file: fblob2,
        id: deskid
    };

    try {
        const conn = peer.connect(id);

        conn.on('open', () => {
            conn.send(dataToSend);
        });

        conn.on('error', (err) => {
            console.error('Connection error:', err);
        });
    } catch (error) {
        console.log(error);
    }
}

async function compressfs() {
    return new Promise(async (resolve, reject) => {
        try {
            const zip = new JSZip();
            const transaction = db.transaction(['files'], 'readonly');
            const objectStore = transaction.objectStore('files');
            const request = objectStore.getAll();
            request.onsuccess = function (event) {
                const files = event.target.result;
                files.forEach(file => {
                    zip.file(file.path, decrypt(file.value));
                });
                resolve(zip.generateAsync({ type: "blob" }));
            };
            request.onerror = function (event) {
                panic('5', event.target.errorCode);
                reject(event.target.errorCode);
            };
        } catch (error) {
            reject(error);
        }
    });
}

async function restorefs(zipBlob) {
    console.log('<i> Restore Stage 1: Prepare zip');
    try {
        fesw('setupqs', 'setuprs');
        const zip = await JSZip.loadAsync(zipBlob);
        const fileCount = Object.keys(zip.files).length;
        let filesDone = 0;
        console.log(`<i> Restore Stage 2: Open zip and extract ${fileCount} files to FS`);
        await Promise.all(Object.keys(zip.files).map(async filename => {
            console.log(`<i> Restoring file: ${filename}`);
            if (filename === "/system/enckey") {
                console.log(`<i> Skipped a file: ${filename}`);
            } else {
                const file = zip.files[filename];
                const value = await file.async("string");
                writef(filename, value);
                filesDone++;
            }
        }));
        setTimeout(reboot, 2000);
    } catch (error) {
        console.error('Error during restoration:', error);
    }
}

function masschange(classn, val) {
    const usernameElements = document.getElementsByClassName(classn);
    for (let i = 0; i < usernameElements.length; i++) {
        usernameElements[i].textContent = val;
    }
}