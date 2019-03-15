
export function ValidateOrgOrSsn(fc) {
    if (fc.value !== null && fc.value !== '') {
        fc = fc.value
            .toString()
            .replace(/\D/g, '')     // strip out all but digits
            .split('')              // convert string to array
            .reverse()              // reverse order for Luhn
            .slice(0, 10);          // keep only 10 digits (i.e. 1977 becomes 77)

        const sum = fc
            // convert to number
            .map((n) => {
                return Number(n);
            })
            // perform arithmetic and return sum
            .reduce((previous, current, index) => {
                // multiply every other number with two
                if (index % 2) {
                    current *= 2;
                }
                // if larger than 10 get sum of individual digits (also n-9)
                if (current > 9) {
                    current -= 9;
                }
                // sum it up
                return previous + current;
            });

        // sum must be divisible by 10
        if (!(0 === sum % 10)) {
            return { invalidOrgOrSsn: true };
        }
    }
}
