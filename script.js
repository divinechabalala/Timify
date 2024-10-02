let timer;
let isRunning = false;
let workDuration = 25 * 60; // default 25 minutes in seconds
let breakDuration = 5 * 60; // default 5 minutes in seconds
let timeLeft = workDuration;

document.getElementById('setTimer').addEventListener('click', () => {
    workDuration = parseInt(document.getElementById('workDuration').value) * 60;
    breakDuration = parseInt(document.getElementById('breakDuration').value) * 60;
    resetTimer();
});

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('stopBtn').addEventListener('click', stopTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                isRunning = false;
                // Play alarm sound here
                alert("Time's up!");
                timeLeft = breakDuration; // switch to break
                // Optionally play an alarm sound
                const alarm = new Audio('sounds/alarm1.mp3'); // Replace with your sound
                alarm.play();
            } else {
                timeLeft--;
            }
            updateTimerDisplay();
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    timeLeft = workDuration;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timerDisplay').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// To-Do List functionality
document.getElementById('addTodoBtn').addEventListener('click', addTodo);

function addTodo() {
    const taskInput = document.getElementById('todoInput');
    const taskText = taskInput.value.trim();
    if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        li.addEventListener('click', () => li.remove()); // click to remove task
        document.getElementById('tasks').appendChild(li);
        taskInput.value = '';
    }
}

// Cloudinary Upload Widget
document.getElementById('uploadWidget').addEventListener('click', function() {
    cloudinary.openUploadWidget(
        {
            cloudName: 'your-cloud-name', // Replace with your Cloud Name
            uploadPreset: 'your-upload-preset', // Use the upload preset you created
            sources: ['local', 'url'], // Allow users to upload from local or URL
            cropping: true, // Enable cropping
            multiple: false, // Allow only one image upload
            showAdvancedOptions: true,
            theme: 'minimal', // Choose your desired theme
        },
        function(error, result) {
            if (!error && result && result.event === "success") {
                console.log('Upload Successful! Image URL:', result.info.secure_url);
                // Display uploaded image in the UI
                const imageElement = document.createElement('img');
                imageElement.src = result.info.secure_url;
                imageElement.alt = 'Uploaded Image';
                imageElement.style.maxWidth = '100%'; // Adjust size as needed
                document.body.appendChild(imageElement);
            } else if (error) {
                console.error('Upload Error:', error);
            }
        }
    );
});