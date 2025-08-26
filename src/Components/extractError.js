 const extractError = (object) => {
        const messages = [];
        for (const [key, value] of Object.entries(object)) {
            value.forEach(msg => messages.push(msg));
        }
        return messages;
}

export default extractError;