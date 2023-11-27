export const littleLegs = milisec => {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}