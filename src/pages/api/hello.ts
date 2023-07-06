export const get = () => {
    return new Response('Hello world!', {
        headers: { 'content-type': 'text/plain' },
    })
}