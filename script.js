// 合成規則數據（假設範例，根據遊戲實際規則調整）
const combos = [
    { ballA: "火球", ballB: "水球", result: "蒸氣球" },
    { ballA: "土球", ballB "風球", result: "塵球" },
    { ballA: "雷球", ballB: "冰球", result: "暴風球" }
];

// 檢查已合成記錄（從 LocalStorage 載入）
let synthesized = JSON.parse(localStorage.getItem("synthesized")) || {};

// 動態生成表格
const tableBody = document.querySelector('#comboTable tbody');
combos.forEach(combo => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${combo.ballA}</td>
        <td>${combo.ballB}</td>
        <td>${combo.result}</td>
        <td><input type="checkbox" data-result="${combo.result}" ${synthesized[combo.result] ? "checked" : ""}></td>
    `;
    tableBody.appendChild(row);

    // 監聽checkbox變化，更新記錄
    row.querySelector('input').addEventListener('change', (e) => {
        synthesized[e.target.dataset.result] = e.target.checked;
        localStorage.setItem("synthesized", JSON.stringify(synthesized));
        if (e.target.checked) row.classList.add('synthesized');
        else row.classList.remove('synthesized');
    });
});