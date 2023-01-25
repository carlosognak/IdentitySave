import Tesseract from 'tesseract.js';
import { Filesystem } from '@capacitor/filesystem';
import img from './img.png'
import image2 from './carteidentité2.png'


const availableChar = []

export async function textDetect(imagePath) {
    imagePath = '../img.png';
    let resultString = ["", "", ""]
    let detectedText

    try {
        /*

        const contents = await Filesystem.readFile({
            path: imagePath
        });

        Base64.encodeFile(imagePath).then((base64File) => {
            console.log(base64File);
        }, (err) => {
            console.log(err);
        });
*/

        await Tesseract.recognize(image2).then(({ data: { text } }) => {
            detectedText = text.replaceAll(' ', '')
        })

    } catch (error) {
        console.log('Error : ', error)

    }
    let ligne = 0

    for (let index = 0; index < detectedText.length; index++) {
        if ((/\r|\n/.test(detectedText[index]))) {
            ligne++
        } else if (detectedText[index].match(/^[0-9A-Za-z<]+$/)) {
            resultString[ligne] += detectedText[index]
        }
    }
    dispatchString(...resultString)
}

const dispatchString = (string, string2, string3) => {
    let result

    if (!string3) {
        result = {
            id: string.substring(0, 2),
            iso: string.substring(2, 5),
            lastName: string.substring(5, 30),
            adminCode: string.substring(30, 37),
            adminCode2: string2.substring(4, 7),
            gestionCenterCode: string2.substring(7, 12),
            controlKey: string2[12],
            name: string2.substring(13, 25),
            birthDate: string2.substring(31, 33) + "/" + string2.substring(29, 31) + "/" + string2.substring(27, 29),
            cardStartDate: string2.substring(2, 4) + "/" + string2.substring(0, 2),
            cardEndDate: string2.substring(2, 4) + "/" + (Number(string2.substring(0, 2)) + 5),
            controlKey2: string2[33],
            gender: string2[34],
            controlKey3: string2[35],
        }
    } else {
        result = {
            id: string.substring(0, 2),
            iso: string.substring(2, 5),
            uniqueId: string.substring(5, 14),
            controlKey: string[14],
            birthDate: string2.substring(4, 6) + "/" + string2.substring(2, 4) + "/" + string2.substring(0, 2),
            controlKey2: string2[6],
            gender: string2[7],
            cardEndDate: string2.substring(12, 14) + "/" + string2.substring(10, 12) + "/" + string2.substring(8, 10),
            controlKey3: string2[14],
            ownerIso: string2.substring(15, 18),
            controlKey4: string2[29],
            lastName: string3.split('<<')[0].replaceAll('<', " "),
            name: string3.split('<<')[1].replaceAll('<', " ")
        }
    }

    console.log('result = ', result)
    return result
}