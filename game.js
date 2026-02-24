const terminalOutput = document.getElementById('terminal-output');
const commandInput = document.getElementById('command-input');
const progressFill = document.getElementById('progress-fill');
const progressPercentage = document.getElementById('progress-percentage');
const promptText = document.querySelector('.prompt');

// --- Game State ---
const gameState = {
    playerName: "",
    progress: 0,
    stage: 0,
    isTyping: false,
    stage1Fails: 0
};

// --- Utilities ---
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function typePrint(text, speed = 25, color = '') {
    gameState.isTyping = true;
    const line = document.createElement('div');
    if (color) line.style.color = color;
    terminalOutput.appendChild(line);

    for (const char of text) {
        if (char === '\n') {
            line.innerHTML += '<br>';
        } else {
            line.innerHTML += char === ' ' ? '&nbsp;' : char;
        }
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        await sleep(speed);
    }
    gameState.isTyping = false;
    return line;
}

function instantPrint(text, color = '') {
    const line = document.createElement('div');
    if (color) line.style.color = color;
    line.innerHTML = text.replace(/\n/g, '<br>').replace(/  /g, '&nbsp;&nbsp;');
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function setProgress(value) {
    gameState.progress = Math.min(100, value);
    progressFill.style.width = `${gameState.progress}%`;
    progressPercentage.innerText = `${gameState.progress}%`;
}

function updatePrompt(stageNum) {
    if (stageNum === 0) {
        promptText.innerText = ` guest@SIGNAL_INIT:~$ `;
    } else if (typeof stageNum === 'string') {
        promptText.innerText = ` ${gameState.playerName}@${stageNum}:~$ `;
    } else {
        promptText.innerText = ` ${gameState.playerName}@STAGE_${stageNum}:~$ `;
    }
}

// --- Stages Implementation ---

async function stage0_Init() {
    updatePrompt(0);
    await typePrint(">> BOOTING_INTERFACE...", 10);
    await sleep(400);
    await typePrint(">> INITIALIZING_MEMORY_CORE...", 10);
    await sleep(300);
    await typePrint(">> LOADING_SIGNAL_ANALYSIS_MODULE...", 10);
    await sleep(600);
    setProgress(5);

    await typePrint("\n[SYSTEM] Unknown signal detected from OUTSIDE_NETWORK.", 20);
    await typePrint("[SYSTEM] Connection requires manual identification.", 20);
    await typePrint("\nPLEASE IDENTIFY YOURSELF (Enter your name):", 30, '#ffcc00');
}

async function handleCommand(cmd) {
    const command = cmd.trim().toLowerCase();
    instantPrint(`<span style="color: #666"> > ${cmd}</span>`);
    commandInput.value = '';

    if (gameState.isTyping) return;

    switch (gameState.stage) {
        case 0: // Identification
            if (!command) {
                instantPrint("Name cannot be empty.", '#ff3333');
                return;
            }
            gameState.playerName = cmd.replace(/[^a-zA-Z0-9가-힣_-]/g, '');
            if (!gameState.playerName) gameState.playerName = "guest";
            gameState.stage = 1;
            setProgress(15);
            updatePrompt(1);

            await typePrint(`\nWelcome, ${gameState.playerName}.`, 30);
            await sleep(500);
            await typePrint("\n[STAGE 1: INTERCEPTED SIGNAL]", 30, '#00ff88');
            await typePrint("We intercepted a basic encrypted transmission.", 20);
            await typePrint("Decrypt the following message to proceed:\n", 20);
            instantPrint("  KHOOR ZRUOG\n", '#ffcc00');
            await typePrint("Enter decrypted message:", 20);
            break;

        case 1: // Caesar Cipher (Answer: hello world)
            if (command === 'hello world' || command === 'helloworld') {
                gameState.stage = 2;
                setProgress(35);
                updatePrompt(2);
                await typePrint("\n[SUCCESS] Signal decrypted.", 30, '#00ff88');
                await sleep(500);

                await typePrint("\n[STAGE 2: LOGIC GATE]", 30, '#00ff88');
                await typePrint("We need to identify the Frontend Developer among 3 suspects.", 20);
                await sleep(300);
                instantPrint("\n[Suspect Statements]");
                instantPrint("A: I am the Frontend Developer.");
                instantPrint("B: I am NOT the Frontend Developer.");
                instantPrint("C: B is lying.\n");
                await typePrint("Condition: Only ONE suspect is telling the truth.", 20, '#ffcc00');
                await typePrint("\nWho is the real Frontend Developer? (a/b/c):", 20);
            } else {
                gameState.stage1Fails++;
                instantPrint("\n[ERROR] Incorrect decryption.", '#ff3333');
                if (gameState.stage1Fails >= 3) {
                    instantPrint("\nHINT: Caesar Cipher +3 (Shift letters back by 3)", '#ffaa00');
                }
            }
            break;

        case 2: // Logic Puzzle (Answer: c)
            if (command === 'c') {
                gameState.stage = 3;
                setProgress(60);
                updatePrompt(3);
                await typePrint("\n[SUCCESS] Logic gate bypassed.", 30, '#00ff88');
                await sleep(500);

                await typePrint("\n[STAGE 3: UNAUTHORIZED MERGE]", 30, '#00ff88');
                await typePrint("Someone force-pushed to the main branch! Find the culprit.", 20);
                await sleep(300);
                instantPrint("\n[Log Statements]");
                instantPrint("A: D did it.");
                instantPrint("B: I didn't do it.");
                instantPrint("C: A is telling the truth.");
                instantPrint("D: A is lying.\n");
                await typePrint("Condition: Only ONE person is LYING.", 20, '#ffcc00');
                await typePrint("\nWho is the culprit? (a/b/c/d):", 20);
            } else if (['a', 'b'].includes(command)) {
                instantPrint("\n[ERROR] Logic mismatch. Try again.", '#ff3333');
            } else {
                instantPrint("\nPlease enter a, b, or c.", '#ff3333');
            }
            break;

        case 3: // Git Merge Puzzle (Answer: d)
            if (command === 'd') {
                gameState.stage = 4;
                setProgress(85);
                updatePrompt(4);
                await typePrint("\n[SUCCESS] Culprit identified.", 30, '#00ff88');
                await sleep(500);

                await typePrint("\n[STAGE 4: DATA ROUTING]", 30, '#00ff88');
                await typePrint("Find the shortest path length from S to E.", 20);
                await typePrint("You can only move up, down, left, or right. Walls are '#'.", 20);
                await sleep(300);
                instantPrint("\n [MAP]");
                instantPrint(" S  .  .  #");
                instantPrint(" #  .  #  .");
                instantPrint(" .  .  .  E\n", '#ffcc00');
                await typePrint("Enter the shortest number of steps.:", 20);
            } else if (['a', 'b', 'c'].includes(command)) {
                instantPrint("\n[ERROR] Incorrect suspect. Try again.", '#ff3333');
            } else {
                instantPrint("\nPlease enter a, b, c, or d.", '#ff3333');
            }
            break;

        case 4: // Shortest Path (Answer: 5)
            if (command === '5') {
                setProgress(100);
                updatePrompt("CLEARED");
                await typePrint("\n[SIGNAL_DECODE_COMPLETE]", 40, '#00ff88');
                await sleep(1000);
                await typePrint("\nSUCCESS.", 30);
                await sleep(500);
                await typePrint(`Welcome to the inner network, ${gameState.playerName}.`, 30);
                await typePrint("You have proven your logical and analytical skills.", 30);
                await sleep(2500);

                // Final Reveal
                terminalOutput.innerHTML = "";
                await typePrint("SIGNAL SOURCE FOUND: [BLACKWIND]\n", 10, '#00ff88');
                await typePrint("우리는 정체불명의 신호를 해독할 수 있는 당신 같은 사람을 기다리고 있었습니다.", 20);
                await typePrint("코드로 세상을 바꾸고 싶은가요? 함께 한계를 시험하고 싶은가요?\n", 20);
                await typePrint("[ACCESS GRANTED] 동아리 지원 페이지로 이동합니다...", 20, '#ffcc00');

                await sleep(3000);
                window.open("https://www.notion.so/blackwind/f35c28b6d9b34f4b9a8fa509fe8e7aab", "_blank");
            } else {
                instantPrint("\n[ERROR] Path calculation failed. Try again.", '#ff3333');
            }
            break;
    }
}

// --- Event Listeners ---
commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = commandInput.value;
        if (cmd) handleCommand(cmd);
    }
});

// Focus input on any click
document.addEventListener('click', () => {
    commandInput.focus();
});

// --- Boot Game ---
stage0_Init();
