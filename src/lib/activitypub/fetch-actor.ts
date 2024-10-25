export async function fetchActor(keyId: string) {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/activity+json'
        }
    }
    const responce = await fetch(keyId, options);
    const actor = await responce.json();
    return actor;
}