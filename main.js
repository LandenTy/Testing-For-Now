// main.js
import { handleHTMLFileUpload } from './htmlHandler.js';
import { handleCSSFileUpload, saveUpdatedCSS } from './cssHandler.js';
import { makeElementsDraggable } from './dragDrop.js';
import { setupHierarchyListeners } from './hierarchy.js';
import { setupInspectorListeners } from './inspector.js';
import { setupHtmlHandlerListeners } from './htmlHandler.js';
import { setupInspectorListeners } from './inspector.js';

// Setup event listeners for file inputs and buttons
document.getElementById('htmlInput').addEventListener('change', handleHTMLFileUpload);
document.getElementById('cssInput').addEventListener('change', handleCSSFileUpload);
document.getElementById('saveButton').addEventListener('click', saveUpdatedCSS);

// Initialize additional functionality
setupInspectorListeners();
makeElementsDraggable();
setupHierarchyListeners();
setupHtmlHandlerListeners();
setupInspectorListeners();

// Modal functionality
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('uploadModal');
const closeModal = document.getElementById('closeModal');

if (openModalBtn && modal && closeModal) {
    openModalBtn.addEventListener('click', () => modal.style.display = 'block');
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
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
 
