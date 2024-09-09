// cssHandler.js

let newCSSContent = '';

// Function to load existing CSS content
export function getExistingCSS() {
    return fetch('styles.css')
        .then(response => response.text())
        .catch(error => {
            console.error('Error fetching existing CSS:', error);
            return '';
        });
}

// Handle CSS file upload
export function handleCSSFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newCSSContent = e.target.result;
            console.log('New CSS content loaded:', newCSSContent);

            applyCombinedCSS();
        };
        reader.readAsText(file);
    }
}

// Function to apply the combined CSS
function applyCombinedCSS() {
    getExistingCSS().then(existingCSSContent => {
        const combinedCSS = existingCSSContent + '\n' + newCSSContent;
        let styleElement = document.getElementById('combined-stylesheet');
        
        if (styleElement) {
            styleElement.textContent = combinedCSS;
        } else {
            styleElement = document.createElement('style');
            styleElement.id = 'combined-stylesheet';
            styleElement.type = 'text/css';
            styleElement.textContent = combinedCSS;
            document.head.appendChild(styleElement);
        }
        console.log('Combined CSS applied:', combinedCSS);
    });
}

// Function to save updated CSS
export function saveUpdatedCSS() {
    getExistingCSS().then(existingCSSContent => {
        const combinedCSS = existingCSSContent + '\n' + newCSSContent;

        const blob = new Blob([combinedCSS], { type: 'text/css' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'styles.css';
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('Updated CSS file downloaded.');
    });
}
