// hierarchy.js

// Function to set up event listeners for hierarchy items
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

    // Event listener for selecting an element from the hierarchy
    document.getElementById('hierarchyList').addEventListener('click', (event) => {
        if (event.target.dataset.node) {
            const listItem = event.target;
            const node = listItem.dataset.node;

            selectElement(node, listItem);
        }
    });
}

// Function to update the hierarchy panel based on the current document structure
export function updateHierarchyPanel(rootNode) {
    const hierarchyPanel = document.getElementById('hierarchyPanel');
    const hierarchyList = document.getElementById('hierarchyList');

    hierarchyList.innerHTML = '';

    function createHierarchyItems(node, parentElement) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const li = document.createElement('li');
            li.textContent = node.tagName.toLowerCase();
            li.dataset.node = node;

            const expandIcon = document.createElement('span');
            expandIcon.classList.add('expand-icon');
            expandIcon.textContent = node.children.length ? '+' : ''; // Show '+' if there are children
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

// Function to traverse and update the hierarchy structure
export function updateHierarchyStructure() {
    const hierarchyList = document.getElementById('hierarchyList');
    const hierarchyArray = [];

    function traverseList(node, parentNode) {
        const children = Array.from(node.children);
        children.forEach(child => {
            const itemData = { tagName: child.textContent.trim(), parent: parentNode };
            hierarchyArray.push(itemData);
            traverseList(child, itemData);
        });
    }

    traverseList(hierarchyList, null);
    console.log('Updated Hierarchy Structure:', hierarchyArray);
}

// Function to handle element selection in the hierarchy
function selectElement(element, listItem) {
    const selectedItem = document.querySelector('.selected');
    if (selectedItem) {
        selectedItem.classList.remove('selected');
    }
    listItem.classList.add('selected');
    selectedElement = element;
}
 
