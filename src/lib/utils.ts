export const formatNumberWithSuffix = (input: number | string): string => {
    if (input === undefined) {
        return ''; // or any other default value if needed
    }

    const number = typeof input === 'string' ? parseFloat(input) : input;

    if (isNaN(number)) {
        return ''; // Handle the case where the input is not a valid number
    }

    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    } else {
        return number.toString();
    }
};

export const formatDateString = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
        'en-US',
        options,
    );

    return formattedDate.replace(',', '.');
};
