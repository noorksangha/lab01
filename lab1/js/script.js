document.addEventListener('DOMContentLoaded', () => {
    const addNoteButton = document.getElementById('addNoteButton');
    const notesContainer = document.getElementById('notesContainer');
    const lastSavedTime = document.getElementById('lastSavedTime');

    addNoteButton.addEventListener('click', addNote);

    function addNote() {
        const noteElement = document.createElement('textarea');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            noteElement.remove();
            removeButton.remove();
            saveNotes();
        });
        notesContainer.appendChild(noteElement);
        notesContainer.appendChild(removeButton);
    }

    function saveNotes() {
        const notes = [];
        document.querySelectorAll('#notesContainer textarea').forEach(note => {
            notes.push(note.value);
        });
        localStorage.setItem('notes', JSON.stringify(notes));
        lastSavedTime.textContent = `Last Saved: ${new Date().toLocaleTimeString()}`;
    }

    setInterval(saveNotes, 2000);
});






document.addEventListener('DOMContentLoaded', () => {
    const notesDisplay = document.getElementById('notesDisplay');
    const lastUpdatedTime = document.getElementById('lastUpdatedTime');

    function displayNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesDisplay.innerHTML = ''; // Clear existing notes
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.textContent = note;
            noteElement.classList.add('note'); // Ensure you have CSS for class 'note'
            notesDisplay.appendChild(noteElement);
        });
        lastUpdatedTime.textContent = `Last Updated: ${new Date().toLocaleTimeString()}`;
    }

    setInterval(displayNotes, 2000);
});


