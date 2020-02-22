// 获取节点
const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// 获取stat.json 并进行过滤
const searchStates = async searchText => {
  const res = await fetch("../data/states.json");
  const states = await res.json();

  // 匹配输入内容并进行过滤
  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  outputHtml(matches);
};

// 显示过滤结果
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match =>
          `<div class="card card-body mb-1">
        <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
        <small>Lat: ${match.lat} / Long: ${match.long}</small>
        </div>`
      )
      .join("");
    matchList.innerHTML = html;
  }
};
// 事件监听
search.addEventListener("input", () => searchStates(search.value));
