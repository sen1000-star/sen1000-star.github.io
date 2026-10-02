const search = document.getElementById('search');
const year = document.getElementById('year');
const status = document.getElementById('status');
const container = document.getElementById('tracks');
let entries = [];

function render() {
  const query = search.value.trim().toLocaleLowerCase();
  const visible = entries.filter(([, track]) =>
    (!year.value || track.subtitle.split('-')[0] === year.value) &&
    (!query || track.title.toLocaleLowerCase().includes(query))
  );
  container.replaceChildren();
  const groups = new Map();
  for (const [id, track] of visible) {
    if (!groups.has(track.subtitle)) {
      const section = document.createElement('section');
      section.className = 'track-group';
      const heading = document.createElement('h2');
      heading.textContent = track.subtitle;
      const list = document.createElement('ul');
      section.append(heading, list);
      container.append(section);
      groups.set(track.subtitle, list);
    }
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'track-link';
    link.textContent = track.title;
    link.href = './?track=' + encodeURIComponent(id);
    link.rel = 'nofollow';
    item.append(link);
    groups.get(track.subtitle).append(item);
  }
  status.textContent = visible.length ? `${visible.length}件 / 全${entries.length}件` : '該当する音声がありません。';
}

async function initList() {
  try {
    const response = await fetch('./tracks.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to load tracks');
    entries = Object.entries(await response.json()).sort((a, b) =>
      b[1].subtitle.localeCompare(a[1].subtitle) || a[1].title.localeCompare(b[1].title)
    );
    const years = [...new Set(entries.map(([, track]) => track.subtitle.split('-')[0]))];
    for (const value of years) {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value + '年';
      year.append(option);
    }
    search.addEventListener('input', render);
    year.addEventListener('change', render);
    render();
  } catch (error) {
    status.textContent = '一覧を読み込めませんでした。ページを再読み込みしてください。';
    console.error(error);
  }
}
initList();
