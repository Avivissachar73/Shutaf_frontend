export class TableService {
  static id = 0;
  element = null;
  constructor(selector = 'body', board = [], getCellContentFunc, cellClickedCb) {
      this.id = 'table-' + TableService.id++;
      this.parentSelector = selector;
      this.board = board;

      this.cellClickedCb = cellClickedCb

      this.getCellContentFunc = getCellContentFunc;
      this.getCellContent = (pos, cell) => {
          if (getCellContentFunc) return getCellContentFunc(pos, cell);
          else if (typeof(cell) === 'object') return JSON.stringify(cell);
          else return cell;
      }
  }

  get selector() {
      return '#' + this.id;
  }

  render = () => {
      var board = this.board;
      var htmlStr = `<table id="${this.id}">`;
      for (let i = 0; i < board.length; i++) {
          htmlStr += '<tr>';
          for (let j = 0; j < board[i].length; j++) {
              let cell = board[i][j];
              htmlStr += `<td id="${this._getCellIdByPos({i,j})}" class="board-cell">
                              ${this.getCellContent({i, j}, cell)}
                          </td>`
          }
          htmlStr += '</tr>';
      }
      htmlStr += '</table>';
      
      var el = document.createElement('div');
      el.innerHTML = htmlStr;
      el = el.firstChild;

      el.querySelectorAll('td').forEach(c => {
        c.onclick = (ev) => this.onCellClick(ev);
      });

      var elParent = document.querySelector(this.parentSelector);
      if (this.element) elParent.removeChild(this.element);
      this.element = el;
      elParent.appendChild(el);
  }

  onCellClick(ev) {
    const elTd = ev.composedPath().find(c => c.nodeName === 'TD');
    const pos = this._getPosFromCell(elTd);
    const cell = this.board[pos.i][pos.j];
    if (this.cellClickedCb) this.cellClickedCb(pos, cell, elTd);
  }

  _getPosFromCell(elCell) {
    const splittedId = elCell.id.split('-');
    return { i: +splittedId[1], j: +splittedId[2] };
  }

  updateCell(pos, item) {
      this.board[pos.i][pos.j] = item;
      this._getElCellByPos(pos).innerHTML = this.getCellContent(pos, item);
  }

  _getCellIdByPos({i,j}) {
      return `cell-${i}-${j}`;
  }

  _getElCellByPos(pos) {
      var cellId = this._getCellIdByPos(pos);
      return this.element.querySelector(`#${cellId}`);
  }

  reSizeBoard = () => {
      var elParent = this.element.parentNode;
      var boardWidth = elParent.offsetWidth;
      var elTable = this.element;
      var rowCount = elTable.querySelector('tr').querySelectorAll('td').length;
      var tdWidth = boardWidth / rowCount;
      var boardFontSize = tdWidth/1.55;
      elTable.querySelectorAll('td').forEach(elTd => {
          elTd.style.width = tdWidth + 'px';
          elTd.style.height = tdWidth + 'px';
      })
      elTable.style.width = boardWidth + 'px';
      elTable.style.height = boardWidth + 'px';
      elTable.style['font-size'] = boardFontSize + 'px';
  }
  setReSizeBoard(isListenToResize = false) {
      this.reSizeBoard();
      this.resizeData = { listen: isListenToResize }
      this.ulListenToREsize();
      if (isListenToResize) window.addEventListener('resize', this.reSizeBoard); // TODO: fix this bug - disconnect after destroyed;
  }
  ulListenToREsize() {
    if (this.resizeData && this.resizeData.listen) window.removeEventListener('resize', this.reSizeBoard);
  }

  destroy() {
    try {
        document.querySelector(this.parentSelector).removeChild(this.element);
        this.ulListenToREsize();
    } catch (e) {}
  }

  updateBoard(newBoard) {
    this.board = newBoard;
    this.render();
    if (this.resizeData) this.setReSizeBoard(this.resizeData.listen);
  }
}