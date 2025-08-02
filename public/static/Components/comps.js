import { allLanguagesWithFlags } from "./flags.js"
import fetcher_api from "../libs/fetcher.js"

const content_page = document.querySelector(".page-content");

export function Donation() {
    content_page.innerHTML = "";

    let cover = document.createElement("div")
    cover.className = "cover";
    content_page.appendChild(cover);

}
///4|4\/4|4\/4|4\/4|4\/4|4\*/
export function Home() {

    const TITLES = ["What Is Tesseract 🧠", "Simple Example 🔍", "Why Is It Useful 📷"]

    const DESCREPTIONS = [
        ["Tesseract is a powerful tool that can extract text from images.",
            "It uses Optical Character Recognition (OCR) technology to recognize and convert the text inside pictures—like scanned documents receipts or screenshots—into real, editable text..",
            "It’s especially useful when you want to copy or search for words that are stuck inside an image or PDF",
            "It works directly in your browser — no need to upload your images to a server.",
            "It helps you quickly copy text from images instead of typing it yourself."
        ],

        ["Let’s say you took a picture of a paper with important information.",
            "  Instead of writing it all by hand, you can use Tesseract.js to get the text from the image automatically."
        ],


        ["In websites that convert images to text.",
            "In tools that help people save or search for information from scanned papers.",
            "In apps that help visually impaired users by turning text in image into readable content"
        ]
    ]

    content_page.innerHTML = "";
    let cover = document.createElement("div")
    let title_text = document.createElement("h2")
    title_text.textContent = "Tesseract.js"
    let descirptions_container = document.createElement("div")
    descirptions_container.className = "descirptions_container"


    for (let i = 0; i < TITLES.length; i++) {

        let title = document.createElement("h1")
        title.className = "title-text"
        title.textContent = TITLES[i]
        descirptions_container.appendChild(title);

        for (let j = 0; j < DESCREPTIONS.length - 1; j++) {

            let description = document.createElement("h3");
            description.className = "description"
            description.textContent = DESCREPTIONS[i][j];
            descirptions_container.appendChild(description)

        }

    }

    cover.className = "cover"
    cover.appendChild(descirptions_container)
    content_page.appendChild(cover);
}
///4|4\/4|4\/4|4\/4|4\/4|4\*/

export function Ocr_Prediction() {

    content_page.innerHTML = "";
    let cover = document.createElement("div");
    cover.className = "cover pre";

    let prediction_container = document.createElement("div");
    let img_container = document.createElement("div")
    img_container.className = "img_container"
    img_container.innerHTML = "<i class='fa-solid fa-image'></i>";

    prediction_container.className = "prediction_container"
    let select_div = document.createElement("select")

    let h2 = document.createElement("h2")
    h2.textContent = "Start Extracting Text"
    h2.className = "text-title"

    let generate_button = document.createElement("button")
    generate_button.innerHTML = '<i class="fa-solid fa-rotate"></i>' + " " + "Generate"
    generate_button.className = "generate"
    for (let i = 0; i < allLanguagesWithFlags.length; i++) {
        let option_selector = document.createElement("option")
        option_selector.value = allLanguagesWithFlags[i].code;
        option_selector.textContent = allLanguagesWithFlags[i].flag + " " + allLanguagesWithFlags[i].country + " - " + allLanguagesWithFlags[i].code;
        option_selector.id = [i]
        option_selector.className = "op"
        select_div.appendChild(option_selector);
    }
    select_div.addEventListener("change", (e) => {
        console.log(e.target.value)
        localStorage.setItem("lang", JSON.stringify(e.target.value));
    });


    let img_uploader = document.createElement("img");
    img_uploader.className = "img-upload"
    let text_container = document.createElement("div");
    text_container.className = "text_container";
    let upload_img = document.createElement("input")
    img_uploader.innerHTML = '<i class="fa-solid fa-image"></i>';
    [img_container, img_uploader].forEach((container) => {
        container.addEventListener("click", () => {

            upload_img.click()
        })
    })
    let img_saver;

    upload_img.addEventListener("change", (e) => {
        const file = e.target.files[0]

        if (file) {

            const reader = new FileReader();
            reader.onload = () => {
                img_uploader.src = reader.result;
                img_container.style.display = "none";
                img_uploader.style.display = "flex";
            };
            reader.readAsDataURL(file);
        }
        img_saver = file;
    })

    upload_img.type = "file"

    generate_button.addEventListener("click", async () => {
        let image = img_saver;
        let lang = JSON.parse(localStorage.getItem("lang"));
        generate_button.disabled = true;
        generate_button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
        const data = await Generate_And_Extract(image, lang);
        text_container.textContent = data.data.converted_text
        generate_button.innerHTML = '<i class="fa-solid fa-rotate"></i>' + " " + "Generate"
        generate_button.disabled = false;

    })
    prediction_container.appendChild(img_uploader)
    prediction_container.appendChild(img_container);

    prediction_container.appendChild(text_container)
    cover.appendChild(h2)
    cover.appendChild(select_div)
    cover.appendChild(generate_button)
    cover.appendChild(prediction_container)
    content_page.appendChild(cover);
}


async function Generate_And_Extract(image, lang) {
    try {
        const formData = new FormData()
        formData.append("image", image)
        formData.append("lang", lang);
        for (const [key, value] of formData.entries()) {
            console.log(key, value)
        }
        const data = await fetcher_api("http://localhost:5000/api/ocr", "POST", formData)
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }

}
