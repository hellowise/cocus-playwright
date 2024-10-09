import test, { Locator } from "@playwright/test"

/**
 * Generates a random integer between 1 and the specified maximum number.
 *
 * @param {number} max - The maximum number (inclusive).
 * @returns {number} - A random integer between 1 and max.
 */
export async function randomIntFromRange(max: number): Promise<number> {
    if (max < 1) {
        throw new Error('Max must be greater than or equal to 1')
    }
    return await test.step(`Getting random number between 1 and ${max}`, async () => {
        return Math.floor(Math.random() * max) + 1
    })
}

/**
 * Selects a random option from a select locator.
 *
 * @param {Locator} select - The select element.
 */
export async function selectRandom(select: Locator) { 
    // Get all options from the select element
    const options = select.locator('option')

    // Count the number of options
    const count = await options.count()

    // Choose a random option
    const randomIndex = Math.floor(Math.random() * count)
    const randomOption = options.nth(randomIndex)
    const optionValue = await randomOption.getAttribute('value')

    // Select the option
    await select.selectOption(optionValue)
}

