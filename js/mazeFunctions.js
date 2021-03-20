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


function mazeRunner(el) {
    let startNode = el.querySelector('.start');
    let endNode = el.querySelector('.end');
    if (!endNode || !startNode) { return; }
    const startX = Array.prototype.indexOf.call(startNode.parentNode.children, startNode);
    const startY = Array.prototype.indexOf.call(startNode.parentNode.parentNode.children, startNode.parentNode);
    const endX = Array.prototype.indexOf.call(endNode.parentNode.children, endNode);
    const endY = Array.prototype.indexOf.call(endNode.parentNode.parentNode.children, endNode.parentNode);

    var theRows = el.querySelectorAll('tr');
    this.visited = Array();
    this.cue = Array();
    this.mazeHeight = theRows.length;

    this.theMaze = Array.prototype.slice.call(theRows).map(function (row) {
        return row.querySelectorAll('td');
    });
    this.mazeWidth = this.theMaze[0].length;

    this.solved = false;
    var firstNode = new maze_node(null, this.theMaze[startY][startX], startX, startY, false);

    this.cue = Array(firstNode);
    this.visited[startX + startY * this.mazeWidth] = Array(firstNode);
    this.endY = endY;
    this.endX = endX;
    this.el = el;

    this.GetUNs = (node) => {
        var x = node.x;
        var y = node.y;
        var i, j, xi, yi, isEnd, newNode;
        for (i = -1; i < 2; i++) {
            for (j = -1; j < 2; j++) {
                xi = x + (j === 0 ? i : 0);
                yi = y + (i === 0 ? j : 0);
                if (xi < this.mazeWidth && xi > -1 && yi < this.mazeHeight && yi > -1 && !this.theMaze[yi][xi].classList.contains('wall') && this.visited[xi + yi * this.mazeWidth] === undefined) {
                    isEnd = (xi == this.endX && yi == this.endY);
                    newNode = new maze_node(node, this.theMaze[yi][xi], xi, yi, isEnd);
                    this.visited[xi + yi * this.mazeWidth] = this.cue[this.cue.length] = newNode;
                    if (isEnd) { return newNode; }
                }
            }
        }
        return false;

    }

    this.run = () => {
        var solution = this.solved;
        while (this.cue.length > 0 && !solution) {
            solution = this.GetUNs(this.cue.shift());
        }
        this.solved = solution;
        if (this.solved) {
            node = this.solved;
            node.tis.classList.add("path");
            while (node.prev) {
                node.prev.tis.classList.add("path");
                node = node.prev;
            }
        }
        return solution;
    }
}

function maze_node(prev, tis, col, row, isTarget) {
    this.tis = tis;
    this.x = col;
    this.y = row;
    this.prev = prev;
    this.goal = isTarget;
}

function clear(el) {

}

