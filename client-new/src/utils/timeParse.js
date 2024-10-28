export const parseDateTime= (isoString)=> {
    const date = new Date(isoString);

    // Format the date and time
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Set to true for 12-hour format
    };

    return date.toLocaleString('en-US', options);
}

// utils/dateFormatter.js
export function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
