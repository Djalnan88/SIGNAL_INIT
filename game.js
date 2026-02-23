const terminalOutput = document.getElementById('terminal-output');
const commandInput = document.getElementById('command-input');
const progressFill = document.getElementById('progress-fill');
const progressPercentage = document.getElementById('progress-percentage');
const hiddenBtn = document.getElementById('hidden-interface-btn');

// --- Game State ---
const gameState = {
    playerName: "",
    progress: 0,
    stage: 0, // 0: Init, 1: Id, 2: Decode...
    isTyping: false
};

// --- Utilities ---
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function typePrint(text, speed = 25, color = '') {
    gameState.isTyping = true;
    const line = document.createElement('div');
    if (color) line.style.color = color;
    terminalOutput.appendChild(line);

    for (const char of text) {
        line.innerHTML += char;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        await sleep(speed);
    }
    gameState.isTyping = false;
    return line;
}

function instantPrint(text, color = '') {
    const line = document.createElement('div');
    if (color) line.style.color = color;
    line.innerHTML = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function setProgress(value) {
    gameState.progress = Math.min(100, value);
    progressFill.style.width = `${gameState.progress}%`;
    progressPercentage.innerText = `${gameState.progress}%`;
}

// --- Stages Implementation ---

async function stage0_Init() {
    await typePrint(">> BOOTING_INTERFACE...", 10);
    await sleep(500);
    await typePrint(">> INITIALIZING_MEMORY_CORE...", 10);
    await sleep(300);
    await typePrint(">> LOADING_SIGNAL_ANALYSIS_MODULE...", 10);
    await sleep(800);
    setProgress(5);
    
    await typePrint("\n[SYSTEM] Unknown signal detected from OUTSIDE_NETWORK.", 20);
    await typePrint("[SYSTEM] Connection requires manual identification.", 20);
    await typePrint("\nPLEASE IDENTIFY YOURSELF.", 30, '#ffcc00');
}

async function handleCommand(cmd) {
    const command = cmd.trim().toLowerCase();
    instantPrint(`<span style="color: #666"> > ${cmd}</span>`);
    commandInput.value = '';

    if (gameState.isTyping) return;

    switch (gameState.stage) {
        case 0: // Identification
            gameState.playerName = cmd;
            gameState.stage = 1;
            setProgress(10);
            await typePrint(`\nWelcome, ${gameState.playerName}.`, 30);
            await typePrint("[LOG] Creating temporal profile for analysis...", 10);
            await sleep(500);
            await typePrint("\n[ALERT] ACCESS_DENIED.", 30, '#ff3333');
            await typePrint("Current credentials lack sufficient privileges to analyze signal.", 20);
            await typePrint("Type 'help' to see available commands.", 20);
            break;

        case 1: // Login/Help stage
            if (command === 'help') {
                instantPrint("\nAvailable local commands:");
                instantPrint("- whoami : Check current user profile");
                instantPrint("- ls     : List available system logs");
                instantPrint("- connect: Establish relay connection (RESTRICTED)");
            } else if (command === 'whoami') {
                await typePrint(`\nUSER: ${gameState.playerName}\nROLE: GUEST_OBSERVER\nLEVEL: 0`, 20);
            } else if (command === 'ls') {
                instantPrint("\n[FILE] access.log");
                instantPrint("[FILE] sys_config.json");
            } else if (command === 'connect') {
                await typePrint("\nAttempting connection...", 30);
                await sleep(1000);
                await typePrint("[FAILED] Error 403: HIDDEN_IN_PLAIN_SIGHT.", 30, '#ff3333');
            } else if (command === 'binary') { 
                gameState.stage = 2;
                setProgress(20);
                await typePrint("\n[SUCCESS] HIDDEN_PASSWORD_ACCEPTED.", 30, '#00ff88');
                await typePrint("Relay connection established. incoming signal stream starting...", 20);
                await sleep(1000);
                await typePrint("\nINCOMING_DATA: U09VUkNFX0ZPVU5E", 40, '#ffcc00'); 
                await typePrint("HINT: The signal looks encoded (Base64).", 20);
            } else {
                instantPrint(`\nCommand not found: ${cmd}`, '#ff3333');
            }
            break;
            
        case 2: // Decoding Stage
            if (command === 'source_found') {
                gameState.stage = 3;
                setProgress(40);
                await typePrint("\n[SIGNAL_FRAGMENT_DECODED]", 30, '#00ff88');
                await typePrint("Origin: RECV_BUFFER_0x24", 20);
                await sleep(500);
                await typePrint("\n[SYSTEM] Interface corruption detected.", 20, '#ffcc00');
                await typePrint("[ERROR] Interactive elements disabled by external override.", 20, '#ff3333');
                
                hiddenBtn.style.display = 'block';
                await typePrint("\n>> MANUAL_OVERRIDE_REQUIRED.", 30);
                await typePrint("HINT: Inspect the 'interface' for manual control attributes. (Look for 'disabled' property)", 20);
            } else {
                instantPrint("\nInvalid key. Keep decoding.", '#ff3333');
            }
            break;

        case 3: // Stage 3 is handled by the button click
            instantPrint("\nInterface is locked. Manual override required.", '#ff3333');
            break;

        case 4: // Network Tracking / Reverse key
            if (command === 'em esrever' || command === 'reverse me') {
                gameState.stage = 5;
                setProgress(80);
                await typePrint("\n[SUCCESS] ORIGIN_TRACED: LOCALHOST.", 30, '#00ff88');
                await typePrint("\nWait... if the signal is coming from LOCALHOST...", 40, '#ffcc00');
                await sleep(1000);
                await typePrint("This is not a signal from space.", 30);
                await sleep(1000);
                await typePrint("This is a test.", 30);
                await sleep(1000);
                await typePrint("\n[SYSTEM] FINAL_VERIFICATION_REQUIRED.", 20);
                await typePrint("Reconstruct path through memory maze.", 20);
                instantPrint("\n S . . # ");
                instantPrint(" # . # . ");
                instantPrint(" . . . E ");
                await typePrint("\nEnter shortest path length:", 30, '#ffcc00');
            } else {
                instantPrint("\nTrace failed. Key mismatch.", '#ff3333');
            }
            break;

        case 5: // Final Algorithm Puzzle
            if (command === '5') {
                setProgress(100);
                await typePrint("\n[SIGNAL_DECODE_COMPLETE]", 40, '#00ff88');
                await sleep(1000);
                await typePrint("\nSUCCESS.", 30);
                await sleep(500);
                await typePrint(`Welcome, ${gameState.playerName}.`, 30);
                await typePrint("You are not just a receiver.", 30);
                await typePrint("You are a builder.", 30);
                await sleep(2000);
                
                // Final Reveal
                terminalOutput.innerHTML = "";
                await typePrint("SIGNAL SOURCE FOUND: [BLACKWIND_DEV_CLUB]", 10, '#00ff88');
                await typePrint("\n우리는 정체불명의 신호를 해독할 수 있는 당신 같은 사람을 기다리고 있었습니다.", 20);
                await typePrint("코드로 세상을 바꾸고 싶은가요? 논리로 한계를 시험하고 싶은가요?", 20);
                await typePrint("\n[ACCESS GRANTED] 동아리 지원 페이지로 이동합니다...", 20);
                
                await sleep(3000);
                window.location.href = "https://www.notion.so/blackwind/f35c28b6d9b34f4b9a8fa509fe8e7aab"; // Placeholder for real link
            } else {
                instantPrint("\nIncorrect path length.", '#ff3333');
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

hiddenBtn.addEventListener('click', async () => {
    if (gameState.stage === 3) {
        hiddenBtn.style.display = 'none';
        gameState.stage = 4;
        setProgress(60);
        await typePrint("\n[SUCCESS] Override active. Deep layer analysis starting...", 30, '#00ff88');
        await typePrint("[LOG] Analyzing network traffic...", 10);
        await sleep(1000);
        await typePrint("\nTRACE_RESULT: Found potential key in response header.", 20);
        await typePrint("HINT: 'reverse me'", 20, '#ffcc00');
    }
});

// Focus input on any click
document.addEventListener('click', () => {
    commandInput.focus();
});

// --- Boot Game ---
stage0_Init();
