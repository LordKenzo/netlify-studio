async function loadItems(funName, htmlElementID) {
  const data = await fetch(`/.netlify/functions/${funName}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));

  const items = document.querySelector(`#${htmlElementID}`);

  data.forEach((item) => {
    const itemTemplate = createItemFromTemplate(item);
    items.appendChild(itemTemplate);
  });
}

function createItemFromTemplate(item) {
  const template = document.querySelector('#item');
  const itemNode = template.content.cloneNode(true);
  itemNode.querySelector('h2').innerText = item.name;
  itemNode.querySelector('.description').innerText = item.description;
  itemNode.querySelector('[name=sku]').value = item.sku;
  itemNode.querySelector('.price').innerText = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: item.currency,
  }).format((item.amount / 100).toFixed(2));
  const img = itemNode.querySelector('img');
  img.src = item.image;
  img.alt = item.name;

  const form = itemNode.querySelector('form');
  form.addEventListener('submit', handleFormSubmission);

  return itemNode;
}
