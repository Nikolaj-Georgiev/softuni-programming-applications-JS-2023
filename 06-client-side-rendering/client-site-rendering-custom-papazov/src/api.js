export const getContacts = () => {
    return fetch('http://localhost:3030/jsonstore/contacts')
        .then(res => res.json())
        .then(result => Object.values(result));
}