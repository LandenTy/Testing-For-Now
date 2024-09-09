// inspector.js
import { selectedElement } from './dragDrop.js';

export function setupInspectorListeners() {
    const textInput = document.getElementById('textInput');
    const colorPicker = document.getElementById('colorPicker');
    const posX = document.getElementById('posX');
    const posY = document.getElementById('posY');
    const sizeX = document.getElementById('sizeX');
    const sizeY = document.getElementById('sizeY');
    const rotX = document.getElementById('rotX');
    const rotY = document.getElementById('rotY');

    textInput.addEventListener('input', () => {
        if (selectedElement) {
            selectedElement.textContent = textInput.value;
        }
    });

    colorPicker.addEventListener('input', () => {
        if (selectedElement) {
            selectedElement.style.color = colorPicker.value;
        }
    });

    posX.addEventListener('input', () => {
        if (selectedElement) {
            selectedElement.style.left = `${posX.value}px`;
        }
    });

    posY.addEventListener('input', () => {
        if (selectedElement) {
            selectedElement.style.top = `${posY.value}px`;
        }
    });

    sizeX.addEventListener('input', () => {
        if (selectedElement) {
            selectedElement.style.width = `${sizeX.value}px`;
        }
    });

    sizeY.addEventListener('input', () => {
        if (selectedElement) {
            selectedElement.style.height = `${sizeY.value}px`;
        }
    });

    rotX.addEventListener('input', () => {
        if (selectedElement) {
            selectedElement.style.transform = `rotateX(${rotX.value}deg)`;
        }
    });

    rotY.addEventListener('input', () => {
        if (selectedElement) {
            selectedElement.style.transform = `rotateY(${rotY.value}deg)`;
        }
    });
}

export function updateInspector(element) {
    if (element) {
        document.getElementById('textInput').value = element.textContent;
        document.getElementById('colorPicker').value = element.style.color || '#000000';
        document.getElementById('posX').value = parseInt(element.style.left || '0', 10);
        document.getElementById('posY').value = parseInt(element.style.top || '0', 10);
        document.getElementById('sizeX').value = parseInt(element.style.width || '0', 10);
        document.getElementById('sizeY').value = parseInt(element.style.height || '0', 10);
        document.getElementById('rotX').value = parseInt(element.style.transform.replace('rotateX(', '').replace('deg)', '') || '0', 10);
        document.getElementById('rotY').value = parseInt(element.style.transform.replace('rotateY(', '').replace('deg)', '') || '0', 10);
    }
}
