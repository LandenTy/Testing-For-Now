// main.js
import { handleHTMLFileUpload } from './htmlHandler.js';
import { handleCSSFileUpload, saveUpdatedCSS } from './cssHandler.js';
import { makeElementsDraggable } from './dragDrop.js';
import { setupHierarchyListeners } from './hierarchy.js';
import { setupInspectorListeners } from './inspector.js';

document.getElementById('htmlInput').addEventListener('change', handleHTMLFileUpload);
document.getElementById('cssInput').addEventListener('change', handleCSSFileUpload);
document.getElementById('saveButton').addEventListener('click', saveUpdatedCSS);

setupInspectorListeners();
makeElementsDraggable();
setupHierarchyListeners();

// Modal functionality
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('uploadModal');
const closeModal = document.getElementById('closeModal');

if (openModalBtn && modal && closeModal) {
    openModalBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
} else {
    console.error('Modal elements not found!');
}

// Handle Ctrl+S to trigger the save positions button
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        document.getElementById('saveButton').click();
    }
});
