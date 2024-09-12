

function displayLinkList4rotateUsingSemanticUI() {
    // 創建一個模態框
    if (document.getElementById('linkListContent')==null) {
        const modal = document.createElement('div');
        modal.className = 'ui modal';
        modal.innerHTML = `
        <i class="close icon"></i>
        <div class="header">
            連結列表
        </div>
        <div class="content">
            <div class="ui list" id="linkListContent">
                <!-- 連結將在這裡動態添加 -->
            </div>
        </div>
    `;

        // 將模態框添加到body
        document.body.appendChild(modal);
    } else {
        document.getElementById('linkListContent').innerHTML = '';
    }

    // 獲取連結列表
    const linkList = document.getElementById('linkList4rotate');
    const rows = linkList.getElementsByTagName('tr');

    // 動態添加連結到模態框
    Array.from(rows).forEach(row => {
        const cells = row.getElementsByTagName('td');
        if (cells.length === 5) {
            const item = document.createElement('div');
            item.className = 'item';
            item.innerHTML = `
                <i class="linkify icon"></i>
                <div class="content">
                    來源: ${cells[0].textContent} (索引: ${cells[1].textContent})
                    目標: ${cells[2].textContent} (索引: ${cells[3].textContent})
                    值: ${cells[4].textContent}
                </div>
            `;
            document.getElementById('linkListContent').appendChild(item);
        }
    });

    // 使用Semantic UI顯示模態框
    $('.ui.modal').modal('show');
}