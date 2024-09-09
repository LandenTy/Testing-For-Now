// cssHandler.js
export let newCSSContent = '';

export function handleCSSFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newCSSContent = e.target.result;
            applyCombinedCSS();
        };
        reader.readAsText(file);
    }
}

function getExistingCSS() {
    return fetch('styles.css')
        .then(response => response.text())
        .catch(error => {
            console.error('Error fetching existing CSS:', error);
            return '';
        });
}

function applyCombinedCSS() {
    getExistingCSS().then(existingCSSContent => {
        const combinedCSS = existingCSSContent + '\n' + newCSSContent;
        const styleElement = document.getElementById('combined-stylesheet');
        styleElement.textContent = combinedCSS;
    });
}

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
    });
}
