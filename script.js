let subjects = [];
let timer = null;
let time = 30 * 60;

function AddSubject() {
    let subjectName = document.getElementById("subjectName").value.trim();
    let duration = document.getElementById("duration").value;

    if (subjectName === "" || duration === "") {
        alert("Itna empty form dekh ke lagta hai tum bhi empty ho. Fill it");
        return;
    }
    subjects.push({
        name: subjectName,
        duration: duration,
        status: "pending"
    })
    document.getElementById("subjectName").value = "";
    document.getElementById("duration").value = "";

    displaySubject();
    updateSubject();
}
function displaySubject() {
    let list = document.getElementById("list")
    list.innerHTML = "";

    subjects.forEach((sub, idx) => {
        list.innerHTML += `
            <div class = "box">
                <h3>${sub.name}</h3>
                <p> Duration: ${sub.duration}</p>
                <p> Status: ${sub.status}</p>

                <button id="complete" onclick="Complete(${idx})">Done</button>
                <button id="delete" onclick="Delete(${idx})">Delete</button>
                </div>
            `;
    });
}

function Complete(idx) {
    subjects[idx].status = "Done";
    displaySubject();
    updateSubject();
}

function Delete(idx) {
    if (confirm("Chintapakk dam dam sure? once deleted, no comeback story")) {

        subjects.splice(idx, 1);
        displaySubject();
        updateSubject();
    }
}

function updateSubject() {
    let total = subjects.length;
    let completed = subjects.filter(s => s.status === "Done").length;
    let remaining = total - completed;

    document.getElementById("total").innerText = total;
    document.getElementById("completed").innerText = completed;
    document.getElementById("remaining").innerText = remaining;
}

function startTimer() {
    if (timer != null) {
        return;
    }
    timer = setInterval(() => {
        let min = Math.floor(time / 60);
        let sec = time % 60;

        if (sec < 10) {
            sec = "0" + sec;
        }

        document.getElementById("timer").innerText = `${min}:${sec}`;
        if (time <= 0) {
            clearInterval(timer);
            timer = null;
            alert("Study Session Complete. Wow, you actually survived this session");
            startBreak();
            return;
        }
        time--;
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    time = 30 * 60;
    document.getElementById("timer").innerText = "30:00";
}

function startBreak() {
    let breakTime = 5 * 60;
    document.getElementById("timer").style.color = "#F59E0B";
    let breakTimer = setInterval(() => {
        let minutes = Math.floor(breakTime / 60);
        let seconds = breakTime % 60;

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        document.getElementById("timer").innerText = `${minutes}:${seconds}`;
        breakTime--;

        if (breakTime < 0) {
            clearInterval(breakTimer);
            alert("Break Over. Back to work, future billionaire");
            time = 30 * 60;
            document.getElementById("timer").style.color = "#1e293b";
            document.getElementById("timer").innerText = "30:00";
        }
    }, 1000);
}

function resetDay() {
    subjects = [];
    displaySubject();
    updateSubject();
    resetTimer();
}
