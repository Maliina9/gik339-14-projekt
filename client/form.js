linkForm.addEventListener("submit", hanteraSubmit, false);
function hanteraSubmit(e) {
  e.preventDefault();
  console.log("Submit");
}

const fargVal = [
  { name: "Röd", value: "red" },
  { name: "Blå", value: "blue" },
  { name: "Grön", value: "green" },
  { name: "Gul", value: "yellow" },
  { name: "Orange", value: "orange" },
  { name: "Lila", value: "purple" },
  { name: "Rosa", value: "pink" },
  { name: "Brun", value: "brown" },
  { name: "Svart", value: "black" },
  { name: "Vit", value: "white" },
  { name: "Grå", value: "gray" },
  { name: "Cyan", value: "cyan" },
  { name: "Magenta", value: "magenta" },
  { name: "Olivgrön", value: "olive" },
  { name: "Marinblå", value: "navy" },
  { name: "Turkos", value: "turquoise" },
  { name: "Ljusgrön", value: "lightgreen" },
  { name: "Mörkröd", value: "darkred" },
  { name: "Beige", value: "beige" },
  { name: "Ljusblå", value: "lightblue" }
];

const colorSelect = document.getElementById('colorSelect');
// Sortera färgerna innan visning
fargVal.sort((a, b) => a.name.localeCompare(b.name, 'sv'));
// Lägg till färgerna i dropdown
fargVal.forEach(color => {
  const option = document.createElement('option');
  option.value = color.value;
  option.textContent = color.name;
  colorSelect.appendChild(option);
});