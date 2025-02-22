export async function ImageToBase64(file: Blob): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString().replace(/^.*?;base64,/, ''));
        reader.onerror = error => reject(error);
    });
}