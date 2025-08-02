import multer from "multer"
import { createWorker } from "tesseract.js"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage });

export async function image_getter_converter(req, res) {

    try {
        const image = req.file?.path;
        const { lang } = req.body

        console.log("Req:-----------\n", req.file, "\n--------------")
        console.log("image: ", image);
        console.log("\nlang: ", lang);

        const worker = await createWorker({
            logger: m => console.log(m)
        })

        if (!image) {
            return res.status(404).json({
                msg: "Please, Upload Image First."
            });
        }

        const allLanguages = [
            "afr", "amh", "ara",
            "asm", "aze", "aze_cyrl",
            "bel", "ben", "bod",
            "bos", "bul", "cat",
            "ceb", "ces", "chi_sim",
            "chi_tra", "chr",
            "cym", "dan", "deu",
            "dzo", "ell", "eng",
            "enm", "epo", "est",
            "eus", "fas", "fin", "fra", "frk", "frm",
            "gle", "glg", "grc",
            "guj", "hat", "heb",
            "hin", "hrv", "hun",
            "iku", "ind", "isl",
            "ita", "ita_old", "jav",
            "jpn", "kan", "kat",
            "kat_old", "kaz", "khm",
            "kir", "kor", "kur",
            "lao", "lat", "lav",
            "lit", "mal", "mar",
            "mkd", "mlt", "msa", "mya",
            "nep", "nld", "nor", "ori", "pan",
            "pol", "por", "pus",
            "ron", "rus", "san",
            "sin", "slk", "slv",
            "spa", "spa_old", "sqi",
            "srp", "srp_latn", "swa",
            "swe", "syr", "tam",
            "tat", "tel", "tgk",
            "tgl", "tha", "tir", "tur", "uig", "ukr",
            "urd", "uzb", "uzb_cyrl",
            "vie", "yid"
        ];

        if (allLanguages.includes(lang)) {
            await worker.loadLanguage(lang);
            await worker.initialize(lang);
        } else {
            return res.status(404).json({
                msg: `Language '${lang}' is not supported.`
            });
        }
        const { data: { text } } = await worker.recognize(image);

        console.log(text);

        const new_recoginition = {
            image: image,
            converted_text: text,
        }

        await worker.terminate();

        if (!new_recoginition) {
            return res.status(400).json({ "msg": Error("Something went wrong, Please try again") })
        }

        return res.status(200).json({
            msg: "Converted to text succussfuly",
            data: new_recoginition
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ "msg": "Internal server error" })
    }

}



