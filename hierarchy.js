// hierarchy.js
import { selectedElement, draggedElement } from './dragDrop.js';

export function setupHierarchyListeners() {
    document.getElementById('hierarchyList').addEventListener('click', (event) => {
        if (event.target.classList.contains('expand-icon')) {
            const listItem = event.target.parentElement;
            const childrenContainer = listItem.querySelector('.children');

            if (childrenContainer) {
                const isVisible = childrenContainer.style.display === 'block';
                childrenContainer.style.display = isVisible ? 'none' : 'block';
                event.target.textContent = isVisible ? '+' : '-';
            }
        }
    });

    document.getElementById('parentButton').addEventListener('click', () => {
        if (selectedElement && draggedElement) {
            selectedElement.appendChild(draggedElement);
            updateHierarchyPanel(document.body);
        }
    });

    document.getElementById('unparentButton').addEventListener('click', () => {
        if (draggedElement) {
            const container = document.getElementById('container');
            if (container && !container.contains(draggedElement)) {
                container.appendChild(draggedElement);
                updateHierarchyPanel(document.body);
            }
        }
    });
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
