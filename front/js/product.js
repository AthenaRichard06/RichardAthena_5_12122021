let adresse = window.location.href;
console.log (adresse)

let url = new URL(adresse);
console.log(url)

let reference = url.searchParams.get("id");
console.log (reference)