function uploadImagePair(name, text, image1, image2, callback) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('text', text);
    formData.append('image1', image1);
    formData.append('image2', image2);

    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                callback();
            }
        });
}

document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const text = document.getElementById('text').value;
    const image1 = document.getElementById('image1').files[0];
    const image2 = document.getElementById('image2').files[0];

    uploadImagePair(name, text, image1, image2, () => alert('Uploaded successfully!'));
});

function loadGallery() {
    fetch('http://localhost:3000/gallery')
        .then((response) => response.json())
        .then((data) => {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = '';

            data.forEach((item) => {
                displayImagePair(item.name, item.text, `http://localhost:3000/${item.image1Path}`, `http://localhost:3000/${item.image2Path}`);
            });
        });
}


function displayImagePair(name, text, img1Src, img2Src) {
    const div = document.createElement('div');
    div.className = 'image-pair';

    const img1 = document.createElement('img');
    img1.src = img1Src;

    const img2 = document.createElement('img');
    img2.src = img2Src;

    const textElement = document.createElement('div');
    textElement.className = 'text';
    textElement.innerHTML = `<strong>${name}:</strong> ${text}`;

    div.appendChild(img1);
    div.appendChild(img2);
    div.appendChild(textElement);

    const gallery = document.getElementById('gallery');
    gallery.appendChild(div);
}
