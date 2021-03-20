function registerMaze(el, wallCell, startCell, endCell) {
    el.addEventListener('mousedown',
        ev => {
            if (ev.target.tagName === 'TD' && wallCell.checked) {
                ev.preventDefault();
                el.mode = ev.target.classList.toggle('wall');
                el.act = true;
            }
        }
    );
    el.addEventListener('mouseup',
        ev => {
            el.act = false;
            if (ev.target.tagName === 'TD') {
                if (startCell.checked || endCell.checked) {
                    if (endCell.checked) {
                        if (el.endCell) {
                            el.endCell.classList.remove('end');
                            wasWall(el.startCell);
                        }
                        el.endCell = ev.target;
                        el.endCell.classList.add('end');
                    } else {
                        if (el.startCell) {
                            el.startCell.classList.remove('start');
                            wasWall(el.startCell);
                        }
                        el.startCell = ev.target;
                        el.startCell.classList.add('start');
                    }
                    isWall(ev.target);

                }
            }
        }
    );
    el.addEventListener('mouseover',
        ev => {
            if (el.act && ev.target.tagName === 'TD' && wallCell.checked) {
                let wallClass = ev.target.classList.contains('start', 'end') ? 'old-wall' : 'wall'
                ev.target.classList.toggle(wallClass, el.mode);
            }
        }
    );

}

function wasWall(el) {
    if (el.classList.contains('old-wall')) {
        el.classList.remove('old-wall');
        el.classList.add('wall');
    }
}

function isWall(el) {
    if (el.classList.contains('wall')) {
        el.classList.remove('wall');
        el.classList.add('old-wall')
    }
}

function createGrid(tableEl, x, y) {
    tableEl.innerHTML = ('<tr>' + '<td class="cel">&nbsp;</td>'.repeat(x) + '</tr>').repeat(y);
    tableEl.parentNode.classList.add('table-border')
}