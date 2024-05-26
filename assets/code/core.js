function auth(divToAddTo, returnFunction) {
    const container = document.getElementById(divToAddTo);
    if (!container) {
        console.error('The specified div does not exist');
        return;
    }

    const pinDisplay = document.createElement('input');
    pinDisplay.setAttribute('type', 'password');
    pinDisplay.setAttribute('readonly', 'true');
    pinDisplay.setAttribute('maxlength', '6');
    pinDisplay.setAttribute('placeholder', 'Enter PIN');
    pinDisplay.setAttribute('style', 'display:inline; font-size:20px; text-align:center; width:100%; box-sizing: border-box; margin-top: 6vw;');
    const keypad = document.createElement('div');
    keypad.setAttribute('style', 'display:grid inline; grid-template-columns:repeat(3, 1fr); gap:2px;');
    let pin = '';

    function updateDisplay() {
        pinDisplay.value = pin;
        if (pin.length === 6) {
            setTimeout(() => {
                returnFunction(pin);
                pin = '';
                updateDisplay();
            }, 100);
        }
    }

    for (let i = 1; i <= 9; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.setAttribute('style', 'font-size:25px; padding:10vw;');
        button.addEventListener('click', () => {
            if (pin.length < 6) {
                pin += i;
                updateDisplay();
            }
        });
        keypad.appendChild(button);
    }

    const zeroButton = document.createElement('button');
    zeroButton.textContent = '0';
    zeroButton.setAttribute('style', 'font-size:25px; padding:10vw;');
    zeroButton.addEventListener('click', () => {
        if (pin.length < 6) {
            pin += '0';
            updateDisplay();
        }
    });
    keypad.appendChild(zeroButton);

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.setAttribute('style', 'font-size:25px; padding:10vw; grid-column:span 2;');
    clearButton.addEventListener('click', () => {
        pin = '';
        updateDisplay();
    });
    keypad.appendChild(clearButton);
    container.appendChild(pinDisplay);
    container.appendChild(keypad);
}

auth('main', async function (pin) {
    console.log('Entered PIN:', pin);
    pass = pin;
    await setupde(pin);
    await writef('/user/entries.json', '');
    fesw('main', 'icons');

});

auth('auth', async function (pin) {
    console.log('Entered PIN 2:', pin);
    const fuck = await chkp(pin);
    if (fuck === true) {
        fesw('auth', 'home');
        await loadj();
    }
});

auth('changebox', async function (pin) {
    await changepass(pin);
});

auth('movebox', async function (pin) {
    const b = await compressfs();
    imoved = true;
    custf(pin, 'movebox', b);
});

function reboot() {
    window.location.reload();
}

function fesw(d1, d2) {
    const dr1 = document.getElementById(d1);
    const dr2 = document.getElementById(d2);
    $(dr1).fadeOut(130, function () { $(dr2).fadeIn(130); });
}

async function gens(length) {
    if (length <= 0) {
        console.error('Length should be greater than 0');
        return null;
    }

    const array = new Uint32Array(Math.ceil(length / 4));
    window.crypto.getRandomValues(array);

    let result = '';
    for (let i = 0; i < array.length; i++) {
        result += array[i].toString(16).padStart(8, '0');
    }

    return result.slice(0, length);
}

function hidef(d1, anim) {
    const dr1 = document.getElementById(d1);
    if (dr1) {
        if (anim) {
            $(dr1).fadeOut(anim);
        } else {
            $(dr1).fadeOut(150);
        }
    }
}

function showf(d1, anim) {
    const dr1 = document.getElementById(d1);
    if (dr1) {
        if (anim) {
            $(dr1).fadeIn(anim);
        } else {
            $(dr1).fadeIn(150);
        }
    }
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

function idk(val) {
    document.getElementById('journalarea').value = val;
    fesw('home', 'editor');
    document.getElementById('jtext').innerText = short(cur, 22);
}

async function loadj() {
    try {
        document.getElementById('home2').innerHTML = "";
        const fileData = await readf('/user/entries.json');
        const jsonData = JSON.parse(fileData);
        const entries = Object.entries(jsonData);
        entries.sort((a, b) => new Date(b[1].appd) - new Date(a[1].appd));

        for (const [key, value] of entries) {
            const buttonText = `${value.appn} - ${value.appd}`;
            if (!fucker2(buttonText)) {
                const button = document.createElement('button');
                button.addEventListener('click', function () {
                    cur = value.appn;
                    idk(value.appc);
                });
                button.innerText = buttonText;
                button.classList = "list";
                document.getElementById('home2').appendChild(button);
            }
        }
    } catch (error) {
        console.log(`Error reading JSON file: ${error}`);
    }
}

async function adde(name, cont) {
    try {
        const existingData = await readf('/user/entries.json');
        const jsonData = existingData ? JSON.parse(existingData) : {};
        jsonData[name] = { appn: name, appc: cont, appd: getdate() };
        const json = JSON.stringify(jsonData);
        await writef('/user/entries.json', json);
        await loadj();
    } catch (error) {
        console.log(`Error writing JSON file: ${error}`);
    }
}

async function dele(name) {
    try {
        const existingData = await readf('/user/entries.json');
        const jsonData = JSON.parse(existingData);
        if (jsonData.hasOwnProperty(name)) {
            delete jsonData[name];
            const json = JSON.stringify(jsonData);
            await writef('/user/entries.json', json);
            await loadj();
        }
    } catch (error) {
        console.log(`<!> Error deleting app ${name}: ${error}`);
    }
}

function getdate() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentDate = new Date();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    return (`${month} ${day}, ${year}`);
}

function fucker2(text, byebye) {
    const buttons = document.querySelectorAll('#home button');
    for (const button of buttons) {
        if (button.innerText === text) {
            if (byebye === "yes") {
                button.remove();
            } else {
                return true;
            }
        }
    }
    return false;
}

function cv(varName, varValue) {
    const root = document.documentElement;
    root.style.setProperty(`--${varName}`, `${varValue}`);
}

function short(inputString, size) {
    if (inputString.length <= size) {
        return inputString;
    } else {
        return inputString.slice(0, size - 3) + '...';
    }
}

async function lightm() {
    cv('main', '#ddd');
    cv('pure', '#fff');
    cv('font', '#000');
    cv('secm', '#ccc')
    cv('icon', '1');
    await writef('/user/appear', 'l');
}

async function darkm() {
    cv('main', '#111');
    cv('pure', '#000');
    cv('font', '#fff');
    cv('secm', '#222');
    cv('icon', '0');
    await delf('/user/appear');
}

document.getElementById('searchbox').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const buttons = document.querySelectorAll('#home2 button');

    buttons.forEach(button => {
        if (button.textContent.toLowerCase().includes(query)) {
            button.classList.remove('hide');
        } else {
            button.classList.add('hide');
        }
    });
});

function isIos() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isInStandaloneMode() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
}

if (isIos() && isInStandaloneMode()) {
    document.body.style.paddingTop = '0px';
}