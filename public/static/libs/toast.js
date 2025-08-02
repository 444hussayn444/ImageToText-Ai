// Starting Toast Component /4|4\ ;
export default function toast_popup(page, message) {
    let toast_layer = document.createElement("div");
    toast_layer.className = "toast_layer";
    let toast_text = message.trim();
    let toast_paper = document.createElement("p");
    toast_paper.className = "toast_paper";
    toast_paper.textContent = toast_text;
    toast_layer.appendChild(toast_paper);
    if (!page) {
        document.body.appendChild(toast_layer);
    } else {
        page.appendChild(toast_layer);
    }
}
// done /4|4\ ;
