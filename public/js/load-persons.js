async function loadPersons() {
  const data = await fetch('/.netlify/functions/get-persons')
    .then((res) => res.json())
    .catch((err) => console.error(err));

  const persons = document.querySelector('persons');

  const pre = document.createElement('pre');
  pre.innerText = JSON.stringify(data, null, 2);

  persons.appendChild(pre);
}
