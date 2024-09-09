// dragDrop.js
export let selectedElement = null;
export let draggedElement = null;

export function makeElementsDraggable() {
    document.querySelectorAll('.draggable').forEach(element => {
        element.addEventListener('dragstart', (event) => {
            draggedElement = event.target;
            const offsetX = event.clientX - draggedElement.getBoundingClientRect().left;
            const offsetY = event.clientY - draggedElement.getBoundingClientRect().top;

            const dragImage = new Image();
            dragImage.src = 'data:image/gif;base64,R0lGODdhAQABAIAAAAAAAP///ywAAAAAAQABAAACAkQBADs=';
            event.dataTransfer.setDragImage(dragImage, 0, 0);

            event.dataTransfer.setData('text/plain', `${offsetX},${offsetY}`);
        });

        element.addEventListener('dragend', () => {
            draggedElement = null;
        });
    });
}
