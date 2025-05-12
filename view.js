const selector = document.querySelector("#kitn");
const canvas = document.querySelector("canvas");

const handleFileSelect = (ev) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const [dimensions, data] = e.target.result
      .slice(5) // Slice to skip the KITN\n declaration
      .split("\n", 2);
    console.log(dimensions);
    console.log(data);

    window.tmp_imgdata = data;

    [canvas.height, canvas.width] = dimensions
      .split(" ")
      .map((n) => parseInt(n));

    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";

    let colors = [];
    for (let i = 0; i < data.length; i += 4) {
      let r = data.codePointAt(i);
      let g = data.codePointAt(i + 1);
      let b = data.codePointAt(i + 2);
      let a = data.codePointAt(i + 3);

      colors.push(`rgb(${r}, ${g}, ${b})`);

      console.log(i);
    }

    const ctx = canvas.getContext("2d");

    let x = 0;
    let y = 0;
    for (let i in colors) {
      ctx.fillStyle = colors[i];
      ctx.fillRect(y, x, 1, 1);
      y++;
      if (y === canvas.height) {
        x++;
        y = 0;
      }
    }

    console.log(colors);
  };

  const f = ev.target.files[0];
  document.querySelector("span.file-name").textContent = f.name;

  reader.readAsText(f);
};

selector.addEventListener("change", handleFileSelect, false);
