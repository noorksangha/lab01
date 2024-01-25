class NoteManager {
    constructor() {
        this.addNoteButton = document.getElementById('addNoteButton');
        this.notesContainer = document.getElementById('notesContainer');
        this.lastSavedTime = document.getElementById('lastSavedTime');

        if (this.addNoteButton) {
            this.addNoteButton.addEventListener('click', () => this.addNote());
        }
        setInterval(() => this.saveNotes(), 2000);
    }

    addNote() {
        const noteElement = document.createElement('textarea');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            noteElement.remove();
            removeButton.remove();
            this.saveNotes();
        });
        this.notesContainer.appendChild(noteElement);
        this.notesContainer.appendChild(removeButton);
    }

    saveNotes() {
        const notes = [];
        document.querySelectorAll('#notesContainer textarea').forEach(note => {
            notes.push(note.value);
        });
        localStorage.setItem('notes', JSON.stringify(notes));
        this.lastSavedTime.textContent = `Last Saved: ${new Date().toLocaleTimeString()}`;
    }
}

class NoteDisplay {
    constructor() {
        this.notesDisplay = document.getElementById('notesDisplay');
        this.lastUpdatedTime = document.getElementById('lastUpdatedTime');

        setInterval(() => this.displayNotes(), 2000);
    }

    displayNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.notesDisplay.innerHTML = ''; // Clear existing notes
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.textContent = note;
            noteElement.classList.add('note');
            this.notesDisplay.appendChild(noteElement);
        });
        this.lastUpdatedTime.textContent = `Last Updated: ${new Date().toLocaleTimeString()}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('addNoteButton')) {
        new NoteManager();
    }
    if (document.getElementById('notesDisplay')) {
        new NoteDisplay();
    }
});
