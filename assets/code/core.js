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
    pinDisplay.setAttribute('style', 'display:inline; margin-bottom:10px; font-size:20px; text-align:center; width:100%; box-sizing: border-box;');
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
        button.setAttribute('style', 'font-size:20px; padding:26px;');
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
    zeroButton.setAttribute('style', 'font-size:20px; padding:10px;');
    zeroButton.addEventListener('click', () => {
        if (pin.length < 6) {
            pin += '0';
            updateDisplay();
        }
    });
    keypad.appendChild(zeroButton);

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.setAttribute('style', 'font-size:20px; padding:10px; grid-column:span 2;');
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
});

auth('auth', async function (pin) {
    console.log('Entered PIN 2:', pin);
    const fuck = await chkp(pin);
    if (fuck === true) {
        fesw('auth', 'home');
        await loadj();
    }
});

function fesw(d1, d2) {
    const dr1 = document.getElementById(d1);
    const dr2 = document.getElementById(d2);
    $(dr1).fadeOut(130, function () { $(dr2).fadeIn(130); });
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
}

async function loadj() {
    try {
        document.getElementById('home2').innerHTML = "";
        const fileData = await readf('/user/entries.json');
        const jsonData = JSON.parse(fileData);
        const entries = Object.entries(jsonData);
        for (const [key, value] of entries) {
            const buttonText = `${value.appn}`;
            if (!fucker2(buttonText)) {
                const button = document.createElement('button');
                button.addEventListener('click', function () {
                    idk(value.appc);
                    cur = value.appn;
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
        jsonData[name] = { appn: name, appc: cont };
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