import Tesseract from 'tesseract.js';
import { Filesystem } from '@capacitor/filesystem';
import image from './carteIdentitéRecto.png'

const availableChar = []

export async function textDetect(imagePath) {
    imagePath = '../carteIdentitéRecto.png';
    let resultString = ["", "", ""]
    let detectedText
    console.log('click !!! ')

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

        await Tesseract.recognize(image).then(({ data: { text } }) => {
            detectedText = text.replaceAll(' ', '')
        })

    } catch (error) {
        console.log('Error : ', error)

    }
    let ligne = 0
    for (let index = 0; index < detectedText.length; index++) {
        if ((/\r|\n/.test(detectedText[index]))) {
            ligne++
        } else if (!detectedText[index].match(/^[0-9A-Za-z<]+$/)) {
            // resultString[ligne] += detectedText[index]
            //resultString[ligne] += "?"
        } else {
            resultString[ligne] += detectedText[index]
        }
    }


    decodeText(1, resultString)
    return resultString
}

const decodeText = (idCartVersion, idCartText) => {
    if (idCartVersion == 1) return dispatchStringV1(idCartText[0], idCartText[1])
    if (idCartVersion == 2)


        throw new Error('idCartVerion not available')


}

const dispatchStringV1 = (string, string2) => {
    console.log('string : ' + string + " | Length = ", string.length)
    console.log('string2 ', string2)
    let result = {
        id: string.substring(0, 2),
        iso: string.substring(2, 5),
        lastName: string.substring(5, 30),
        adminCode: string.substring(30, 37),
        cardStartDate: string2.substring(0, 2) + "/" + string2.substring(2, 4),
        cardEndDate: (Number(string2.substring(0, 2)) + 5) + "/" + string2.substring(2, 4),
        adminCode2: string2.substring(4, 7),
        gestionCenterCode: string2.substring(7, 12),
        controlKey: string2[12],
        name: string2.substring(13, 25),
        birthDate: string2.substring(27, 29) + "/" + string2.substring(29, 31) + "/" + string2.substring(31, 33),
        controlKey2: string2[33],
        gender: string2[34],
        controlKey3: string2[35],

    }
    console.log('result = ', result)
    return result
}