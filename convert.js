const selector = document.querySelector("#kitn");
const button = document.querySelector(".convertbtn");
let f;

button.onclick = () => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    try {
      img.src = e.target.result;
    } catch (err) {
      alert(err);
    }
    console.log(img.width, img.style.width, img.height, img.style.height);

    const canvas = document.querySelector("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const bytes = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(bytes);

    let data = `KITN\n${img.width} ${img.height}\n`;

    for (let i = 0; i < bytes.data.length; i++) {
      data += unescape(encodeURIComponent(String.fromCharCode(bytes.data[i])));
    }

    console.log(data.length - `KITN\n${img.width} ${img.height}\n` == bytes.length, data);

    const a = document.createElement("a");
    a.href =
      "data:text/plain;charset=utf-8;base64," +
      btoa(data);
      //btoa(unescape(encodeURIComponent(data)));
    a.download = "file.kitn";
    a.click();
  };

  try {
    reader.readAsDataURL(f);
  } catch(err) {
    alert(err);
  };
}

const handleFileSelect = (ev) => {
  f = ev.target.files[0];
  document.querySelector("span.file-name").textContent = f.name;

};

selector.addEventListener("change", handleFileSelect, false);
