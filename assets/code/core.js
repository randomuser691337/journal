// yes, most of this code is from WebDesk
var text = document.getElementById('textbox');
function mkw(content, title, width, m, height, btnid) {
    const windowId = gen(6);
    const windowContainer = document.createElement('div');
    windowContainer.className = 'centerw';
    windowContainer.id = windowId;
    windowContainer.style.display = "block";
    windowContainer.style.zIndex = 2;
    windowContainer.style.width = width;
    if (height) {
        windowContainer.style.height = height;
    }
    const titleBar = document.createElement('div');
    titleBar.className = 'content';
    if (btnid) {
        titleBar.innerHTML = title + ` <button class="winb wc" onclick="dest('${windowId}');" id="${btnid}">Close</button>`;
    } else {
        titleBar.innerHTML = title + ` <button class="winb wc" onclick="dest('${windowId}');">Close</button>`;
    }
    const contentContainer = titleBar;
    contentContainer.innerHTML += content;
    windowContainer.appendChild(titleBar);
    windowContainer.appendChild(contentContainer);
    if (m === "s") {
        document.body.appendChild(windowContainer);
    } else {
        document.getElementById('nest').appendChild(windowContainer);
    }
    return windowId;
}
function fesw(d1, d2) {
    const dr1 = document.getElementById(d1);
    const dr2 = document.getElementById(d2);
    $(dr1).fadeOut(150, function () { $(dr2).fadeIn(150); });
}
function hidef(d1) {
    const dr1 = document.getElementById(d1);
    if (dr1) {
        $(dr1).fadeOut(150);
    }
}
function showf(d1) {
    const dr1 = document.getElementById(d1);
    $(dr1).fadeIn(150);
}
function dest(d1) {
    const dr1 = document.getElementById(d1);
    $(dr1).fadeOut(170, function () { dr1.remove(); });
}
function gen(length) {
    if (length <= 0) {
        console.error('Length should be greater than 0');
        return null;
    }

    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function snack(cont, t) {
    var snackElement = document.createElement("div");
    snackElement.className = "snack";
    const fuckyou = gen(7);
    snackElement.id = fuckyou;
    snackElement.innerHTML = cont;
    document.body.appendChild(snackElement);
    snackElement.onclick = function () {
        dest(fuckyou);
    }
    setTimeout(function () { dest(fuckyou); }, t);
}
function changevar(varName, varValue) {
    const root = document.documentElement;
    root.style.setProperty(`--${varName}`, `${varValue}`);
    writevar(varName, varValue);
}
async function setpass1(i1, i2) {
    const id1 = document.getElementById(i1).value;
    const id2 = document.getElementById(i2).value;
    if (id1 === id2) {
        pass = id2;
        fesw('passfirst', 'journalmain');
        await writevar('check', 'passed');
        writepb('sd', 'y');
    } else {
        snack('Passswords do not match', '3000');
    }
}
async function checkpass(i1, act) {
    const id1 = document.getElementById(i1).value;
    if (id1) {
        pass = id1;
        const fuck = await readvar('check');
        if (fuck === "passed") {
            eval(act);
        }
    }
}
async function appear(mode) {
    if (mode === "l") {
        changevar('background', '#fff');
        changevar('lightdark', '#fff');
        changevar('lightdarkb', '#F0F0F0');
        changevar('fontc', '#000');
        changevar('fontc2', "#333");
        changevar('bordercolor', "#DFDFDF");
        await writevar('appear', 'l');
    } else {
        changevar('background', '#000');
        changevar('lightdark', '#1a1a1a');
        changevar('lightdarkb', '#2a2a2a');
        changevar('fontc', '#fff');
        changevar('fontc2', "#aaa");
        changevar('bordercolor', "#3a3a3a");
        await writevar('appear', 'd');
    }
}
function chacc(clr1) {
    changevar('accent', clr1);
}
function chacc2(ye) {
    const ye2 = document.getElementById(ye).value;
    chacc(ye2);
}
var valuesToCheck = [".txt"];
window.updatepageList = async function () {
    const pageList = document.getElementById('pages');
    pageList.innerHTML = ''; // Clear existing list

    // Read all variables with name starting with 'page_'
    const db = await initDB();
    const transaction = db.transaction('settings', 'readonly');
    const objectStore = transaction.objectStore('settings');
    const request = objectStore.getAllKeys();

    request.onsuccess = async (event) => {
        const keys = event.target.result;
        keys.forEach(key => {
            if (key.startsWith('page_')) {
                const fileName = key.slice(5); // Remove 'page_' prefix
                const listItem = document.createElement('div');
                listItem.textContent = fileName;
                listItem.className = "list";
                let found = valuesToCheck.find(value => key.includes(value));
                const viewBtn = document.createElement('button');
                if (found === ".txt") {
                    viewBtn.textContent = "View";
                    viewBtn.className = "winb";
                    viewBtn.addEventListener('click', async () => {
                        const content = await readvar(key);
                        current = key;
                        openj(content, fileName);
                    });
                } else {
                    viewBtn.textContent = "you little shit";
                }

                const downloadButton = document.createElement('button');
                downloadButton.textContent = "Grab";
                downloadButton.className = "winb";
                downloadButton.addEventListener('click', async () => {
                    const content = await readvar(key);
                    const a = document.createElement('a');
                    a.href = content;
                    a.download = fileName;
                    a.click();
                    snack('Started file download!', '2500');
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = "Delete";
                deleteButton.className = "winb";
                deleteButton.addEventListener('click', () => {
                    listItem.parentNode.removeChild(listItem);
                    delvar(key);
                    snack('Deleted file successfully!', '2500');
                });

                const renButton = document.createElement('button');
                renButton.textContent = "Rename";
                renButton.className = "winb";
                renButton.addEventListener('click', () => {
                    const boxId = gen(7);
                    const win = `<p>Enter a name that isn't already used, filenames are not encrypted!</p>
                    <input class="i1" id="${boxId}" placeholder="Name here"/><button class="b1" onclick="renpage('${key}', '${boxId}');$(this).parent().parent().fadeOut('150', function() {$(this).remove();});">Rename</button>`;
                    mkw(win, 'page - Rename', '300px');
                });

                const p = document.createElement('p');

                // Add both buttons to the list item
                listItem.appendChild(p);
                p.appendChild(downloadButton);
                p.appendChild(viewBtn);
                p.appendChild(deleteButton);
                p.appendChild(renButton);
                pageList.appendChild(listItem);
            }
        });
    };

    request.onerror = (event) => {
        console.error("[ERR] Error fetching page variables: " + event.target.errorCode);
    };
};

async function renpage(name, box) {
    const inputValue = document.getElementById(box).value;
    const sillyExtension = valuesToCheck.find(ext => name.endsWith(ext));
    if (sillyExtension) {
        const newName = `${inputValue}${sillyExtension}`;
        await renvar(name, `page_${newName}`);
    } else {
        await renvar(name, `page_${inputValue}`);
    }
    await window.updatepageList();
    snack(`Renamed to ${inputValue} successfully`, '3500');
}

function makepg(id) {
    const i = document.getElementById(id).value;
    if (i) {
        const ok = `page_${i}.txt`;
        const name = ok.slice(5);
        current = ok;
        writevar(ok, '');
        openj('', name);
        fesw('journalmake', 'journalmain');
    }
}
async function openj(cont, name) {
    text.value = cont;
    document.getElementById('name').innerHTML = name;
    showf('menubar');showf('textbox');
}
async function closej() {
    document.getElementById('name').innerHTML = "";
    await writevar(current, text.value);
    hidef('menubar');hidef('textbox');
    text.innerText = "";
}
async function closejn() {
    document.getElementById('name').innerHTML = "";
    hidef('menubar');hidef('textbox');
    text.innerText = "";
}