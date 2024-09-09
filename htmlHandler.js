// htmlHandler.js
import { updateInspector } from './inspector.js';

export function handleHTMLFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const htmlContent = e.target.result;
            const container = document.getElementById('container');
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');

            const elements = doc.querySelectorAll('*');
            elements.forEach(el => el.classList.add('draggable'));

            container.innerHTML = doc.body.innerHTML;

            updateHierarchyPanel(doc.body);
            attachClickListener();
        };
        reader.readAsText(file);
    }
}

function updateHierarchyPanel(rootNode) {
    const hierarchyList = document.getElementById('hierarchyList');
    hierarchyList.innerHTML = '';
    
    function createHierarchyItems(node, parentElement) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const li = document.createElement('li');
            li.textContent = node.tagName.toLowerCase();
            li.dataset.node = node;

            const expandIcon = document.createElement('span');
            expandIcon.classList.add('expand-icon');
            expandIcon.textContent = node.children.length ? '+' : '';
            li.insertBefore(expandIcon, li.firstChild);

            li.classList.add('hierarchy-item');
            parentElement.appendChild(li);

            if (node.children.length) {
                const ul = document.createElement('ul');
                ul.classList.add('children');
                li.appendChild(ul);
                Array.from(node.children).forEach(child => {
                    createHierarchyItems(child, ul);
                });
            }
        }
    }
    
    createHierarchyItems(rootNode, hierarchyList);
}

function attachClickListener() {
    document.querySelectorAll('.draggable').forEach(element => {
        element.addEventListener('click', handleElementClick);
    });
}

function handleElementClick(event) {
    document.querySelectorAll('.draggable.selected').forEach(el => el.classList.remove('selected'));
    event.target.classList.add('selected');
    updateInspector(event.target);
}
